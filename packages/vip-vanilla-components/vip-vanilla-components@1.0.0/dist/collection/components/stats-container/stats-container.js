import { API } from '../../services/WidgetHost';
import pathToRegexp from "path-to-regexp";
import { css } from 'emotion';
export class StatsContainer {
    constructor() {
        this.ishidden = false;
        this.statPaths = [
            "/rewardBalance/:type/:unit/:valuetype?",
            "/:statName"
        ];
        this.statPathRegexp = this.statPaths.map(path => {
            const keys = [];
            const regexp = pathToRegexp(path, keys);
            return { regexp, keys };
        });
        this.loading = true;
    }
    componentWillLoad() {
        if (!this.ishidden) {
            return API.graphql.getStats().then(res => {
                this.stats = {
                    referralsCount: res.referralsCount.totalCount,
                    referralsMonth: res.referralsMonth.totalCount,
                    referralsWeek: res.referralsWeek.totalCount,
                    rewardsCount: res.rewardsCount.totalCount,
                    rewardsMonth: res.rewardsMonth.totalCount,
                    rewardsWeek: res.rewardsWeek.totalCount,
                    rewardBalances: res.rewardBalances
                };
                this.loading = false;
            }).then(() => {
                const children = Array.from(this.container.querySelectorAll('sqh-stat-component'));
                children.map(child => {
                    this.setStatValue(child);
                });
            }).catch(e => {
                this.onError(e);
            });
        }
    }
    statTypeUpdatedHandler(event) {
        this.setStatValue(event.detail);
    }
    statAddedHandler(event) {
        if (this.stats)
            this.setStatValue(event.detail);
    }
    setStatValue(child) {
        const path = child.getAttribute("stattype");
        const stat = this.getStatFromPath(path);
        child.setAttribute('statvalue', `${stat}`);
        return child;
    }
    getStatFromPath(path) {
        const statPath = this.statPathRegexp.find(stat => stat.regexp.test(path));
        if (!statPath)
            return 0;
        const { keys, regexp } = statPath;
        const res = regexp.exec(path);
        const statVariables = {};
        keys.forEach((k, i) => statVariables[k.name] = res[i + 1]);
        return this.getStatValue(statVariables);
    }
    getStatValue(statVariables) {
        if (statVariables.statName)
            return this.stats[statVariables.statName] || 0;
        return this.getRewardBalance(statVariables);
    }
    getRewardBalance(statVariables) {
        const { type, unit, valuetype } = statVariables;
        // passing in CASH/USD as CASH_USD into this webcomponent so pathToRegexp doesn't split it and it stays all in unit.
        // this converts the _ back to / so that it matches the unit from the backend
        // possibly change the unit in the backend to avoid this?
        const newUnit = unit.replace(/_/, "/");
        const rewardBalance = this.stats['rewardBalances'].find(rb => rb.type === type && rb.unit === newUnit);
        if (!rewardBalance)
            return 0;
        if (valuetype)
            return rewardBalance[valuetype];
        return rewardBalance.value;
    }
    onError(e) {
        console.log("Error loading via GraphQL.", e);
        this.loading = false;
    }
    render() {
        const containerStyle = css `
      display: ${this.ishidden ? 'none' : 'inherit'};
      padding-top: ${this.paddingtop}px;
      padding-bottom: ${this.paddingbottom}px;
    `;
        return h("div", { class: containerStyle },
            h("slot", null));
    }
    static get is() { return "sqh-stats-container"; }
    static get properties() { return {
        "container": {
            "elementRef": true
        },
        "ishidden": {
            "type": Boolean,
            "attr": "ishidden"
        },
        "loading": {
            "state": true
        },
        "paddingbottom": {
            "type": String,
            "attr": "paddingbottom"
        },
        "paddingtop": {
            "type": String,
            "attr": "paddingtop"
        },
        "stats": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "statTypeUpdated",
            "method": "statTypeUpdatedHandler"
        }, {
            "name": "statAdded",
            "method": "statAddedHandler"
        }]; }
    static get style() { return "/**style-placeholder:sqh-stats-container:**/"; }
}
