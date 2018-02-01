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

  it('gets referals', async function () {
    window.widgetIdent = {
      userId: "5a6bcb1d66d5cf27ae5968f7",
      accountId: "TF3H82GWUL3CUU8I", 
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6IlRGM0g4MkdXVUwzQ1VVOEkiLCJmaXJzdE5hbWUiOiJDb3JuZWxpYSIsImxhc3ROYW1lIjoiV29vZCIsImlkIjoiNWE2YmNiMWQ2NmQ1Y2YyN2FlNTk2OGY3IiwiZW1haWwiOiJjb3JuZWxpYXdvb2QudWV4d2x0Z2g2LnVleHdsdGdoQG1haWxvc2F1ci5pbyJ9fQ.MZ-xq2hpVvbA_usK-fSkvb6zJmh6tp7uGnFPDng1RWE", 
      tenantAlias: "test_aodmqrtid2vmr", 
      appDomain: "http://localhost:9000"};

    const response = await API.graphql.getReferrals().then((res) => {
      return res;
    }).catch((err) => {
      console.error("ERROR ", err.message);
    });
    console.log("GRAPHQL RESPONSE? ", JSON.stringify(response.data));
  });

})
