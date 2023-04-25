/*! Built with http://stenciljs.com */
const{h:t}=window.WidgetComponents;import{a as i}from"./chunk-4e957c27.js";import"./chunk-7081a6f1.js";class n{constructor(){this.ishidden=!1,this.ismarkdown=!1,this.padding="10px 20px 15px"}render(){const n=i`
      font-family: ${this.fontfamily||"inherit"};
      font-size: ${this.fontsize?this.fontsize+"px":"inherit"};
      font-weight: ${this.fontweight?this.fontweight:"inherit"};   
      color: ${this.color||"inherit"};
      padding-top: ${this.paddingtop?this.paddingtop+"px":"inherit"};
      padding-bottom: ${this.paddingbottom?this.paddingbottom+"px":"inherit"};
      width:${this.width?this.width+"px":"auto"};
      overflow-wrap: break-word;
      border-radius: ${this.borderradius?this.borderradius+"px":"8px"};
      margin:0 auto;
      border:none;
      background-color: ${this.buttonbackground?this.buttonbackground:"#F5A100"};
      &:hover {
        cursor:pointer;
        opacity:0.9;
      }
      &:focus {
        outline:none;
      }
    `,r=i`
      text-align: ${this.textalign};
      background: ${this.background?this.background:"inherit"};
      height: ${this.height||"inherit"};
      background-size: contain;
    `;return!this.ishidden&&t("div",{class:r},t("button",{class:n,onClick:()=>window.open(this.url,"_blank")},this.text))}static get is(){return"sqh-cta-component"}static get properties(){return{background:{type:String,attr:"background"},borderradius:{type:String,attr:"borderradius"},buttonbackground:{type:String,attr:"buttonbackground"},color:{type:String,attr:"color"},fontfamily:{type:String,attr:"fontfamily"},fontsize:{type:String,attr:"fontsize"},fontweight:{type:String,attr:"fontweight"},height:{type:String,attr:"height"},ishidden:{type:Boolean,attr:"ishidden"},ismarkdown:{type:Boolean,attr:"ismarkdown"},padding:{type:String,attr:"padding"},paddingbottom:{type:String,attr:"paddingbottom"},paddingtop:{type:String,attr:"paddingtop"},text:{type:String,attr:"text"},textalign:{type:String,attr:"textalign"},textEl:{elementRef:!0},url:{type:String,attr:"url"},width:{type:String,attr:"width"}}}static get style(){return"sqh-cta-component{display:block}sqh-cta-component p{margin:0}"}}export{n as SqhCtaComponent};