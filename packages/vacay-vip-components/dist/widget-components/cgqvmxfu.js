/*! Built with http://stenciljs.com */
const{h:t}=window.WidgetComponents;import{a as e}from"./chunk-4e957c27.js";import"./chunk-7081a6f1.js";class r{constructor(){this.ishidden=!1}render(){const r=this.url,s=e`{
      text-align: ${this.alignment};
    }`,i=e`{
      width: ${this.width}px;
      border-radius: ${this.borderradius}px;
      ${this.css}
    }`;return!this.ishidden&&t("div",{class:s},t("img",{src:r,class:i}))}static get is(){return"sqh-image-component"}static get properties(){return{alignment:{type:String,attr:"alignment"},borderradius:{type:Number,attr:"borderradius"},css:{type:String,attr:"css"},ishidden:{type:Boolean,attr:"ishidden"},url:{type:String,attr:"url"},width:{type:Number,attr:"width"}}}static get style(){return"sqh-image-component{display:block}sqh-image-component div{position:relative}sqh-image-component img{max-width:100%;height:auto}"}}export{r as SqhImageComponent};