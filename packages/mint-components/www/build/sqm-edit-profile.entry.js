import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { m as useState, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { E as EditProfileView } from './sqm-edit-profile-view-7b3c5166.js';
import { d as dist, i as ie, a as sn, q as qe, j as jn } from './index.module-b74a7f69.js';
import { i as intl } from './global-b1f18590.js';
import { g as getProps } from './utils-48175026.js';
import { c as cjs } from './cjs-e829b75b.js';
import './extends-c31f1eff.js';
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
  currentRegion: "",
  firstName: "",
  lastName: "",
  errors: {},
  error: "",
};
function useEditProfile(props) {
  const userIdent = ie();
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(undefined);
  const [formState, setFormState] = useState(defaultFormState);
  const userDataResponse = sn(GET_USER, {}, !(userIdent === null || userIdent === void 0 ? void 0 : userIdent.jwt));
  const [upsertUser, upsertUserResponse] = qe(UPSERT_USER);
  useEffect(() => {
    if ((upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.loading) || !showEdit)
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
      setShowEdit(false);
    }
  }, [upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.loading]);
  useEffect(() => {
    setUserData((data) => { var _a; return ({ ...data, ...(_a = userDataResponse === null || userDataResponse === void 0 ? void 0 : userDataResponse.data) === null || _a === void 0 ? void 0 : _a.viewer }); });
  }, [userDataResponse === null || userDataResponse === void 0 ? void 0 : userDataResponse.data]);
  useEffect(() => {
    var _a;
    if ((_a = upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.errors) === null || _a === void 0 ? void 0 : _a.message) {
      setFormState((state) => ({ ...state, error: "Network request failed." }));
    }
  }, [upsertUserResponse === null || upsertUserResponse === void 0 ? void 0 : upsertUserResponse.errors]);
  return {
    states: {
      loading: (userDataResponse === null || userDataResponse === void 0 ? void 0 : userDataResponse.loading) || upsertUserResponse.loading,
      submitDisabled: false,
      formState,
      user: userData,
      showEdit,
      text: {
        editprofileheader: props.editprofileheader,
        editprofiletext: props.editprofiletext,
        firstnametext: props.firstnametext,
        lastnametext: props.lastnametext,
        canceltext: props.canceltext,
        updatetext: props.updatetext,
        currentregiontext: props.currentregiontext,
        showregion: props.showregion,
      },
    },
    callbacks: {
      onSubmit: () => {
        if (formState.firstName && formState.lastName) {
          upsertUser({
            id: userIdent === null || userIdent === void 0 ? void 0 : userIdent.id,
            accountId: userIdent === null || userIdent === void 0 ? void 0 : userIdent.accountId,
            firstName: formState.firstName,
            lastName: formState.lastName,
          });
          setFormState((s) => ({ ...s, errors: {} }));
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
      },
      resetForm: () => {
        var _a, _b, _c, _d, _e, _f;
        const currentRegion = ((_b = (_a = userDataResponse === null || userDataResponse === void 0 ? void 0 : userDataResponse.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.countryCode)
          ? intl.formatDisplayName(userDataResponse.data.viewer.countryCode, {
            type: "region",
          })
          : "";
        setUserData({
          ...(_c = userDataResponse.data) === null || _c === void 0 ? void 0 : _c.viewer,
          ...(_d = upsertUserResponse.data) === null || _d === void 0 ? void 0 : _d.upsertUser,
        });
        setFormState({
          ...defaultFormState,
          ...(_e = userDataResponse.data) === null || _e === void 0 ? void 0 : _e.viewer,
          ...(_f = upsertUserResponse.data) === null || _f === void 0 ? void 0 : _f.upsertUser,
          currentRegion,
        });
      },
      onChange: (e) => {
        const { name, value } = e.target;
        setFormState((data) => ({ ...data, [name]: value }));
      },
      setShowEdit,
    },
  };
}

const sqmEditProfileCss = ".ErrorStyles::part(base){background:var(--sl-color-danger-10);border-color:var(--sl-color-danger-500);outline:var(--sl-color-danger-500)}.ErrorStyles:host{--something-random:red;--focus-ring:0 0 0 var(--sl-focus-ring-width) red !important}.ErrorStyles::part(input){color:var(--sl-color-danger-500)}.ErrorStyles::part(input):-webkit-autofill,.ErrorStyles::part(input):-webkit-autofill:hover,.ErrorStyles::part(input):-webkit-autofill:focus,.ErrorStyles::part(input):-webkit-autofill:active{box-shadow:0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;-webkit-text-fill-color:var(--sl-color-danger-500)}.ErrorStyles::part(help-text){color:var(--sl-color-danger-500)}:host{display:block}:host([hidden]){display:none}.FormWrapper>:not(:first-child){margin-top:54px}.FormSection{width:100%}.FormSection>:not(:first-child){margin-top:16px}.ButtonWrapper{display:flex;margin-top:24px;justify-content:flex-end}.ButtonWrapper>:not(:first-child){margin-left:var(--sl-font-size-x-small)}.CardWrapper{box-sizing:border-box;background:var(--sl-color-white);padding:40px 30px;display:flex;flex-direction:column;justify-content:space-between}@media screen and (max-width: 499px){.CardWrapper{flex-direction:column;justify-content:center;align-items:center}}@media screen and (max-width: 880px){.CardWrapper.ShowEdit{flex-direction:row;align-items:flex-end}}";

let EditProfile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const props = jn()
      ? useEditProfileDemo(getProps(this))
      : useEditProfile(getProps(this));
    return h$1(EditProfileView, Object.assign({}, props));
  }
};
function useEditProfileDemo(props) {
  return cjs({
    states: {
      loading: false,
      submitDisabled: false,
      formState: {
        currentRegion: "Canada",
        firstName: "Bill",
        lastName: "Bob",
        errors: {},
        error: "An error string",
      },
      user: {
        firstName: "Bill",
        lastName: "Bob",
        email: "billbob@example.com",
      },
      showEdit: false,
      text: {
        editprofileheader: props.editprofileheader
          ? props.editprofileheader
          : "Edit Profile",
        editprofiletext: props.editprofiletext
          ? props.editprofiletext
          : "Update your profile.",
        firstnametext: props.firstnametext
          ? props.firstnametext
          : "First Name",
        lastnametext: props.lastnametext ? props.lastnametext : "Last Name",
        canceltext: props.canceltext ? props.canceltext : "Cancel",
        updatetext: props.updatetext ? props.updatetext : "Update",
        currentregiontext: props.currentregiontext
          ? props.currentregiontext
          : "Region",
        showregion: true,
      },
    },
    callbacks: {
      onSubmit: (props) => {
        console.log(props);
      },
      resetForm: () => {
        console.log("reset");
      },
      onChange: () => {
        console.log("change");
      },
      setShowEdit: (props) => {
        console.log(props);
      },
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}
EditProfile.style = sqmEditProfileCss;

export { EditProfile as sqm_edit_profile };
