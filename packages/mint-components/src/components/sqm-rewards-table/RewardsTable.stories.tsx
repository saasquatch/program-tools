import { h } from "@stencil/core";

export default {
  title: "Components/Rewards Table",
};

const test = {
  states: {
    hasNext: true,
    hasPrev: false,
    show: "rows",
    namespace: "sqm-rewards-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "Next",
    },
    hiddenColumns: "0",
    smBreakpoint: 599,
    mdBreakpoint: 899,
  },
  callbacks: {},
  elements: {
    columns: ["Reward", "Status", "Source", "Date received"],
    rows: [
      [
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-reward-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6b16cc540e209db45cfa",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934550726,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6b0fcc540e209db45b53",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6b0ce4b0d81c67b78e82",
                  firstName: "Aaron",
                  lastName: "Hernandez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            redeemedText: "{redeemedAmount} redeemed",
            availableText: "{availableAmount} available",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-status-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            statusText:
              "{status, select, AVAILABLE {Available} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
            reward: {
              id: "5cae6b16cc540e209db45cfa",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934550726,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6b0fcc540e209db45b53",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6b0ce4b0d81c67b78e82",
                  firstName: "Aaron",
                  lastName: "Hernandez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            expiryText: "Expires on ",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-source-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6b16cc540e209db45cfa",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934550726,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6b0fcc540e209db45b53",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6b0ce4b0d81c67b78e82",
                  firstName: "Aaron",
                  lastName: "Hernandez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            anonymousUserText: "Anonymous User",
            deletedUserText: "Deleted User",
            rewardExchangeText: "Reward Exchange",
            referralText:
              "{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}",
            rewardSourceText:
              "{rewardSource, select, MANUAL {Manual} AUTOMATED {Automated} other {}}",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-date-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            date: 1554934550726,
          },
          $key$: null,
          $name$: null,
        },
      ],
      [
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-reward-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6ab7cc540e209db456cc",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934455495,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a92cc540e209db45106",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a8fe4b0d81c67b78e60",
                  firstName: "Brian",
                  lastName: "Mendez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            redeemedText: "{redeemedAmount} redeemed",
            availableText: "{availableAmount} available",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-status-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            statusText:
              "{status, select, AVAILABLE {Available} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
            reward: {
              id: "5cae6ab7cc540e209db456cc",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934455495,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a92cc540e209db45106",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a8fe4b0d81c67b78e60",
                  firstName: "Brian",
                  lastName: "Mendez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            expiryText: "Expires on ",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-source-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6ab7cc540e209db456cc",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934455495,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a92cc540e209db45106",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a8fe4b0d81c67b78e60",
                  firstName: "Brian",
                  lastName: "Mendez",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            anonymousUserText: "Anonymous User",
            deletedUserText: "Deleted User",
            rewardExchangeText: "Reward Exchange",
            referralText:
              "{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}",
            rewardSourceText:
              "{rewardSource, select, MANUAL {Manual} AUTOMATED {Automated} other {}}",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-date-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            date: 1554934455495,
          },
          $key$: null,
          $name$: null,
        },
      ],
      [
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-reward-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6a46cc540e209db44cf2",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934342984,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a42cc540e209db44b5a",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a40e4b0d81c67b78e3e",
                  firstName: "Loretta",
                  lastName: "Harper",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            redeemedText: "{redeemedAmount} redeemed",
            availableText: "{availableAmount} available",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-status-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            statusText:
              "{status, select, AVAILABLE {Available} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
            reward: {
              id: "5cae6a46cc540e209db44cf2",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934342984,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a42cc540e209db44b5a",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a40e4b0d81c67b78e3e",
                  firstName: "Loretta",
                  lastName: "Harper",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            expiryText: "Expires on ",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-source-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            reward: {
              id: "5cae6a46cc540e209db44cf2",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934342984,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              prettyValueNumber: "1",
              prettyAvailableNumber: "0",
              prettyRedeemedNumber: "1",
              statuses: ["REDEEMED"],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              rewardSource: "FRIEND_SIGNUP",
              prettyRedeemedCredit: "1 Point",
              prettyAssignedCredit: "1 Point",
              prettyAvailableValue: "0 Points",
              exchangedRewardRedemptionTransaction: null,
              referral: {
                id: "5cae6a42cc540e209db44b5a",
                referrerUser: {
                  id: "testestest",
                  firstName: "jimbo",
                  lastName: "neutron",
                },
                referredUser: {
                  id: "5cae6a40e4b0d81c67b78e3e",
                  firstName: "Loretta",
                  lastName: "Harper",
                },
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            anonymousUserText: "Anonymous User",
            deletedUserText: "Deleted User",
            rewardExchangeText: "Reward Exchange",
            referralText:
              "{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}",
            rewardSourceText:
              "{rewardSource, select, MANUAL {Manual} AUTOMATED {Automated} other {}}",
          },
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-rewards-table-date-cell",
          $text$: null,
          $elm$: {
            "s-p": [],
            "s-hn": "SQM-REWARDS-TABLE",
          },
          $children$: null,
          $attrs$: {
            date: 1554934342984,
          },
          $key$: null,
          $name$: null,
        },
      ],
    ],
    emptyElement: {
      $flags$: 0,
      $tag$: "slot",
      $text$: null,
      $elm$: null,
      $children$: [
        {
          $flags$: 0,
          $tag$: "div",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-text",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "h3",
                  $text$: null,
                  $elm$: null,
                  $children$: [
                    {
                      $flags$: 0,
                      $tag$: null,
                      $text$: "No Rewards Yet",
                      $elm$: null,
                      $children$: null,
                      $attrs$: null,
                      $key$: null,
                      $name$: null,
                    },
                  ],
                  $attrs$: {
                    style: {
                      color: "#777777",
                    },
                  },
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: null,
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: {
            style: {
              width: "100%",
            },
          },
          $key$: null,
          $name$: null,
        },
      ],
      $attrs$: {
        name: "empty",
      },
      $key$: null,
      $name$: "empty",
    },
    loadingElement: {
      $flags$: 0,
      $tag$: "slot",
      $text$: null,
      $elm$: null,
      $children$: [
        {
          $flags$: 0,
          $tag$: "sqm-table-row",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-table-cell",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "sl-skeleton",
                  $text$: null,
                  $elm$: null,
                  $children$: null,
                  $attrs$: null,
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: {
                colspan: 5,
              },
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: null,
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-table-row",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-table-cell",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "sl-skeleton",
                  $text$: null,
                  $elm$: null,
                  $children$: null,
                  $attrs$: null,
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: {
                colspan: 5,
              },
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: null,
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-table-row",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-table-cell",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "sl-skeleton",
                  $text$: null,
                  $elm$: null,
                  $children$: null,
                  $attrs$: null,
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: {
                colspan: 5,
              },
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: null,
          $key$: null,
          $name$: null,
        },
        {
          $flags$: 0,
          $tag$: "sqm-table-row",
          $text$: null,
          $elm$: null,
          $children$: [
            {
              $flags$: 0,
              $tag$: "sqm-table-cell",
              $text$: null,
              $elm$: null,
              $children$: [
                {
                  $flags$: 0,
                  $tag$: "sl-skeleton",
                  $text$: null,
                  $elm$: null,
                  $children$: null,
                  $attrs$: null,
                  $key$: null,
                  $name$: null,
                },
              ],
              $attrs$: {
                colspan: 5,
              },
              $key$: null,
              $name$: null,
            },
          ],
          $attrs$: null,
          $key$: null,
          $name$: null,
        },
      ],
      $attrs$: {
        name: "loading",
      },
      $key$: null,
      $name$: "loading",
    },
  },
};

export const Tab = () => {
  return <sqm-rewards-table-date-cell></sqm-rewards-table-date-cell>;
};

export const EmptyCell = () => {
  return <sqm-rewards-table-date-cell></sqm-rewards-table-date-cell>;
};
