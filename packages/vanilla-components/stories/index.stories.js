/* global document */
import { storiesOf } from '@storybook/html';
// import "../dist/widget-components";

storiesOf('Demo', module)
  .add('heading', () => `<sqh-global-container background="transparent" fontsize="16" fontfamily="Helvetica Neue">

  <!-- <sqh-image-component text="https://i.ytimg.com/vi/I7jgu-8scIA/maxresdefault.jpg"></sqh-image-component> -->

  <sqh-text-component text="" fontsize="50" color="red" padding="60px 10px 10px" height="400px" background="http://res.cloudinary.com/saasquatch/image/upload/v1517426138/Optimalprint_FB_OG_default_jky5tu.jpg"></sqh-text-component>
  
  <sqh-text-component color="#4486E1" fontsize="30" text="Give a **cat** ***get*** a kitten<br>while supplies" ismarkdown=true></sqh-text-component>

  <sqh-close-button></sqh-close-button>

  <sqh-copy-link-button hidden="false" buttoncolor="#4caf50"></sqh-copy-link-button>

  <sqh-share-button-container maxwidth="100%" twitterdisplayrule=""></sqh-share-button-container>

  <sqh-stats-component friends-referred="{value, plural, one {Dude} other {Dudes}} Referred"></sqh-stats-component>

  <sqh-referral-list showreferrer=false></sqh-referral-list>

</sqh-global-container>`)
  .add('button', () => {
    const button = document.createElement('button');
    button.innerText = 'Hello Button';
    // eslint-disable-next-line no-console
    button.addEventListener('click', e => console.log(e));
    return button;
  });
