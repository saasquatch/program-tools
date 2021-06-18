import { rest } from "msw";

/*
 
The keys used for the mocked JWKS below - note these are test keys only!
(Generated at https://mkjwk.org)

-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDCy6V162B6R4Zb
KgQ7K7RGIoYk03cxY6Vtb3lRwaMxLo5uFdeGkPPKW/AeT4gHXoZAQ2eY6h8UWwvh
vtSQLwWs6uvcPRBFaiCWDmqM5xdBt225tOQr4MZ3dZi3glnlnzEEpm6SvmGmFDP7
VZfi3jCUEBG7UsJkvmmUcDThBt9kJYRSMbYfjET1o4NCW9b/yZyQUiEADhqaLGtu
1mMC4tuNKAh7c3rDwXQTC3B0UFtF2RXkXw8H0ZKmj+wGdkrj7G/btBEgeHPzmxHV
t1j/vi9Ry7tUoRdWozpfJIfEblKXKZ/ZvFDa4ZaA7XfLKCL7CAErU2o3MngytbLn
LgBq2VrjAgMBAAECggEBALZP1N8lWZl4QbYm/+jFQab2fugOhprR8S0YTMqI2YyZ
TzKW/K10EseM/pHPy7dh73JL47TJQidSAy/X46fCaqRpBjCNciIVbsQiX/TZ//lA
jNBnDbpHWFjL1g/CTxLKyBzbC9gJmOjQNcqAVHQ/keWxmHbiwQ966uPDlKobPY7C
rizNMQvsNakrjv690xnNOAbowJhG8kKQ+2zsjYen3WhvaBXaG3hJfbOO8Un3sEwR
5moxJLobQJ8Amp93SSB7jtNI/KHiDv+gpQJn4VL4znd7DSctlIVCWIPMyKGICG1y
7ZDlwJzimCPCg2cMT8ji5TtiPEQE++ZAs4hD6iRx3HkCgYEA9leMRf+U2CxvMXbG
v933HrRX2RSNYTBXrXUWKKHbtlYNHntjspyK0+A8h0k6i8w0f40M095hfgADA6SP
XTLHOtWkwjl55LR2tgKSUqCVpUFdYMJYsPnUSMr9Tro0hsM7R+wigx8mfAgawWKK
QAIANlCljGAjHNV+F4fs8EU0kdUCgYEAym6+VrTvniVzJAvlJnWZTghh1wbBLQjF
fuhiZeSL98ASsaaJJ6HnDg/FlmWGYaNLlgcWq0lKkrX6wYZ8DzHneBDdvw2qJuGe
vHc7kFUw7CCcNhv9YjkR4b9WPMHikz1DtAMsUnhIml9WAtnkI28mj2Yy2FnD/CuT
y7L2pRuW3dcCgYEA7PHmtcmRJKEQzvYdU52vvbPfr6jKGEqEew5dIvYUvHxmoAQ1
MC7MheFwtvvjuWXQtUM5rGyBP83JGG7nitB1u4yVrk/Ug/xlFsrAbYOSjOKja5dj
8c5Ltzywi1Ilhd4xngtuYsrKnJC7E3mx2sFR7OyDX9N00p4za3TNnYojd4UCgYEA
gY06Nxd4uodRFuKd9m0QfcYTh5+FBaM1cbCbOIZ5pUbBL/xajoio7HDfjQ7QX7A3
8X373gb7uMTKBAxjXP4dGtQAdgLywAtooUjVT9uVgailEGP9V10aupTPRfb3YC+3
In9dYDImlNUqoIx92seJsABBzgA00y+4WIbiHmx3suUCgYAHvxCGj+XyAWUk1L2v
mpWLfD93DFReIt1eDj6F5jEYP9Le+S+ceO+nMhdiphyZmSiIqZB6fCn8Nyl7PoIF
BfZzBRjALSlrhoukxKjSibgCUULY2ruIkDVpkQPGz9NBnJHyFCJbRqrh9w2GCoE0
WcczOA/gnCCe6T3vkfmfw8MRfQ==
-----END PRIVATE KEY-----

-----BEGIN CERTIFICATE-----
MIIC1DCCAbygAwIBAgIGAXoclyEvMA0GCSqGSIb3DQEBCwUAMCsxKTAnBgNVBAMM
IGhMWCUyRnlkV3c0QzBtd2RydnlQaFVZbWRDa0Q4JTNEMB4XDTIxMDYxODAwNDgy
NFoXDTIyMDQxNDAwNDgyNFowKzEpMCcGA1UEAwwgaExYJTJGeWRXdzRDMG13ZHJ2
eVBoVVltZENrRDglM0QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDC
y6V162B6R4ZbKgQ7K7RGIoYk03cxY6Vtb3lRwaMxLo5uFdeGkPPKW/AeT4gHXoZA
Q2eY6h8UWwvhvtSQLwWs6uvcPRBFaiCWDmqM5xdBt225tOQr4MZ3dZi3glnlnzEE
pm6SvmGmFDP7VZfi3jCUEBG7UsJkvmmUcDThBt9kJYRSMbYfjET1o4NCW9b/yZyQ
UiEADhqaLGtu1mMC4tuNKAh7c3rDwXQTC3B0UFtF2RXkXw8H0ZKmj+wGdkrj7G/b
tBEgeHPzmxHVt1j/vi9Ry7tUoRdWozpfJIfEblKXKZ/ZvFDa4ZaA7XfLKCL7CAEr
U2o3MngytbLnLgBq2VrjAgMBAAEwDQYJKoZIhvcNAQELBQADggEBADUe8b6U3Hd7
fjKS/XWt/qVQ/0DEexRAvGiLc0c5jHXuazXDdloLlOd6hJsLee9Q8OuNFK7tz2v3
SXjUlMdLItlW983h5veRNCOGY8yoSRsnTz74uJXdk1HtrG+ABhsHjBd85cbOGSFS
jNWbiTu/JXtpUEH4IjCSxLh22Wyqnd+AEFq1HbyMqRiaJalK911BjnpQ2eivCXU2
J1kaEwf7Vn0hqjUWaugTY8WGci2mL3o++H0NH01pGlTJWTiTOMKeyMgf9Ycn0LsY
IRWpPq5CwgkhLmVpvqv6obhJueRJLp6hOzHc/6egwB2azAIz2Cd2TMM0uUd4WvuL
dkNvaEbJYVk=
-----END CERTIFICATE-----

-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwsuldetgekeGWyoEOyu0
RiKGJNN3MWOlbW95UcGjMS6ObhXXhpDzylvwHk+IB16GQENnmOofFFsL4b7UkC8F
rOrr3D0QRWoglg5qjOcXQbdtubTkK+DGd3WYt4JZ5Z8xBKZukr5hphQz+1WX4t4w
lBARu1LCZL5plHA04QbfZCWEUjG2H4xE9aODQlvW/8mckFIhAA4amixrbtZjAuLb
jSgIe3N6w8F0EwtwdFBbRdkV5F8PB9GSpo/sBnZK4+xv27QRIHhz85sR1bdY/74v
Ucu7VKEXVqM6XySHxG5Slymf2bxQ2uGWgO13yygi+wgBK1NqNzJ4MrWy5y4Aatla
4wIDAQAB
-----END PUBLIC KEY-----

*/

export default [
  // Mocked JWKS
  rest.get(
    "https://mocked.saasquatch.com/.well-known/jwks.json",
    (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          keys: [
            {
              kty: "RSA",
              e: "AQAB",
              use: "sig",
              kid: "hLX/ydWw4C0mwdrvyPhUYmdCkD8=",
              alg: "RS256",
              n: "wsuldetgekeGWyoEOyu0RiKGJNN3MWOlbW95UcGjMS6ObhXXhpDzylvwHk-IB16GQENnmOofFFsL4b7UkC8FrOrr3D0QRWoglg5qjOcXQbdtubTkK-DGd3WYt4JZ5Z8xBKZukr5hphQz-1WX4t4wlBARu1LCZL5plHA04QbfZCWEUjG2H4xE9aODQlvW_8mckFIhAA4amixrbtZjAuLbjSgIe3N6w8F0EwtwdFBbRdkV5F8PB9GSpo_sBnZK4-xv27QRIHhz85sR1bdY_74vUcu7VKEXVqM6XySHxG5Slymf2bxQ2uGWgO13yygi-wgBK1NqNzJ4MrWy5y4Aatla4w",
            },
          ],
        })
      )
  ),

  // Mocked Auth0 token endpoint
  rest.post("https://saasquatch_auth0_domain/oauth/token", (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        access_token: "access_token",
      })
    )
  ),

  // Mocked integration config endpoint
  rest.get(
    "https://mocked.saasquatch.com/api/v1/testing/integration/SAASQUATCH_AUTH0_CLIENT_ID",
    (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          config: {},
        })
      )
  ),
];
