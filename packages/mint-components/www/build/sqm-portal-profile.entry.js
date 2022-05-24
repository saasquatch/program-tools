import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { m as useState, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { P as PortalProfileView } from './sqm-portal-profile-view-f16e432c.js';
import { d as dist, i as ie, a as sn, q as qe, j as jn } from './index.module-b74a7f69.js';
import { g as getProps } from './utils-48175026.js';
import { c as cjs } from './cjs-e829b75b.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';
import './sqm-portal-container-view-79dfef65.js';
import './sqm-text-span-view-6c68cc9a.js';
import './global-b1f18590.js';
import './insertcss-d82cf6d6.js';

const GET_USER = dist.gql `
  query {
    viewer {
      ... on User {
        id
        accountId
        firstName
        lastName
        email
        countryCode
      }
    }
  }
`;
const UPSERT_USER = dist.gql `
  mutation (
    $id: String!
    $accountId: String!
    $firstName: String!
    $lastName: String!
  ) {
    upsertUser(
      userInput: {
        id: $id
        accountId: $accountId
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      firstName
      lastName
    }
  }
`;
// view doesn't tolerate undefined, even when we're loading
const defaultFormState = {
  country: "",
  email: "",
  firstName: "",
  lastName: "",
  errors: {},
  error: "",
};
function usePortalProfile(props) {
  const userIdent = ie();
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(undefined);
  const [formState, setFormState] = useState(defaultFormState);
  const userDataResponse = sn(GET_USER, {}, !(userIdent === null || userIdent === void 0 ? void 0 : userIdent.jwt));
  const [upsertUser, upsertUserResponse] = qe(UPSERT_USER);
  useEffect(() => {
    if (upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.loading)
      return;
    if (upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.errors) {
      setFormState((state) => {
        var _a, _b, _c;
        return ({
          ...state,
          error: (_c = (_b = (_a = upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.errors) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c[0].message,
        });
      });
    }
    else {
      setUserData((state) => {
        var _a;
        return ({
          ...state,
          ...(_a = upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.data) === null || _a === void 0 ? void 0 : _a.upsertUser,
        });
      });
      if (upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.data)
        setSuccess(true);
    }
  }, [upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.loading]);
  useEffect(() => {
    var _a, _b;
    setUserData((data) => { var _a; return ({ ...data, ...(_a = userDataResponse === null || userDataResponse === void 0 ? void 0 : userDataResponse.data) === null || _a === void 0 ? void 0 : _a.viewer }); });
    setFormState({
      ...defaultFormState,
      ...(_a = userDataResponse.data) === null || _a === void 0 ? void 0 : _a.viewer,
      ...(_b = upsertUserResponse.data) === null || _b === void 0 ? void 0 : _b.upsertUser,
    });
  }, [userDataResponse === null || userDataResponse === void 0 ? void 0 : userDataResponse.data]);
  useEffect(() => {
    var _a, _b;
    if ((_a = upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.errors) === null || _a === void 0 ? void 0 : _a.message) {
      setFormState({
        ...(_b = userDataResponse.data) === null || _b === void 0 ? void 0 : _b.viewer,
        error: "Network request failed.",
      });
    }
  }, [upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.errors]);
  const onSubmit = () => {
    setSuccess(false);
    if (formState.firstName && formState.lastName) {
      upsertUser({
        id: userIdent === null || userIdent === void 0 ? void 0 : userIdent.id,
        accountId: userIdent === null || userIdent === void 0 ? void 0 : userIdent.accountId,
        firstName: formState.firstName,
        lastName: formState.lastName,
      });
      setFormState((s) => ({ ...s, errors: {}, error: "" }));
      return;
    }
    const errors = {};
    if (!formState.firstName) {
      errors["firstName"] = { message: "Field can't be empty" };
    }
    if (!formState.lastName) {
      errors["lastName"] = { message: "Field can't be empty" };
    }
    if (errors !== {}) {
      setFormState((e) => ({
        ...e,
        error: "Please correct the errors below to update your profile.",
      }));
    }
    setFormState((e) => ({ ...e, errors }));
  };
  return {
    states: {
      success,
      loading: (userDataResponse === null || userDataResponse === void 0 ? void 0 : userDataResponse.loading) || upsertUserResponse.loading,
      submitDisabled: false,
      showCountry: props.showCountry,
      formState,
      user: userData,
      text: {
        firstnametext: props.firstnametext,
        lastnametext: props.lastnametext,
        countrytext: props.countrytext,
        emailtext: props.emailtext,
        editProfileHeader: props.editProfileHeader,
        editProfileSubHeader: props.editProfileSubHeader,
        submitChangeButtonText: props.submitChangeButtonText,
      },
    },
    callbacks: {
      onSubmit,
      onChange: (e) => {
        const { name, value } = e.target;
        setFormState((data) => ({ ...data, [name]: value }));
      },
    },
  };
}

let PortalProfile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName First name input field label
     */
    this.firstnametext = "First Name";
    /**
     * @uiName Last name input field label
     */
    this.lastnametext = "Last Name";
    /**
     * @uiName Email input field label
     */
    this.emailtext = "Email";
    /**
     * @uiName Country input field label
     */
    this.countrytext = "Country";
    /**
     * @uiName Edit profile header
     */
    this.editProfileHeader = "Edit your profile";
    /**
     * @uiName Edit profile sub header
     */
    this.editProfileSubHeader = "Personal Information";
    /**
     * @uiName Text for the submit changes button
     */
    this.submitChangeButtonText = "Submit Changes";
    /**
     * @uiName Show or hide country field
     */
    this.showCountry = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const props = jn()
      ? usePortalProfileDemo(getProps(this))
      : usePortalProfile(getProps(this));
    return h$1(PortalProfileView, Object.assign({}, props));
  }
};
function usePortalProfileDemo(props) {
  return cjs({
    states: {
      success: false,
      loading: false,
      submitDisabled: false,
      showCountry: true,
      user: {
        id: "01",
        accountId: "111100000",
        firstName: "Joe",
        lastName: "Smith",
        email: "jsmith@gmail.com",
        countryCode: "CA",
      },
      text: {
        firstnametext: "First Name",
        lastnametext: "Last Name",
        emailtext: "Email",
        countrytext: "Country",
        editProfileHeader: "Edit your profile",
        editProfileSubHeader: "Personal Information",
        submitChangeButtonText: "Submit Changes",
      },
      formState: {
        country: "Canada",
        firstName: "Joe",
        lastName: "Smith",
        errors: null,
        error: "",
      },
    },
    callbacks: {
      onSubmit: (e) => console.log(e),
      onChange: (e) => console.log(e),
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { PortalProfile as sqm_portal_profile };
