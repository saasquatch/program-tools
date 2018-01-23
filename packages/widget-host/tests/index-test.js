import expect from 'expect'
import API from 'src/index'

describe('Module template', () => {

  it('gets user data', () => {
    API.graphql.getCurrentUser().then((res) => {
      console.log(res);
    });
  });
})
