import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'sqh-tab-component',
  styleUrl: 'tab-component.scss',
})
export class TabComponent {
  @Element() elem: HTMLElement;
  @Prop() open: boolean;
  @Prop() syntax:string;
  @Prop() tabname:string;

  componentWillLoad(){
    if(!this.open) this.elem.classList.add('hidden')
  }

  componentDidUpdate() {
    if(this.open) {
      this.elem.classList.remove('hidden')
    } else {
      this.elem.classList.add('hidden')
    }
  }

  render() {

    return <div><slot /></div>
  }
}
