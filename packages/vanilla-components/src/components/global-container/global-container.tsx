import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'sqh-global-container',
  styleUrl: 'global-container.scss'
})
export class GlobalContainer {
  @Prop() background: string;
  @Prop() fontfamily: string;
  @Prop() fontcolor: string;
  @Prop() fontsize: string;
  @Prop() width: string = "500";
  
  addStyle() {
    const css = ` sqh-global-container {
                    background-color: ${this.background};
                    font-family: ${this.fontfamily};
                    font-color: ${this.fontcolor};
                    font-size: ${this.fontsize}px;
                    width: ${this.width}px;
                    margin: 0 auto;
                  } 
                  
                  @media (max-width: ${this.width}px) {
                    sqh-global-container {
                      width: 100%;
                    }
                  } `

    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    this.addStyle();
  }

  componentWillUpdate() {
    this.addStyle();
  }
}