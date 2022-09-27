# sqm-leaderboard-rank



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                                                                             | Type                                                                    | Default                                                                                           |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `demoData`        | --                 |                                                                                                                                                                                                         | `{ data?: { rank: string; }; }`                                         | `undefined`                                                                                       |
| `interval`        | `interval`         |                                                                                                                                                                                                         | `string`                                                                | `undefined`                                                                                       |
| `leaderboardType` | `leaderboard-type` |                                                                                                                                                                                                         | `"topConvertedReferrers" \| "topPointEarners" \| "topStartedReferrers"` | `undefined`                                                                                       |
| `programId`       | `program-id`       | Filters leaderboard to show only data from this program. Defaults to the program context where this leaderboard is. If no program ID is set or provided by context, then a global leaderboard is shown. | `string`                                                                | `undefined`                                                                                       |
| `rankText`        | `rank-text`        |                                                                                                                                                                                                         | `string`                                                                | `"You are currently in {rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th} } place!"` |
| `rankType`        | `rank-type`        |                                                                                                                                                                                                         | `"denseRank" \| "rank" \| "rowNumber"`                                  | `undefined`                                                                                       |
| `unrankedText`    | `unranked-text`    |                                                                                                                                                                                                         | `string`                                                                | `undefined`                                                                                       |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
