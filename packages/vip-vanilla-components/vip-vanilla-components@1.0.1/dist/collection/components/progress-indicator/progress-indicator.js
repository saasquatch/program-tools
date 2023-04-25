var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ProgressBar from 'progressbar.js';
import { API } from '../../services/WidgetHost';
import { css } from 'emotion';
import FormatJS from '../../services/FormatJs';
export class ProgressIndicator {
    constructor() {
        this.ishidden = false;
        this.loading = true;
        this.Present = () => {
            return h("svg", { width: "100", height: "100", viewBox: "0 0 566 394", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
                h("g", { id: "vip-reward-box-outlines", stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
                    h("g", { id: "Gift-Box-Illustration", transform: "translate(21.000000, 16.000000)" },
                        h("g", { id: "Group-4", transform: "translate(88.000000, 69.424658)", fill: this[this.widgetMode + 'presentcolor'], "fill-rule": "nonzero" },
                            h("path", { d: "M35.9907976,88.0205479 L310.663709,88.0205479 C318.875344,88.0205479 325.532189,94.6773932 325.532189,102.889028 L325.532189,277.706862 C325.532189,285.918497 318.875344,292.575342 310.663709,292.575342 L35.9907976,292.575342 C27.7791628,292.575342 21.1223176,285.918497 21.1223176,277.706862 L21.1223176,102.889028 C21.1223176,94.6773932 27.7791628,88.0205479 35.9907976,88.0205479 Z M42.1859976,109.084228 L42.1859976,271.511662 L304.468509,271.511662 L304.468509,109.084228 L42.1859976,109.084228 Z", id: "Rectangle" }),
                            h("path", { d: "M14.86848,0.15891007 L333.028516,0.15891007 C341.24015,0.15891007 347.896996,6.81575531 347.896996,15.0273901 L347.896996,94.3863205 C347.896996,102.597955 341.24015,109.2548 333.028516,109.2548 L14.86848,109.2548 C6.65684524,109.2548 0,102.597955 0,94.3863205 L0,15.0273901 C0,6.81575531 6.65684524,0.15891007 14.86848,0.15891007 Z M21.06368,21.2225901 L21.06368,88.1911205 L326.833316,88.1911205 L326.833316,21.2225901 L21.06368,21.2225901 Z", id: "Rectangle" }),
                            h("path", { d: "M121,87.5753425 L215.177627,87.5753425 C223.363797,87.5753425 230,92.2396223 230,97.9933031 L230,282.157382 C230,287.911063 223.363797,292.575342 215.177627,292.575342 L135.822373,292.575342 C127.636203,292.575342 121,287.911063 121,282.157382 L121,87.5753425 Z M142,102.575342 L142,277.575342 L209,277.575342 L209,102.575342 L142,102.575342 Z", id: "Rectangle" })),
                        h("ellipse", { id: "Oval", stroke: this[this.widgetMode + 'presentcolor'], "stroke-width": "14.5711104", cx: "472.953863", cy: "200.469178", rx: "11.8036481", ry: "11.7773973" }),
                        h("ellipse", { id: "Oval", stroke: this[this.widgetMode + 'presentcolor'], "stroke-width": "14.5711104", cx: "502.953863", cy: "110.469178", rx: "11.8036481", ry: "11.7773973" }),
                        h("g", { id: "x-Mark", transform: "translate(496.892691, 283.941336) rotate(51.000000) translate(-496.892691, -283.941336) translate(474.392691, 261.441336)", stroke: this[this.widgetMode + 'presentcolor'], "stroke-linecap": "round", "stroke-width": "14.5711104" },
                            h("path", { d: "M29.8197425,0 L14.9098712,44.630137", id: "Line-2" }),
                            h("path", { d: "M44.7296137,29.7534247 L0,14.8767123", id: "Line-2" })),
                        h("ellipse", { id: "Oval", stroke: this[this.widgetMode + 'presentcolor'], "stroke-width": "14.5711104", cx: "11.9903433", cy: "122.866438", rx: "11.8036481", ry: "11.7773973" }),
                        h("g", { id: "Bow", transform: "translate(163.791845, 0.000000)", stroke: this[this.widgetMode + 'presentcolor'], "stroke-linecap": "round", "stroke-width": "21.06368" },
                            h("path", { d: "M103.114059,70.6643836 C131.339262,27.389518 153.398132,5.75208521 169.29067,5.75208521 C193.129477,5.75208521 206.337166,25.7136653 185.782888,47.5779179 C172.080036,62.1540864 144.193266,69.8495749 102.122578,70.6643836", id: "Line-2" }),
                            h("path", { d: "M0.991481337,64.9122984 C29.2166839,21.6374328 51.2755542,2.62900812e-13 67.1680924,2.62900812e-13 C91.0068997,2.62900812e-13 104.214589,19.9615801 83.6603104,41.8258327 C69.9574582,56.4020012 42.0706881,64.0974897 1.91846539e-13,64.9122984", id: "Line-2", transform: "translate(46.914137, 32.456149) scale(-1, 1) translate(-46.914137, -32.456149) " }))),
                    h("circle", { id: "Oval", stroke: this[this.widgetMode + 'presentcolor'], "stroke-width": "14.5711104", cx: "32", cy: "290", r: "12" }),
                    h("g", { id: "x-Mark", transform: "translate(72.500000, 217.500000) rotate(72.000000) translate(-72.500000, -217.500000) translate(50.000000, 195.000000)", stroke: this[this.widgetMode + 'presentcolor'], "stroke-linecap": "round", "stroke-width": "14.5711104" },
                        h("path", { d: "M29.8197425,0 L14.9098712,44.630137", id: "Line-2" }),
                        h("path", { d: "M44.7296137,29.7534247 L0,14.8767123", id: "Line-2" }))));
        };
        this.progressBar = () => {
            const circleStyle = css `
      transform: scaleX(-1);
    `;
            const textStyle = css `
      position: absolute; 
      left: ${this.rewardComplete ? '53.5%' : '55%'}; 
      top:82%; 
      padding: 0px; 
      margin: 0px; 
      transform: translate(-50%, -50%); 
      color: ${this[this.widgetMode + 'percentagecolor'] || 'rgb(0, 157, 245)'}; 
      font-family: Roboto, Helvetica, sans-serif; 
      font-size: ${this.rewardComplete ? '30px' : '34px'};
      font-weight:bold;
    `;
            const presentStyle = css `
      position: absolute; 
      left: 53%; 
      top: 52%; 
      transform: translate(-50%, -50%);
    `;
            const percentStyle = css `
      font-size:65%;
      vertical-align: top;
      display: inline-block;
      margin-top: 3px;
      margin-left: ${this.rewardComplete ? '0px' : '-1px'};
    `;
            const completeStyle = css `
      margin-top:0em;
      font-size:16px;
    `;
            return [
                h("svg", { class: circleStyle, width: "210px", height: "210px", viewBox: "0 0 133 133", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                    h("g", { id: "blue-semi-circle", stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" },
                        h("path", { d: "M94.2309355,112 C106.803489,103.004938 115,88.2630912 115,71.6028679 C115,44.2079604 92.8380951,22 65.5,22 C38.1619049,22 16,44.2079604 16,71.6028679 C16,88.1040219 24.0407405,102.723258 36.4101421,111.740781", id: "Grey-Semi", stroke: "#E9E9E9", "stroke-width": "6.5" }),
                        h("path", { id: "custom-circle", d: "M94.2309355,112 C106.803489,103.004938 115,88.2630912 115,71.6028679 C115,44.2079604 92.8380951,22 65.5,22 C38.1619049,22 16,44.2079604 16,71.6028679 C16,88.1040219 24.0407405,102.723258 36.4101421,111.740781", stroke: this[this.widgetMode + 'progresscolor'], "stroke-width": "6.5" }))),
                h("span", { class: presentStyle }, this.Present()),
                h("div", { class: textStyle },
                    h("br", null),
                    this.rewardStats && Math.round(this.rewardStats.progress * 100),
                    h("span", { class: percentStyle }, "%"),
                    h("br", null),
                    h("p", { class: completeStyle }, "COMPLETE"))
            ];
        };
    }
    LoadingState() {
        return (h("div", { class: "container-loading" },
            h("div", { class: "loading-icon" },
                h("div", { class: "bar1" }),
                h("div", { class: "bar2" }),
                h("div", { class: "bar3" }),
                h("div", { class: "bar4" }),
                h("div", { class: "bar5" }))));
    }
    componentWillLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            const userProgress = yield API.graphql.getUserProgress();
            const programRules = yield API.graphql.getProgramRules();
            this.loading = false;
            const purchaseTotal = userProgress.customFields[programRules.id + '_totalValue'] || 0;
            const programGoal = programRules.rules.rewardRules.rewardGoal;
            this.rewardStats = {
                amountEarned: userProgress.rewardBalanceDetails[0] ? userProgress.rewardBalanceDetails[0].prettyAvailableValue : null,
                purchaseTotal,
                programGoal,
                progress: Math.floor(((purchaseTotal % programGoal) / programGoal) * 100) / 100,
                progressToGoal: Math.floor((programGoal - (purchaseTotal % programGoal)))
            };
            this.widgetMode = this.rewardStats.progress ? "inprogress" : "noprogress";
        });
    }
    componentDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.rewardStats.purchaseTotal > 0 && this.rewardStats.purchaseTotal % this.rewardStats.programGoal == 0) {
                this.rewardComplete = true;
                this.rewardStats.progress = 1;
                this.widgetMode = "completed";
                this.getProgress();
                return;
            }
            if (window["widgetIdent"].env === "demo") {
                this.editorModeUpdated();
            }
            this.getProgress();
            this.updateText();
        });
    }
    componentWillUpdate() {
        this.updateText();
    }
    editorModeUpdated() {
        this.widgetMode = this.editormode;
        switch (this.editormode) {
            case "noprogress":
                this.rewardStats = {
                    amountEarned: '$10.00',
                    purchaseTotal: 0,
                    programGoal: 24,
                    progress: 0,
                    progressToGoal: 24
                };
                this.rewardComplete = false;
                this.getProgress();
                this.updateText();
                break;
            case "inprogress":
                this.rewardStats = {
                    amountEarned: '$10.00',
                    purchaseTotal: 16,
                    programGoal: 24,
                    progress: 0.66,
                    progressToGoal: 16
                };
                this.rewardComplete = false;
                this.getProgress();
                this.updateText();
                break;
            case "completed":
                this.rewardStats = {
                    amountEarned: '$15.00',
                    purchaseTotal: 24,
                    programGoal: 24,
                    progress: 1,
                    progressToGoal: 0
                };
                this.getProgress();
                this.updateText();
                this.rewardComplete = true;
        }
    }
    updateText() {
        const progress = {
            amountNeeded: this.rewardStats.progressToGoal
        };
        const earned = {
            amountEarned: this.rewardStats.amountEarned || 0
        };
        this.progressMessage = FormatJS.format(this[this.widgetMode + 'neededmessage'], progress);
        this.earnedMessage = FormatJS.format(this[this.widgetMode + 'earnedmessage'], earned);
    }
    getProgress() {
        var bar = new ProgressBar.Path('#custom-circle', {
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 8,
            trailWidth: 8,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false
            },
            from: { color: this[this.widgetMode + 'progresscolor'], width: 8 },
            to: { color: this[this.widgetMode + 'progresscolor'], width: 8 },
            // Set default step function for all animate calls
            step: (state, circle) => {
                circle.path.setAttribute('stroke', this[this.widgetMode + 'progresscolor']);
                circle.path.setAttribute('stroke-width', state.width);
            }
        });
        bar.animate(this.rewardStats.progress);
    }
    render() {
        const wrapperStyle = css `
      color: ${this[this.widgetMode + 'textcolor']};
      text-align: center;
    `;
        const progressStyle = css `
      position:relative;
      width: ${this.progresswidth};
      margin: 30px auto;
      margin-top:0;
    `;
        return !this.ishidden && (this.loading ? h(this.LoadingState, null) :
            h("div", { class: wrapperStyle },
                h("sqh-text-component", { ismarkdown: true, text: this.earnedMessage || "", paddingtop: "20", color: this[this.widgetMode + 'textcolor'] }),
                h("div", { class: progressStyle },
                    h("div", { id: "container" }, this.progressBar())),
                this.rewardComplete ?
                    h("sqh-text-component", { ismarkdown: true, text: this.progressMessage || "", padding: "0 4% 20px 4%", color: this.completedrewardedcolor })
                    :
                        h("sqh-text-component", { ismarkdown: true, text: this.progressMessage || "", padding: "0 20% 20px 20%", color: this[this.widgetMode + 'textcolor'] })));
    }
    static get is() { return "sqh-progress-indicator"; }
    static get properties() { return {
        "completedearnedmessage": {
            "type": String,
            "attr": "completedearnedmessage"
        },
        "completedneededmessage": {
            "type": String,
            "attr": "completedneededmessage"
        },
        "completedpercentagecolor": {
            "type": String,
            "attr": "completedpercentagecolor"
        },
        "completedpresentcolor": {
            "type": String,
            "attr": "completedpresentcolor"
        },
        "completedprogresscolor": {
            "type": String,
            "attr": "completedprogresscolor"
        },
        "completedrewardedcolor": {
            "type": String,
            "attr": "completedrewardedcolor"
        },
        "completedtextcolor": {
            "type": String,
            "attr": "completedtextcolor"
        },
        "earnedMessage": {
            "state": true
        },
        "editormode": {
            "type": String,
            "attr": "editormode",
            "watchCallbacks": ["editorModeUpdated"]
        },
        "inprogressearnedmessage": {
            "type": String,
            "attr": "inprogressearnedmessage"
        },
        "inprogressneededmessage": {
            "type": String,
            "attr": "inprogressneededmessage"
        },
        "inprogresspercentagecolor": {
            "type": String,
            "attr": "inprogresspercentagecolor"
        },
        "inprogresspresentcolor": {
            "type": String,
            "attr": "inprogresspresentcolor"
        },
        "inprogressprogresscolor": {
            "type": String,
            "attr": "inprogressprogresscolor"
        },
        "inprogresstextcolor": {
            "type": String,
            "attr": "inprogresstextcolor"
        },
        "ishidden": {
            "type": Boolean,
            "attr": "ishidden"
        },
        "ismarkdown": {
            "type": Boolean,
            "attr": "ismarkdown"
        },
        "loading": {
            "state": true
        },
        "noprogresscolor": {
            "type": String,
            "attr": "noprogresscolor"
        },
        "noprogressearnedmessage": {
            "type": String,
            "attr": "noprogressearnedmessage"
        },
        "noprogressneededmessage": {
            "type": String,
            "attr": "noprogressneededmessage"
        },
        "noprogresspercentagecolor": {
            "type": String,
            "attr": "noprogresspercentagecolor"
        },
        "noprogresspresentcolor": {
            "type": String,
            "attr": "noprogresspresentcolor"
        },
        "noprogresstextcolor": {
            "type": String,
            "attr": "noprogresstextcolor"
        },
        "percentagesize": {
            "type": String,
            "attr": "percentagesize"
        },
        "progressMessage": {
            "state": true
        },
        "progresstype": {
            "type": String,
            "attr": "progresstype"
        },
        "progresswidth": {
            "type": String,
            "attr": "progresswidth"
        },
        "rewardComplete": {
            "state": true
        },
        "rewardStats": {
            "state": true
        },
        "widgetMode": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:sqh-progress-indicator:**/"; }
}
