import expect from 'expect'
import API from 'src/index'
import 'unfetch/polyfill'
import Promise from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = Promise;
}


describe('Module template', () => {

  it('gets user data', () => {
    API.graphql.getCurrentUser().then((res) => {
      console.log(res);
    });
  });

  /* it('gets referals', async function () {
    const response = await API.graphql.getReferrals().then((res) => {
      return res;
    }).catch((err) => {
      console.error("ERROR ", err.message);
    });
    console.log("GRAPHQL RESPONSE? ", JSON.stringify(response.data));
  }); */

})
