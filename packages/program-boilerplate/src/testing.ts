import { join } from 'path';
import { readdirSync } from 'fs';

import { triggerProgram } from './index';

export function getTriggerBody(trigger: any) {
  const triggerClone = JSON.parse(JSON.stringify(PROGRAM_TRIGGER));
  return { ...triggerClone, ...trigger };
}

export function getIntrospectionBody(trigger: any) {
  const triggerClone = JSON.parse(JSON.stringify(PROGRAM_INTROSPECTION));
  return { ...triggerClone, ...trigger };
}

export function tester(dirname): (tests, handlers) => void {
  return function(tests: any, handlers: any) {
    Object.entries(tests).forEach(([key, val]) => {
      describe(key, () => {
        readdirSync(join(dirname, val as string)).forEach(file => {
          const fname = join(dirname, val as string, file);

          if (!file.endsWith('.ts')) {
            return;
          }

          const { test } = require(fname);
          const body = key === 'PROGRAM_INTROSPECTION'
            ? getIntrospectionBody(test.trigger)
            : getTriggerBody(test.trigger);
            const { json, code } = triggerProgram(body, handlers);

            it(test.name, () => {
              expect(json).toEqual(test.result);
              expect(code).toEqual(test.code);
            });
        });
      });
    });
  }
}

const PROGRAM_TRIGGER = {
  "activeTrigger":{
    "type":"AFTER_USER_CREATED_OR_UPDATED",
    "time":1556838795107,
    "user":{
      "id":"5b4e107297427c27ca1faf89",
      "accountId":"5b4e107297427c27ca1faf8a",
      "firstName":"Yoshihiko",
      "lastName":"Sakurano",
      "referralCode":"BTY07MSSOZXZBJ4",
      "imageUrl":"",
      "email":"zojenof.o22@example.com",
      "cookieId":null,
      "locale":null,
      "referable":true,
      "firstSeenIP":null,
      "lastSeenIP":null,
      "firstSeenGeoData":null,
      "lastSeenGeoData":null,
      "dateCreated":1531844080647,
      "dateBlocked":null,
      "customFields":{
        "address":"619-2784 Rujpacsov Turnpike",
        "province":"Yukon",
        "city":"Najtondumbad",
        "timeZone":"America/Tijuana",
        "postal":"X1S 6M3"
      },
      "segments":[

      ],
      "fraudFlags":[

      ],
      "rewards":{
        "totalCount":0,
        "data":[

        ]
      },
      "referrals":{
        "totalCount":0
      },
      "referredByReferral": null
    },
    "previous":{
      "id":"5b4e107297427c27ca1faf89",
      "accountId":"5b4e107297427c27ca1faf8a",
      "firstName":"Yoshihiko",
      "lastName":"Sakurano",
      "referralCode":"BTY07MSSOZXZBJ4",
      "imageUrl":"",
      "email":"zojenof.oc@example.com",
      "cookieId":null,
      "locale":null,
      "referable":true,
      "firstSeenIP":null,
      "lastSeenIP":null,
      "firstSeenGeoData":null,
      "lastSeenGeoData":null,
      "dateCreated":1531844080647,
      "dateBlocked":null,
      "customFields":{
        "address":"619-2784 Rujpacsov Turnpike",
        "province":"Yukon",
        "city":"Najtondumbad",
        "timeZone":"America/Tijuana",
        "postal":"X1S 6M3"
      },
      "segments":[

      ],
      "fraudFlags":[

      ]
    },
    "events":[

    ]
  },
  "program":{
    "id":"r1",
    "rules":{
      "conversionRule":{
        "selectedRule":"firstPurchase"
      },
      "referrerRewardRules":{
        "makeObjectNotNull":true
      },
      "rewardReferred":"referral",
      "programRewardRules":{
        "rewardReferred":{
          "rewardOnConversionOrReferral":true,
          "rewardReferredUser":true
        },
        "maxRewardNumber":{
          "maxNumber":false
        }
      },
      "referredRewardRules":{
        "rewardReferred":"referral"
      },
      "conversionRules":{
        "selectedRule":"firstPurchase"
      }
    }
  },
  "tenant":{
    "settings":{
      "suspectedFraudModerationState":"IGNORE"
    }
  },
  "ids":[
    "5ccb798b54c88739fa0727fc",
    "5ccb798b54c88739fa072807",
    "5ccb798b54c88739fa072808",
    "5ccb798b54c88739fa072809",
    "5ccb798b54c88739fa07280a",
    "5ccb798b54c88739fa07280b",
    "5ccb798b54c88739fa07280c",
    "5ccb798b54c88739fa07280d",
    "5ccb798b54c88739fa07280e",
    "5ccb798b54c88739fa07280f"
  ],
  "version":"1.0.0",
  "messageType":"PROGRAM_TRIGGER"
};

const PROGRAM_INTROSPECTION = {
  "version":"1.0.0",
  "messageType":"PROGRAM_INTROSPECTION",
  "template":{
    "id":"3SwUEW7FhS6KI4U2Mm2GEi",
    "name":"Partner Program",
    "summary":"This program rewards qualified partners with cash-based commission rewards.",
    "longDescription":"# Use Cases\n\nThe Partner Program is perfect for:\n- Reaching new customers \n- Deepening relationships with your top brand advocates \n- Offering commission-based cash rewards\n\n# Quickstart\n\n1. Ensure your platform integration is configured to pass revenue information to SaaSquatch\n2. Select how and when partners and new users will be rewarded (commission or set reward)\n3. Define your rewards for partners and/or newly referred customers\n4. Customize your reward notification emails, widgets and sharing settings\n5. Launch your program!\n\n\n# How it works\n\nThe SaaSquatch system tracks referral activity and the revenue generated by referrals.\nYou have the ability to customize the logic behind your partner program by setting the Program Reward Rules in the SaaSquatch Portal. These rules will determine when and how your partners and referred users are rewarded. \n\nFor static rewards, you can configure SaaSqautch to automatically apply the rewards through a fulfillment integration and your end users will be notified by email that their referral reward is now available in their accounts.\n\nIf you are rewarding your partners with commission payouts, you can access their earned credits through the SaaSquatch portal, fulfill these payments through your preferred payment provider and easily update the SaaSquatch system using the Bulk Import reporting process.\n\n# Supported Rewards\n\nSaaSquatch's API-based programs provide the power and flexibility to customize the type of rewards that you offer your partners and newly referred customers. These include:\n- Cash\n- Dollar Credit\n- Percent Discount\n- Points\n- Gift Cards\n- Custom Rewards",
    "emails":[
      {
        "key":"referredRewardReceived",
        "name":"Referred User Rewarded",
        "description":"We send this email when a user has been referred and rewarded.",
        "defaults":{
          "meta":{
            "subject":"Welcome! You have been referred by your friends!",
            "fromName":"{{tenant.settings.companyName}}",
            "fromAddress":"referral@mail.saasquat.ch"
          },
          "htmlContent":""
        }
      }
    ],
    "rewards":[
      {
        "key":"partnerReward",
        "name":"Partner Reward",
        "description":"The reward given to partners for a qualified purchase.",
        "isDynamic":false
      },
      {
        "key":"referredReward",
        "name":"Referred Reward",
        "description":"The reward given to new users that have been referred.",
        "isDynamic":false
      }
    ],
    "widgets":[
      {
        "key":"partnerWidget",
        "name":"Partner Widget",
        "description":"Widget displayed to a user who has referred friends",
        "defaults":{
          "meta":{
            "plugins":[
              {
                "package":"@saasquatch/vanilla-components-grapesjs",
                "version":"1.0.x",
                "filePath":""
              }
            ],
            "dependencies":[
              {
                "package":"@saasquatch/vanilla-components",
                "version":"1.0.x",
                "filePath":"/dist/widget-components.js"
              },
              {
                "package":"@saasquatch/vanilla-components-assets",
                "version":"0.0.x",
                "filePath":"/icons.css"
              }
            ]
          },
          "htmlTemplate":""
        }
      },
      {
        "key":"referredWidget",
        "name":"Referred Widget",
        "description":"When you have been referred",
        "defaults":{
          "meta":{
            "plugins":[
              {
                "package":"@saasquatch/vanilla-components-grapesjs",
                "version":"1.0.x",
                "filePath":""
              }
            ],
            "dependencies":[
              {
                "package":"@saasquatch/vanilla-components",
                "version":"1.0.x",
                "filePath":"/dist/widget-components.js"
              }
            ]
          },
          "htmlTemplate":""
        }
      }
    ],
    "userMetrics":[

    ],
    "rules":{
      "type":"object",
      "$schema":"http://json-schema.org/draft-06/schema#",
      "properties":{
        "minPurchaseValue":{
          "type":"number",
          "title":"Set minimum purchase value (optional)"
        },
        "referredRewardRules":{
          "type":"object",
          "title":"Referred User Reward Rules",
          "required":[
            "rewardReferred"
          ],
          "properties":{
            "rewardReferred":{
              "enum":[
                "never",
                "referral",
                "conversion"
              ],
              "type":"string",
              "title":"Set when referred users should get a reward (required)",
              "default":"referral",
              "enumNames":[
                "Never",
                "When they are referred",
                "On their first qualifying purchase"
              ]
            }
          }
        },
        "referrerRewardRules":{
          "type":"object",
          "title":"Partner Reward Rules",
          "properties":{
            "refundWindow":{
              "type":"string",
              "title":"Purchase Refund Period",
              "default":"P0Y0M0D"
            },
            "commissionWindow":{
              "type":"string",
              "title":"Earnable Reward Period",
              "default":"P0Y0M0D"
            },
            "dynamicCommission":{
              "type":"object",
              "title":"",
              "required":[
                "isDynamic"
              ],
              "properties":{
                "isDynamic":{
                  "enum":[
                    true,
                    false
                  ],
                  "type":"boolean",
                  "title":"Partner will earn commission-based rewards",
                  "default":true
                }
              },
              "dependencies":{
                "isDynamic":{
                  "oneOf":[
                    {
                      "properties":{
                        "isDynamic":{
                          "enum":[
                            false
                          ]
                        }
                      }
                    },
                    {
                      "required":[
                        "commissionPct"
                      ],
                      "properties":{
                        "isDynamic":{
                          "enum":[
                            true
                          ]
                        },
                        "commissionPct":{
                          "type":"number",
                          "title":"Commission Percentage Value",
                          "exclusiveMinimum":0.0
                        },
                        "defaultCurrency":{
                          "$ref":"#/definitions/currency"
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "definitions":{
        "currency":{
          "enum":[
            "USD",
            "AED",
            "AFN",
            "ALL",
            "AMD",
            "ANG",
            "AOA",
            "ARS",
            "AUD",
            "AWG",
            "AZN",
            "BAM",
            "BBD",
            "BDT",
            "BGN",
            "BHD",
            "BIF",
            "BMD",
            "BND",
            "BOB",
            "BOV",
            "BRL",
            "BSD",
            "BTN",
            "BWP",
            "BYR",
            "BZD",
            "CAD",
            "CDF",
            "CHE",
            "CHF",
            "CHW",
            "CLF",
            "CLP",
            "CNY",
            "COP",
            "COU",
            "CRC",
            "CUC",
            "CUP",
            "CVE",
            "CZK",
            "DJF",
            "DKK",
            "DOP",
            "DZD",
            "EGP",
            "ERN",
            "ETB",
            "EUR",
            "FJD",
            "FKP",
            "GBP",
            "GEL",
            "GHS",
            "GIP",
            "GMD",
            "GNF",
            "GTQ",
            "GYD",
            "HKD",
            "HNL",
            "HRK",
            "HTG",
            "HUF",
            "IDR",
            "ILS",
            "INR",
            "IQD",
            "IRR",
            "ISK",
            "JMD",
            "JOD",
            "JPY",
            "KES",
            "KGS",
            "KHR",
            "KMF",
            "KPW",
            "KRW",
            "KWD",
            "KYD",
            "KZT",
            "LAK",
            "LBP",
            "LKR",
            "LRD",
            "LSL",
            "LYD",
            "MAD",
            "MDL",
            "MGA",
            "MKD",
            "MMK",
            "MNT",
            "MOP",
            "MRU",
            "MUR",
            "MVR",
            "MWK",
            "MXN",
            "MXV",
            "MYR",
            "MZN",
            "NAD",
            "NGN",
            "NIO",
            "NOK",
            "NPR",
            "NZD",
            "OMR",
            "PAB",
            "PEN",
            "PGK",
            "PHP",
            "PKR",
            "PLN",
            "PYG",
            "QAR",
            "RON",
            "RSD",
            "RUB",
            "RWF",
            "SAR",
            "SBD",
            "SCR",
            "SDG",
            "SEK",
            "SGD",
            "SHP",
            "SLL",
            "SOS",
            "SRD",
            "SSP",
            "STN",
            "SVC",
            "SYP",
            "SZL",
            "THB",
            "TJS",
            "TMT",
            "TND",
            "TOP",
            "TRY",
            "TTD",
            "TWD",
            "TZS",
            "UAH",
            "UGX",
            "USN",
            "UYI",
            "UYU",
            "UZS",
            "VEF",
            "VND",
            "VUV",
            "WST",
            "XAF",
            "XCD",
            "XDR",
            "XOF",
            "XPF",
            "XSU",
            "XUA",
            "YER",
            "ZAR",
            "ZMW",
            "ZWL"
          ],
          "type":"string",
          "title":"Default Reward Currency",
          "default":"USD"
        }
      }
    },
    "rulesUISchema":{
      "ui:order":[
        "referrerRewardRules",
        "referredRewardRules",
        "*"
      ],
      "minPurchaseValue":{
        "ui:help":"For referred users to qualify as a conversion,"
      },
      "referredRewardRules":{
        "rewardReferred":{
          "ui:widget":"radio"
        }
      },
      "referrerRewardRules":{
        "ui:order":[
          "dynamicCommission",
          "refundWindow",
          "commissionWindow"
        ],
        "refundWindow":{
          "ui:help":"Refund detection does not apply to Fuel Tank or Gift Card rewards.",
          "ui:widget":"Duration",
          "ui:options":{
            "doNotUseToggle":true
          }
        },
        "commissionWindow":{
          "ui:help":"The set duration a Partner is eligible to earn rewards.",
          "ui:widget":"Duration",
          "ui:options":{
            "doNotUseToggle":true
          }
        },
        "dynamicCommission":{
          "ui:order":[
            "isDynamic",
            "*"
          ],
          "isDynamic":{
            "ui:widget":"radio",
            "ui:options":{
              "inline":true
            }
          }
        }
      }
    },
    "url":"https://partner-program-staging.herokuapp.com/",
    "logo":"//images.ctfassets.net/1th1ybv0b2n4/VWhgIAgzmuEaEGuMe8kKS/41491ce222b05210db916a7a74c3f6e3/rs-program-icon-lifetime-spend.png",
    "globallyInstallable":true,
    "installableByTenants":[
      "test_aaxiqyu2cdlrf"
    ],
    "schedule":null,
    "schedules":null,
    "sharing":{
      "enabled":true,
      "linksConfig":{
        "defaults":{
          "messages":[
            {
              "config":{
                "twitterShareBody":"YouÆve been sent a reward to use on your first {companyName} purchase. Click the link to claim! {shareLink}"
              },
              "shareMedium":"TWITTER"
            },
            {
              "config":{
                "emailShareBody":"YouÆve been sent a reward to use on your first {companyName} purchase. Click the link to claim! {shareLink}",
                "emailShareSubject":"You have a new reward!"
              },
              "shareMedium":"EMAIL"
            },
            {
              "config":{
                "linkedinShareBody":"YouÆve been sent a reward to use on your first {companyName} purchase. Click the link to claim! {shareLink}",
                "linkedinShareSubject":"You have a new reward!",
                "linkedinShareImageURL":"https://i.imgur.com/MGhXFi6.png"
              },
              "shareMedium":"LINKEDIN"
            },
            {
              "config":{
                "smsShareBody":"YouÆve been sent a reward to use on your first {companyName} purchase. Click the link to claim! {shareLink}"
              },
              "shareMedium":"SMS"
            },
            {
              "config":{
                "whatsAppShareBody":"YouÆve been sent a reward to use on your first {companyName} purchase. Click the link to claim! {shareLink}"
              },
              "shareMedium":"WHATSAPP"
            },
            {
              "config":{
                "lineMessengerShareBody":"YouÆve been sent a reward to use on your first {companyName} purchase. Click the link to claim! {shareLink}"
              },
              "shareMedium":"LINEMESSENGER"
            },
            {
              "config":{
                "pinterestImageURL":"https://i.imgur.com/MGhXFi6.png",
                "pinterestShareBody":"Enjoy this reward to use on your first {companyName} purchase. Click the link to claim! {shareLink}"
              },
              "shareMedium":"PINTEREST"
            }
          ],
          "shareLinkOpenGraph":{
            "image":"https://i.imgur.com/MGhXFi6.png",
            "title":"YouÆve received a reward from {companyName}",
            "source":"HOSTED",
            "description":"YouÆve been sent a reward, redeemable on your next purchase with {companyName}. Enjoy! "
          },
          "messageLinkOpenGraph":{
            "title":"YouÆve received a {referredReward} from {companyName}",
            "source":"LANDING_PAGE",
            "description":"YouÆve been sent a {referredReward} reward, redeemable on your next purchase with {companyName}. Enjoy!   [CTA Button: ôClaim your {referredReward} Reward!]"
          }
        }
      }
    },
    "trigger":{
      "eventKeys":[
        "purchase"
      ]
    }
  },
  "rules":{
    "firstPurchaseDateCustomFieldKey":"firstPurchaseDateForC1",
    "referrerRewardRules":{
      "refundWindow":"P0Y0M0D",
      "commissionWindow":"P0Y0M0D",
      "dynamicCommission":{
        "isDynamic":true,
        "commissionPct":10
      },
      "isDynamic":true,
      "makeObjectNotNull":true,
      "refundWindowMillis":3600000,
      "commissionPercentage":0.5
    },
    "referredRewardRules":{
      "rewardReferred":"referral"
    }
  },
  "program":{
    "id":"c1",
    "rewards":[
      {
        "key":"referredReward",
        "name":"Referred Reward",
        "rewardType":"CREDIT",
        "amount":1200,
        "unit":"CENTS",
        "validityDuration":null,
        "fuelTankType":null
      },
      {
        "key":"referrerReward",
        "name":"Referrer Reward",
        "rewardType":"CREDIT",
        "amount":1100,
        "unit":"CENTS",
        "validityDuration":null,
        "fuelTankType":null
      }
    ]
  }
};

