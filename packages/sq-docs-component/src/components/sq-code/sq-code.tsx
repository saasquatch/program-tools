import { Component, h, Prop, Element, State } from '@stencil/core';
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-bash'

@Component({
  tag: 'sq-code',
  styleUrl: 'sq-code.scss',
})
export class SqCode {
  @Element() elem: HTMLElement;
  @Prop() open: boolean;
  @Prop() syntax:string;
  @Prop() tabname:string;

  @State() highlightedCode:string;
  @State() text:string
  @State() loaded:boolean = false;
  @State() newElement: HTMLElement;

  connectedCallback(){
    this.highlightedCode = ""
  }
  async componentWillLoad(){
    
    //await Prism.plugins.toolbar.registerButton()
    //console.log(Prism.plugins.toolbar);
    if(!this.open) this.elem.classList.add('hidden')
    this.text = this.elem.textContent;
    this.highlightedCode = Prism.highlight(this.elem.textContent, Prism.languages[this.syntax])  

    if(this.elem.firstChild.nodeName == "#text") this.elem.firstChild.remove()
    this.loaded = true;
  }

  componentDidRender(){
    //console.log(this.newElement)
    this.newElement.innerHTML = this.highlightedCode;
  }

  componentDidUpdate() {
    //console.log("sq-code open", this.open, this.syntax)
    if(this.open) {
      this.elem.classList.remove('hidden')
    } else {
      this.elem.classList.add('hidden')
    }
    
  }

  getText(){
    return <div>{this.highlightedCode}</div>
  }

  render() {

    return <pre class={`language-${this.syntax}`} hidden={!this.open}>
      
      <code class={`language-${this.syntax}`}>
      <span ref={(el) => this.newElement = el as HTMLElement}></span>
      
      </code>
      <span class={`hidden original`}>{this.text}</span>
    </pre>
  }
}
