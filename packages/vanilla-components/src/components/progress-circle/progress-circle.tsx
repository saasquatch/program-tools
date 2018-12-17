import { Component, Prop } from '@stencil/core';
import ProgressBar  from 'progressbar.js';

@Component({
  tag: 'sqh-progress-circle',
  styleUrl: 'progress-circle.scss'
})
export class ProgressCircle {

  @Prop() ishidden: boolean = false;
  @Prop() tiername: string;

  componentDidLoad(){
    this.getProgress();
  }

  getProgress(){

    var bar = new ProgressBar.Circle('#container', {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#aaa', width: 1 },
      to: { color: '#00cfff', width: 4 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
    
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText('<img style="width:100%" src="https://static.thenounproject.com/png/130115-200.png">' + value + "%");
        }
    
      }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    
    bar.animate(0.75);  // Number from 0.0 to 1.0
  }
  
  render() {

    console.log(ProgressBar);
    return !this.ishidden && 
      <div id="container"></div>;
  }
}