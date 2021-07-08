import Sinon from "sinon";

export const authenticateSpy = Sinon.spy();
export const createUserSpy = Sinon.spy();
export const oobCodeSpy = Sinon.spy();
export const resetPasswordSpy = Sinon.spy();
export const authenticationFailsWith: { code: null | string } = {
  code: null,
};
export const registrationFailsWith: { code: null | string } = {
  code: null,
};
export const applyActionCodeFailsWith: { code: null | string } = {
  code: null,
};
export const verifyPasswordResetCodeFailsWith: { code: null | string } = {
  code: null,
};
export const emailVerificationOobCodeReturned: { oobCode: null | string } = {
  oobCode: "qwerty",
};
export const passwordResetOobCodeReturned: { oobCode: null | string } = {
  oobCode: "qwerty",
};
export const existingEmails: string[] = [];
export const mockFirebase = () => {
  jest.mock("firebase-admin", () => {
    return {
      apps: [],
      credential: {
        applicationDefault() {
          return "something";
        },
      },
      initializeApp() {
        (this as any).apps.push({ app: true });
      },
      app() {
        return this;
      },
      auth() {
        return this;
      },
      tenantManager() {
        return this;
      },
      authForTenant: () => ({
        generateEmailVerificationLink: (email: string) => {
          if (existingEmails.includes(email)) {
            return `https://some.url?oobCode=${emailVerificationOobCodeReturned.oobCode}`;
          }
          throw new Error();
        },
        generatePasswordResetLink: (email: string) => {
          if (existingEmails.includes(email)) {
            return `https://some.url?oobCode=${passwordResetOobCodeReturned.oobCode}`;
          }
          throw new Error();
        },
        createUser: ({ email, password }: any) => {
          createUserSpy(email, password);
          if (registrationFailsWith.code) {
            const err = new Error() as any;
            err.errorInfo = { code: registrationFailsWith.code };
            throw err;
          }
          if (password.length < 6) {
            const err = new Error() as any;
            err.errorInfo = { code: "auth/invalid-password" };
            throw err;
          }
          if (email === "fails@example.com") {
            throw new Error();
          }
          return { uid: "123456" };
        },
        verifyIdToken: () => ({ uid: "123456" }),
      }),
    };
  });
  jest.mock("firebase", () => {
    return {
      initializeApp() {
        return { some: "app" };
      },
      app() {
        return this;
      },
      auth: () => {
        return {
          applyActionCode: (oobCode: string) => {
            oobCodeSpy(oobCode);
            if (applyActionCodeFailsWith.code) {
              const err = new Error() as any;
              err.code = applyActionCodeFailsWith.code;
              throw err;
            }
          },
          verifyPasswordResetCode: (oobCode: string) => {
            oobCodeSpy(oobCode);
            if (verifyPasswordResetCodeFailsWith.code) {
              const err = new Error() as any;
              err.code = verifyPasswordResetCodeFailsWith.code;
              throw err;
            }
          },
          confirmPasswordReset: (oobCode: string, password: string) => {
            resetPasswordSpy(oobCode, password);
            if (verifyPasswordResetCodeFailsWith.code) {
              const err = new Error() as any;
              err.code = verifyPasswordResetCodeFailsWith.code;
              throw err;
            }
          },
          signInWithEmailAndPassword: (user: {
            email: string;
            password: string;
          }) => {
            authenticateSpy(user);
            if (authenticationFailsWith.code) {
              const err = new Error() as any;
              err.code = authenticationFailsWith.code;
              throw err;
            }
            return {
              user: {
                getIdToken: () => "123456",
              },
            };
          },
        };
      },
    };
  });
};
