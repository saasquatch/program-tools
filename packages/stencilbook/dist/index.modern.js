import*as t from"@saasquatch/stencil-hooks";import e from"lodash.startcase";import{css as o}from"@emotion/css";function n(){return(n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t}).apply(this,arguments)}const r=(t,e,...o)=>{let n=null,r=null,l=null,i=!1,c=!1,p=[];const u=e=>{for(let r=0;r<e.length;r++)n=e[r],Array.isArray(n)?u(n):null!=n&&"boolean"!=typeof n&&((i="function"!=typeof t&&!("object"==(o=typeof(o=n))||"function"===o))&&(n=String(n)),i&&c?p[p.length-1].$text$+=n:p.push(i?a(null,n):n),c=i);var o};if(u(o),e){e.key&&(r=e.key),e.name&&(l=e.name);{const t=e.className||e.class;t&&(e.class="object"!=typeof t?t:Object.keys(t).filter(e=>t[e]).join(" "))}}if("function"==typeof t)return t(null===e?{}:e,p,s);const d=a(t,null);return d.$attrs$=e,p.length>0&&(d.$children$=p),d.$key$=r,d.$name$=l,d},a=(t,e)=>({$flags$:0,$tag$:t,$text$:e,$elm$:null,$children$:null,$attrs$:null,$key$:null,$name$:null}),s={forEach:(t,e)=>t.map(l).forEach(e),map:(t,e)=>t.map(l).map(e).map(i)},l=t=>({vattrs:t.$attrs$,vchildren:t.$children$,vkey:t.$key$,vname:t.$name$,vtag:t.$tag$,vtext:t.$text$}),i=t=>{if("function"==typeof t.vtag){const e=Object.assign({},t.vattrs);return t.vkey&&(e.key=t.vkey),t.vname&&(e.name=t.vname),r(t.vtag,e,...t.vchildren||[])}const e=a(t.vtag,t.vtext);return e.$attrs$=t.vattrs,e.$children$=t.vchildren,e.$key$=t.vkey,e.$name$=t.vname,e};let c;const p=o(c||(c=(t=>t)`
  width: 100vw;
  height: 100vh;

  .story-book-outer-div {
    .story-div {
      font-family: "Arial", sans-serif;
      font-size: 12px;
    }
    padding-bottom: 500px;
  }

  .story-div {
    position: fixed;
    box-sizing: border-box;
    top: 0;
    width: 250px;
    height: 100vh;
    z-index: 999;
    overflow-y: scroll;
    background: white;
    margin-bottom: 32px;
  }

  .header {
    padding: 24px 0 16px 16px;
    margin-bottom: 24px;
    color: white;
    background: #333;

    h2 {
      letter-spacing: 3px;
      font-weight: 400;
    }
  }

  .parentStoryList {
    list-style: none;
    padding-left: 16px;

    summary {
      margin-bottom: 4px;
    }
  }
  .parentStory {
    cursor: pointer;
  }
  .parentStory.selected {
    font-weight: bold;
  }

  .subStory {
    font-size: 12px;
    cursor: pointer;
    line-height: 1.5em;
    margin-top: 4px;

    a {
      display: block;
      padding: 4px 4px 4px 16px;
    }
  }
  .subStory:hover {
    background-color: #eee;
  }
  .subStory.selected {
    background-color: lightgreen;
  }

  .component {
    padding: 24px 16px;
  }

  h4.group-header {
    margin: 8px 0;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    color: #575757;
  }

  .group-wrapper {
    margin-bottom: 24px;
  }

  .dynamic-display-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    left: 100%;
    padding: 16px;
    z-index: 1000;
    background: white;
    transform: translateX(-100%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    & > :not(:first-child) {
      margin-top: 12px;
    }

    p {
      font-size: 12px;
      margin: 0;
      padding: 0;
    }

    .button-wrapper {
      display: flex;

      & > :not(:first-child) {
        margin-left: 12px;
      }
    }

    & button {
      border: 1px solid #eaeaea;
      background: white;
      border-radius: 4px;
      color: #777;
      padding: 4px 12px;
      justify-content: center;
      align-items: center;
      text-align: center;

      &.active {
        background: #555;
        border-color: #555;
        color: white;
      }
    }
  }
`));let u,d,y=t=>t;function m(t,e){const o=e.story.title.split("/"),r=o[1]?o[0]:"_";return n({},t,{[r]:[...t[r]||[],{story:n({},e.story,{title:o[1]||o[0]}),subs:e.subs}].sort((t,e)=>t.story.title.localeCompare(e.story.title))})}function b(t){const{default:e}=t;return{story:e,subs:function(t,e){if(null==t)return{};var o,n,r={},a=Object.keys(t);for(n=0;n<a.length;n++)e.indexOf(o=a[n])>=0||(r[o]=t[o]);return r}(t,["default"])}}function g(n,{h:a=r,hooks:s=t,title:l="Stencilbook"}){const i=s.useMemo(()=>n.map(b).reduce(m,{_:[]}),n),[c,g]=s.useState(void 0),f=null==c?void 0:c.key,[h,x]=s.useState("desktop"),[v,$]=s.useState(!0),[k,w]=s.useState(!1),S=()=>a("div",{class:"dynamic-display-wrapper"},a("div",{class:"button-wrapper"},a("button",{class:"desktop"===h?"active":"",onClick:()=>x("desktop")},"Desktop"),a("button",{class:"tablet"===h?"active":"",onClick:()=>x("tablet")},"Tablet"),a("button",{class:"mobile"===h?"active":"",onClick:()=>x("mobile")},"Mobile")),a("p",null,"Note: Currently doesn't test breakpoints, use the native tester for now"),a("hr",null),a("button",{class:k?"active":"",onClick:()=>w(t=>!t)},"Toggle Dark Background"),a("hr",null),a("button",{class:v?"active":"",onClick:()=>$(t=>!t)},"Toggle Sidebar")),j=o(u||(u=y`
    max-width: ${0};
    margin-left: ${0};
  `),"mobile"===h?"375px":"tablet"===h?"768px":"1124px",v?"250px":"0px"),C=o(d||(d=y`
    display: none;
  `));document.body.style.backgroundColor=k?"#232323":"#fafafa";const O=()=>a("div",{class:"story-book-outer-div"},a("div",{class:`story-div ${v?"":C}`},a("div",{class:"header"},a("h2",null,l)),a("ul",{class:"parentStoryList"},Object.keys(i).sort().map(t=>a("div",{class:"group-wrapper"},"_"!==t&&a("h4",{class:"group-header"},t),i[t].map(t=>a("li",{class:"parentStory"},a("details",{style:{marginBottom:"10px"}},a("summary",{style:{outline:"none"}},t.story.title),t.subs&&Object.keys(t.subs).map(o=>{const n=t.subs[o],r=n.storyName||e(o);return a("div",{class:"subStory "+(f===o?"selected":"")},a("a",{onClick:()=>{g({key:o,story:n})}},r))})))))))),a(S,null),a("div",{class:`component ${j}`},!f&&a("h3",null,"Select a story!"),f&&a("div",null,a("h3",null,c.story.storyName||e(f)),a(c.story,null))));return{class:p,children:a(O,null),View:O,selected:c}}export{g as useStencilbook};
//# sourceMappingURL=index.modern.js.map
