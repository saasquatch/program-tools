/*
  This migration string is intended to be turned into a JSONata expression to convert program rules from version to version. 

  VERSION HISTORY:
    1.0.0: The original referral program. It generated rewards with keys `referrerReward` and `referredReward` and did not use JSONata for anything.
           Identified by having no `version` property in the shema.
    2.0.0: The referral program with tiers. It generated rewards with keys `referrerReward` followed by `tier2`/`tier3` etc for the tiers, and
           `referredReward` for the referred user.
    3.0.0: The referral with objectives program. Version 2.0.0 rules are migrated to a `defaultObjective` and introspection handles generating
           the same reward and email keys that the version 2.0.0 program did for this migrated objective.
    4.0.0: Upgraded objectives program with email-only actions, repeating objectives and support for `programGoals`. Version 3.0.0 objectives
           are directly translated to objectives with appropriate actions using `overrideEmailKey` and `overrideRewardKey` to ensure keys remain
           the same.
*/
export const migrationString = `(
   /* Set up functions to convert words/numbers to operators */
  $numToOperator := function($num) {$num = 0 ? "=" : $num = 1 ? ">=" : "<="};
  $wordToOperator := function($word) {$word = "equal" ? "=" : $word = "less" ? "<=" : ">="};
  $stringify := function($word) { "\\"" & $word & "\\"" };

  /* Set up function to add quotes around strings */
  $inferType := function($w) { $exists($match($string($w), /^[0-9\.]{1,}$|true$|false$/).match) ? $w : $stringify($s)};

  $one := function() {(
      /* Set up shortcut variables */
      $cr := conversionRule;
      $conversion := $cr.selectedRule;
      $field := $cr.customField;


      /* Create the jsonata expression for each conversion rule case */
      $purchaseJsonata := $cr.minPurchaseValue != 0 ? "(event.fields.revenue >= " & $cr.minPurchaseValue & "? $tier1)" : "";
      $customEventJsonata := $cr.conversionEventFilter = 1 ? "(event.fields." & $cr.conversionEventField & "; $Q " & $numToOperator($cr.conversionEventFieldOperator) & " " & $inferType($cr.conversionEventFieldOperandValue) & " ? $tier1)": "";
      $customFieldEvalJsonata := "(user.customFields." & $field.fieldName & " " & $wordToOperator($field.operator) & " " & $inferType($field.value) & " ? $tier1)";
      $conversionJsonata := $conversion = "firstPurchase" ? $purchaseJsonata : $conversion = "customEvent" ? $customEventJsonata : $customFieldEvalJsonata;

      /* Create the new rules that will be returned */
      $exists($.version) ? $ : $exists($.referrerRewardRules) ? {
          "version": "2.0.0",
          "conversionRule": {
              "selectedRule": $cr.selectedRule = "customFieldEval" ? "customFieldEval" : "customEvent",
              "JSONata": $conversionJsonata,
              "conversionEventKey": $conversion = "firstPurchase" ? "purchase" : $cr.conversionEventKey,
              "rewardedUser": referredRewardRules.rewardReferred = "never" ? "referrerOnly" : "both",
              "rewardReferred": referredRewardRules.rewardReferred != "never" ? referredRewardRules.rewardReferred
          },
          "retraction": $exists(retraction) ? retraction : {"retractionEnabled": 0},
          "referrerRewardRules": {
              "makeObjectNotNull": true,
              "rewardLimit": referrerRewardRules.rewardLimit,
              "maxRewards": $exists(referrerRewardRules.rewardLimit) ? "specific" : "unlimited"
          }
      })
  };

  $two := function($s) {(
      $cr := $s.conversionRule;
      $referrerRules := $s.referrerRewardRules;
      /* The event key must be moved into the jsonata for events*/
      $jsonata := $cr.selectedRule = "customEvent" ? "(event.key = " & $stringify($cr.conversionEventKey) : $cr.JSONata;
      $filter := $cr.selectedRule = "customEvent" ? ($cr.JSONata = "" ? " ? $tier1)" : " and (" & $substringAfter($cr.JSONata, "(") & ")");
      $s.version = "2.0.0" ? {
          "version": "3.0.0",
          "retraction": $s.retraction,
          "conversionRule": {
              "objectives":[
                  {
                      "ID": "defaultObjective",
                      "name": "Default Objective",
                      "JSONata": $jsonata & $filter,
                      "rewardedUser": $cr.rewardedUser,
                      "rewardReferred": $cr.rewardReferred,
                      "selectedRule": $cr.selectedRule,
                      "maxRewards": $referrerRules.maxRewards,
                      "rewardLimit": $referrerRules.rewardLimit,
                      "goalAnalyticOption": 1
                  }
              ],
              "pendingUser": $cr.pendingUser,
              "pendingPeriod": $cr.pendingPeriod
          }
      } : $s
  )};

  $three := function($s) {(
      $s.version = "3.0.0" ? (
      $getRewardTiers := function($o, $conditions) {(
          $conditions := $count($conditions) < 1 ? ["true"] : $conditions;
          [$map($conditions, function($c, $i) {
              {
                  "key": $o.ID & "_rewardTier" & ($i + 1),
                  "condition": $c,
                  "reward": {
                      "rewardType": "static",
                      "pendingPeriod": $s.conversionRule.pendingUser = 2 or $s.conversionRule.pendingUser = 1 ? $stringify($s.conversionRule.pendingPeriod.duration)
                  },
                  "overrideRewardKey": $o.ID = "defaultObjective" ? ($i = 0 ? 'referrerReward' : 'tier' & ($i + 1)) : $o.ID & "_" & "tier" & ($i + 1)
              }
          })]
      )};
      $getActions := function($o, $conditions) {(
          $isDefault := $o.ID = "defaultObjective";
          /* -------------- Referred User Action ---------------------------*/
          $referredRewardKey := $isDefault ? 'referredReward' : $o.ID & "_referredReward";
          $referredCondition := $count($conditions) > 1 ? $join($conditions, " or ") : $count($conditions) = 1 ? $conditions[0];
          $cr := $s.conversionRule;
          $referredReward := $not($o.rewardedUser = "referrerOnly") ? 
                      {
                          "actionType": "rewardAndEmail",
                          "audience": "referred",
                          "condition": $referredCondition,
                          "name": $o.name & " Referred Reward and Email",
                          "key": $o.ID & "_migratedReferredReward",
                          "overrideEmailKey": $isDefault ? "referredRewardReceived" : $o.ID & "_referredRewardReceived",
                          "overrideRewardKey": $referredRewardKey,
                          "reward": {
                              "rewardType": "static",
                              "pendingPeriod": $cr.pendingUser = 2 or $cr.pendingUser = 3 ? $stringify($cr.pendingPeriod.duration)
                          }
                      };
          /* -------------- Referrer User Tiered Rewards Action  ---------------------------*/
         $tieredRewards := $not($o.rewardedUser = "referredOnly") ? {
             "key": $o.ID & "_tieredRewardsAndEmail",
             "name": "Referrer Email and Rewards",
             "actionType": "tieredRewardsAndEmail",
             "audience": "referrer",
             "rewardTiers": $getRewardTiers($o, $conditions),
             "overrideEmailKey": $isDefault ? "referralCompleted" : $o.ID & "_referralCompleted"
         };
          $o.rewardedUser = "referredOnly" ?
              [$referredReward] : [$referredReward, $tieredRewards];
              
      )};

      $parseTiers := function($o) {(
          /* Separate the JSONata expression for the objective into a condition for each tier */
          $conditions := $getObjConditions($o);
          /* Add reward for referred user if they are rewarded for this objective */
          $actions := $getActions($o, $conditions);
          )};

        $getObjConditions := function($o) {(
          /* Separate the JSONata expression for the objective into a condition for each tier */
          $conditions := $length($o.JSONata) > 0 ? $parse($o.JSONata).[**[type = 'condition' and $contains(then.value, "tier")]];
          /* Convert conditions from ast back to strings */
          $conditions := $count($conditions) > 0 ? $map($conditions, function($c) {$serialize($c.condition)})[] : [];
        )};


      $getEventKey := function($o) {
          $parse($o.JSONata).[[**[
              type = 'binary' and
              value = '=' and
              lhs.type= "path" and
              lhs.steps[0].value = 'event' and
              lhs.steps[1].value = 'key'
          ]].rhs.value][0]
      };

      $getRetractionActions := function($objectives) {(
          $r := $s.retraction;
          $referredRewardKeys := $objectives.[**.actions[actionType="rewardAndEmail" and audience = "referred"]].overrideRewardKey[];
          $referrerRewardKeys := $objectives.[**.actions[actionType="tieredRewardsAndEmail" and audience = "referrer"]].rewardTiers[].overrideRewardKey[];
          [
              /* retraction type 2 means only the referrer is retracted */
              $not($r.retractionType = 2) ? {
                  "key": "referred_retraction",
                  "actionType": "retraction",
                  "subType": "rewards",
                  "name": "Referred Reward Retraction",
                  "audience": "referred",
                  "retractedRewardKeys": $referredRewardKeys
              },
              $not($r.retractionType = 1) ? {
                  "key": "referrer_retraction",
                  "actionType": "retraction",
                  "subType": "rewards",
                  "name": "Referrer Reward Retraction",
                  "audience": "referrer",
                  "retractedRewardKeys": $referrerRewardKeys
              }
          ]
          
      )};

      $getReferralStartedActions := function() {
         [{
             "name": "Send Referral Started Email",
             "key": "referralStarted",
             "actionType": "email",
             "audience": "referrer",
             "overrideEmailKey": "referralStarted"
         }]
      };

      $referralStartedObjective := {
          "key": "referralStarted",
          "name": "Referral Started",
          "trigger": {
              "triggerType": "referralTrigger"
          },
          "referrerProgramRewardLimit": {
              "limitType": "unlimited"
          },
          "performsConversion": false,
          "actions": $getReferralStartedActions()
      };
      $migratedObjectives := $map($s.conversionRule.objectives, 
              function($o) {(
                   $conditions := $getObjConditions($o);
                    $onlyRewardOnce := $count($conditions) > 1 ? " and (" & $join($conditions, " or ") & ")" : $count($conditions) = 1 ? " and (" & $conditions[0] & ")";
                  {
                      "key": $o.ID,
                      "name": $o.name,
                      "trigger": {
                          "triggerType": $o.selectedRule = "customEvent" ? "eventTrigger" : $o.selectedRule = "customFieldEval" ? "criteriaTrigger" : $o.selectedRule = "referral" ? "referralTrigger",
                          "eventKey": $length($o.JSONata) > 0 ? $getEventKey($o),
                           "condition": "goal.isFirstTime" & $onlyRewardOnce
                      },
                      "referrerProgramRewardLimit": $not($o.rewardedUser = "referredOnly") ? {
                              "limitType": $o.maxRewards = "unlimited" ? "unlimited" : "limited",
                              "maxRewards": $o.maxRewards = "specific" ? $o.rewardLimit,
                              "overrideEmailKey": $o.maxRewards = "specific" ? $o.ID = "defaultObjective" ? "rewardLimitReached" : $o.ID & "_rewardLimitReached"
                      },
                      "performsConversion": $o.goalAnalyticOption = 1 ? true : false,
                      "actions": $parseTiers($o)
                  }
              )}
          );

      /* Need to append the objective to an empty array since $map returns an object instead of an array if there is only one element*/
      $objectives := $append(
          [$migratedObjectives, $referralStartedObjective],
      [(
          $retraction := $s.retraction;
          $retractionCondition := (
              $useFilter := $retraction.retractionFilter = 1;
              $cond := $useFilter ? "event.fields." & $retraction.retractionCustomField & " " & 
              $numToOperator($retraction.retractionCustomFieldOperator) & " " & $inferType($retraction.retractionCustomFieldOperandValue)
          );
          $s.retraction.retractionEnabled and $s.retraction.retractionType in [0,1,2] ? {
              "key": "defaultRetraction",
              "name": "Retraction",
              "trigger": {
                  "triggerType": "eventTrigger",
                  "eventKey": $s.retraction.retractionEventKey,
                  "condition": $retractionCondition
              },
              "referrerProgramRewardLimit": {
                  "limitType": "unlimited"
              },
              "performsConversion": false,
              "actions": $getRetractionActions($migratedObjectives)
          }
      )]);
      {
          "version": "4.0.0",
          "conversionRule": {
              "objectives": $objectives
          }
      }
      ) : $s
  )};

  $ ~> $one ~> $two ~> $three
)
`;
