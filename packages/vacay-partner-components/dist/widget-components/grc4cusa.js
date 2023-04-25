/*! Built with http://stenciljs.com */
const{h:t}=window.WidgetComponents;import{a as o,b as e,c as r}from"./chunk-bf7ffeb2.js";import{a as i}from"./chunk-4e957c27.js";import{a as s}from"./chunk-552cea6d.js";import{a as c}from"./chunk-80d3d1b7.js";import"./chunk-7081a6f1.js";class n{constructor(){this.ishidden=!1,this.copysuccess="copied!",this.copyfailure="Press Ctrl+C to copy"}componentWillLoad(){if(!this.ishidden)return s.graphql.getFueltankCode(this.rewardkey).then(t=>{const o=t.rewards.data.length>0?t.rewards.data[0].fuelTankCode:null;this.fueltankcode=o||t.referredByReferral.referrerUser.referralCode}).catch(t=>{this.onError(t)})}onError(t){console.log("Error loading via GraphQL.",t)}notify(t,o){const i=document.getElementById(t.slice(1));i.textContent=o,e(i,"in"),setTimeout(()=>{r(i,"in")},1400)}notifySuccess(t){this.notify(t.trigger.dataset.clipboardNotification,this.copysuccess)}notifyFailure(t){this.notify(t.trigger.dataset.clipboardNotification,this.copyfailure)}componentDidLoad(){const t=new c("button");t.on("success",this.notifySuccess.bind(this)),t.on("error",this.notifyFailure.bind(this))}render(){const e=i`
    max-width: ${this.width}px;
    background-color: ${this.backgroundcolor};
    border: ${this.backgroundcolor};
    color: ${this.textcolor};
    border-radius: ${this.borderradius}px;
    font-size: ${this.fontsize}px;

    &:hover {
      background-color: ${o(this.backgroundcolor,10)};
      border-color: ${o(this.backgroundcolor,12)};
      color: ${this.textcolor};
    }

    &:focus {
      color: ${this.textcolor};
    }
    `,r=i`
      text-align: center;
      font-weight: bold;
      font-size: ${this.codefontsize};
      color: ${this.codefontcolor};
    `,s=["sqh-copy-button",e].join(" ");return!this.ishidden&&t("div",null,t("div",{class:r},this.fueltankcode),t("div",{class:"sqh-align-button"},t("span",{class:"label fade",id:"squatch-copy-notification"},this.copysuccess),t("button",{class:s,"data-clipboard-text":this.fueltankcode,"data-clipboard-notification":"#squatch-copy-notification"},this.text)))}static get is(){return"sqh-copy-button"}static get properties(){return{backgroundcolor:{type:String,attr:"backgroundcolor"},borderradius:{type:Number,attr:"borderradius"},codefontcolor:{type:String,attr:"codefontcolor"},codefontsize:{type:Number,attr:"codefontsize"},copyfailure:{type:String,attr:"copyfailure"},copysuccess:{type:String,attr:"copysuccess"},fontsize:{type:Number,attr:"fontsize"},fueltankcode:{state:!0},ishidden:{type:Boolean,attr:"ishidden"},rewardkey:{type:String,attr:"rewardkey"},text:{type:String,attr:"text"},textcolor:{type:String,attr:"textcolor"},width:{type:Number,attr:"width"}}}static get style(){return"sqh-copy-button{display:block}sqh-copy-button .sqh-align-button{text-align:center;position:relative;margin:20px 0}sqh-copy-button .sqh-align-button .sqh-copy-button{width:100%;text-align:center;padding:8px;cursor:pointer}sqh-copy-button .sqh-align-button .label{padding:.2em .6em .3em;font-size:11px;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;border-radius:.25em;background-color:#35b21e}sqh-copy-button .sqh-align-button .label:empty{display:none}sqh-copy-button .sqh-align-button .fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}sqh-copy-button .sqh-align-button .fade.in{opacity:1}sqh-copy-button .sqh-align-button #squatch-copy-notification{position:absolute;left:215px;bottom:35px;z-index:2}"}}export{n as SqhCopyButton};