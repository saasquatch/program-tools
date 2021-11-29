# sqm-task-card



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                        | Type      | Default                                              |
| ----------------- | ------------------- | ---------------------------------------------------------------------------------- | --------- | ---------------------------------------------------- |
| `buttonLink`      | `button-link`       |                                                                                    | `string`  | `"https://example.com/"`                             |
| `buttonText`      | `button-text`       |                                                                                    | `string`  | `"Complete Action"`                                  |
| `cardTitle`       | `card-title`        |                                                                                    | `string`  | `"Title Text"`                                       |
| `dateExpires`     | `date-expires`      |                                                                                    | `string`  | `undefined`                                          |
| `description`     | `description`       |                                                                                    | `string`  | `"Description Text"`                                 |
| `goal`            | `goal`              |                                                                                    | `number`  | `1`                                                  |
| `points`          | `points`            |                                                                                    | `number`  | `0`                                                  |
| `progressBarUnit` | `progress-bar-unit` |                                                                                    | `string`  | `undefined`                                          |
| `repeatable`      | `repeatable`        |                                                                                    | `boolean` | `false`                                              |
| `rewardUnit`      | `reward-unit`       |                                                                                    | `string`  | `"Points"`                                           |
| `showExpire`      | `show-expire`       |                                                                                    | `boolean` | `false`                                              |
| `showProgressBar` | `show-progress-bar` |                                                                                    | `boolean` | `false`                                              |
| `statType`        | `stat-type`         | Select what type of stat to display for the goal. Manual paths are also supported. | `string`  | `"/programGoals/count/Referral-Started%2Freferrals"` |
| `steps`           | `steps`             |                                                                                    | `boolean` | `false`                                              |


## Dependencies

### Used by

 - [sqm-stencilbook](../sqm-stencilbook)

### Graph
```mermaid
graph TD;
  sqm-stencilbook --> sqm-task-card
  style sqm-task-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
