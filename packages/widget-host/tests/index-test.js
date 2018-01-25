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
})
