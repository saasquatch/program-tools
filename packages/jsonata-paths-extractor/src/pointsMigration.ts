export const pointsMigrationScript = `(
    $oneToTwo := function($rules) {
        $rules.version = "1.0.0" ? {
            "version": "2.0.0",
            "programWindow": $rules.programWindow,
            "conversionCriteria": $rules.pointsConversionCriteria,
            "rewardDelayDuration": $rules.delayedRewardingWindow,
            "rewardExpiryDuration": $rules.pointsExpiryDuration,
            "rewardUnit": '"POINT"'
        } : $rules
    };

    $twoToThree := function($rules) {(
        /**
         * Calculates the adjusted reward expiry period for version 2.0.0 -> 3.0.0 migration.
         *
         * The program that implemented the v2.0.0 schema had special logic for calculating the expiry
         * date for rewards in that it used the dateScheduledFor (set if there was a rewardDelayDuration)
         * as the start date for adding the rewardExpiryDuration to.
         *
         * If there was no rewardDelayDuration then the start date would be the time of the transaction.
         *
         * In the v3.0.0 program, the pending and expiry dates are based on the same start date, so to provide
         * a fully backwards-compatible upgrade path the rewardExpiryDuration needs to be ADDED to the
         * rewardDelayDuration if it exists.
         *
         * For example, if the v2.0.0 rules were:
         *  rewardDelayDuration: P1Y
         *  rewardExpiryDuration: P1Y
         *
         * Then the migrated expiry duration will be P2Y (i.e. one year after the reward was released, rather
         * than one year after it was created).
         */
        $calculateAdjustedExpiryPeriod := function($rewardDelayDuration, $rewardExpiryDuration) {(
          $initialExpiryDuration := $Duration.fromISO($uppercase($rewardExpiryDuration));

          $initialExpiryDuration.toMillis() > 0 
            ? $not($rewardDelayDuration) 
              ? $rewardExpiryDuration
              : (
                $pendingDuration := $Duration.fromISO($uppercase($rewardDelayDuration));
                $expiryDuration := $Duration.fromISO($uppercase($rewardExpiryDuration));

                $not($pendingDuration.isValid) or $not($expiryDuration.isValid)
                  ? $rewardExpiryDuration
                  : $expiryDuration.plus($pendingDuration).toISO()
              )
        )};

        /**
         * The old program config let you create pending/expiry periods that had no length (like P or P0Y).
         * These should be treated equivalently to "do not pend" and "do not expire".
         *
         * This function checks for 0 length durations and if the duration has some length returns a valid JSONata
         * expression for the migrated rules.
         */
        $createDurationExpression := function($durationStr) {
          $durationStr ? (
            $duration := $Duration.fromISO($uppercase($durationStr));
            $duration.isValid and $not($duration.toMillis() = 0) ? '"' & $duration.toISO() & '"'
          )
        };

        $createMigratedGoal := function() {(
            $ast := $length($rules.conversionCriteria) > 0 ? $parse($rules.conversionCriteria);
            
            $eventKeys := $distinct($ast.[**[
                type = 'binary' and
                value = '=' and
                lhs.type= "path" and
                lhs.steps[0].value = 'event' and
                lhs.steps[1].value = 'key'
            ]].rhs.value);

            $conditions := $ast.[**[type = "condition"]];

            $goalCondition := $join(
             $map($conditions, function($c) { "(" & $serialize($c.condition) & ")" }),
            " or ");

            $tiers := $count($conditions) ? $map($conditions, function($t) {{
                "condition": $serialize($t.condition), 
                "then": $serialize($t.then) 
            }}) : [];

            $adjustedExpiryPeriod := $calculateAdjustedExpiryPeriod($rules.rewardDelayDuration, $rules.rewardExpiryDuration);

            $pendingExpr := $createDurationExpression($rules.rewardDelayDuration);
            $expiryExpr := $createDurationExpression($adjustedExpiryPeriod);

            $action := {
                "actionType": "tieredRewardsAndEmail",
                "name": "Tiered Rewards and Email",
                "key": "migratedGoal_tieredRewardsAndEmail",
                "overrideEmailKey": "pointsRewardReceived",
                "rewardTiers": [$map($tiers, function($t, $i) {{
                    "key": "migratedGoal_tieredRewardsAndEmail_tier" & ($i + 1),
                    "condition": $t.condition,
                    "reward": {
                        "rewardType": "dynamic",
                        "unit": $rules.rewardUnit,
                        "value": $t.then,
                        "pendingExpr": $pendingExpr,
                        "expiryExpr": $expiryExpr
                    }
                }})]
            };

            { 
                "key": "migratedGoal",
                "name": "Migrated Goal",
                "trigger": {
                    "triggerType": "eventTrigger",
                    "eventKeys": [$eventKeys],
                    "condition": $goalCondition
                },
                "actions": [$action]
            }
        )};

        $rules.version = "2.0.0" ? {
            "version": "3.0.0",
            "programWindow": $rules.programWindow,
            "goals": [$createMigratedGoal()]
        } : $rules
    )};

    $ ~> $oneToTwo ~> $twoToThree
)`;
