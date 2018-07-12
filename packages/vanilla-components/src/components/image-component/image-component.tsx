import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'sqh-image-component',
  styleUrl: 'image-component.scss'
})

export class ImageComponent {
  @Prop() text: string;



  // addStyle() {
  //   const css = `img {
  //   }`
  // }


  render() {
    const imageString = `${this.text}`;
    // const imageTag = <div> innerHTML={this.imgHTMLAttributes} </div>;
    console.log(`What I'm getting = ${imageString}`);
    console.log(`Type of = ${typeof this.text}`)
    return(
        <div>
          <img src={imageString} />
        </div>
    );
  }
}