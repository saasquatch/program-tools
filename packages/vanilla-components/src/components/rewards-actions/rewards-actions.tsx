import { Component, Prop} from '@stencil/core';
import FormatJs from '../../services/FormatJs';

@Component({
  tag: 'sqh-rewards-actions',
  styleUrl: 'rewards-actions.scss'
})
export class StatsComponent {
  @Prop() previousText: string = 'Previous';
  @Prop() hideText: string = 'Hide';
  @Prop() nextText: string = 'Next';

  render() {
    return (
      <div class="squatch-referrals-actions">
        <button class="btn btn-default disabled" data-scroll-element="#squatch-referrals-scroll" data-scroll-increment="-3">{this.previousText}</button>

        <button class="btn btn-default" data-close-panel="#squatch-panel" data-scroll-reset="#squatch-referrals-scroll">{this.hideText}</button>

        <button class="btn btn-default disabled" data-scroll-element="#squatch-referrals-scroll" data-scroll-increment="3">{this.nextText}</button>
      </div>
    );
  }
}