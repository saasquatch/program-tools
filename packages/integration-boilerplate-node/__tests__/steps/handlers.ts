import http from "http";
import { StepDefinitions } from "jest-cucumber";
import fetch, { Response } from "node-fetch";

import { createIntegrationService } from "../../src";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

const testRequests = {
  testWebhook: {
    body: '{"id":"1","type":"test","tenantAlias":"testing","live":false,"created":1}',
    jwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..oCWvfbcIRyD1Y0uaVoQw0o7Z_FkjirjWArHwg9zYBYDPniKzK8Yg1tMzbNApEVVx3YieVtgXqIHLhOWhtsOKgH8fnV9u1oDitviJD-J5-L_rqU3J7E-haacHfvz3wSEW_NGQdlJoE6b-_8_1JG0ZeDCYhJyg911YKBgTTvoaLDHeEMKa-8hWZkPLGISnGCB3ido8FPW25muoBNgTzqh6dwAhXxdMveoC-OtUr3-lH0Vy5SJlOO0A9lAPhtXw_OKS0p_MmHm4IBTUAn0FKgd3sukSRhSQVwxO74LkgECRYV3R8LyuFxftfFIeVggZCfWw4jDoIfYgoYPpk0TSEMXBJA",
  },
};

const handlerSteps: StepDefinitions = ({ given, and, then }) => {
  let service: ThenArg<ReturnType<typeof createIntegrationService>>;
  let server: http.Server;
  let port: number;
  let response: Response;

  afterEach((done) => {
    server.close(done);
  });

  given("a default integration service", async () => {
    service = await createIntegrationService();
    return new Promise<void>((resolve, _reject) => {
      server = (service as any).server.listen(() => {
        port = (server.address() as any).port;
        resolve();
      });
    });
  });

  and(/there is an incoming webhook/, async () => {
    response = await fetch(`http://localhost:${port}/webhook`, {
      method: "POST",
      body: testRequests.testWebhook.body,
      headers: {
        "Content-Type": "application/json",
        "X-HOOK-JWS-RFC-7797": testRequests.testWebhook.jwt,
      },
    });
  });

  then(/the response status will be (\d+)/, (status) => {
    const statusNumber = Number(status);
    expect(response.status).toBe(statusNumber);
  });
};

export default handlerSteps;
