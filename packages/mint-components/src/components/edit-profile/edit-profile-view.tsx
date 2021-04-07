import { h } from "@stencil/core";

export interface EditProfileViewProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      currentRegion: string;
      firstName: string;
      lastName: string;
      errors: any;
      error: string;
    };
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
    showEdit: boolean;
    text: {
      editprofileheader: string;
      editprofiletext: string;
      firstnametext: string;
      lastnametext: string;
      canceltext: string;
      updatetext: string;
      currentregiontext: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    resetForm: () => void;
    onChange: (e) => void;
    setShowEdit: (props: boolean) => void;
  };
}

const EditProfileView = (props: EditProfileViewProps) => {
  const { states, callbacks } = props;
  const { text } = states;
  const { errors } = states.formState;

  if (states.showEdit) {
    return (
      <div class={`CardWrapper ${!states.showEdit && "ShowEdit"}`}>
        <h2
          style={{
            fontSize: "var(--sl-font-size-x-large)",
            margin: "0px",
            textAlign: "center",
          }}
        >
          {text.editprofileheader}
        </h2>
        <form class="FormWrapper" onSubmit={callbacks.onSubmit}>
          <div class="FormSection">
            <sl-input
              exportparts="label: inputlabel"
              value={states.formState.firstName}
              onInput={callbacks.onChange}
              label={text.firstnametext}
              {...(errors.firstName && errors.firstName.status !== "valid"
                ? { class: "Errortext", helpText: "Cannot be empty" }
                : [])}
              id="firstName"
              name="firstName"
              error={
                errors.firstName && errors.firstName.status !== "valid"
                  ? errors.firstName.message
                  : undefined
              }
            />
            <sl-input
              exportparts="label: inputlabel"
              value={states.formState.lastName}
              onInput={callbacks.onChange}
              label={text.lastnametext}
              id="lastName"
              name="lastName"
              {...(errors.lastName && errors.lastName.status !== "valid"
                ? { class: "Errortext", helpText: "Cannot be empty" }
                : [])}
              error={
                errors.lastName && errors.lastName.status !== "valid"
                  ? errors.lastName.message
                  : undefined
              }
            />
          </div>
          {states.formState.currentRegion && (
            <sl-input
              exportparts="label: inputlabel"
              disabled
              value={states.formState.currentRegion}
              label={text.currentregiontext}
              id="currentRegion"
              name="currentRegion"
            />
          )}
          {states.formState.error && (
            <sl-alert type="danger" open>
              <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
              <strong>{states.formState.error}</strong>
            </sl-alert>
          )}
          <div class="ButtonWrapper">
            <sl-button
              type="primary"
              loading={states.loading}
              disabled={states.submitDisabled}
              onClick={(e) => {
                callbacks.onSubmit(e);
              }}
              submit
              exportparts="base: primarybutton"
            >
              {text.updatetext}
            </sl-button>
            <sl-button
              onClick={() => {
                callbacks.setShowEdit(false);
                // callbacks.resetForm();
              }}
              exportparts="base: defaultbutton"
            >
              {text.canceltext}
            </sl-button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div class={`CardWrapper FormWrapper ${!states.showEdit && "ShowEdit"}`}>
      <div class="FormSection">
        <h2
          style={{
            fontSize: "var(--sl-font-size-x-large",
            marginBottom: "0px",
            textAlign: "center",
          }}
        >
          {text.editprofileheader}
        </h2>
        <div>
          <p style={{ fontSize: "var(--sl-font-size-medium)" }}>
            {states.user?.firstName} {states.user?.lastName}
          </p>
          <p
            style={{ fontSize: "var(--sl-font-size-medium)" }}
            title={states.user?.email}
          >
            {states.user?.email}
          </p>
        </div>
      </div>
      <sl-button
        type="primary"
        loading={states.loading}
        onClick={() => {
          callbacks.resetForm();
          callbacks.setShowEdit(true);
        }}
        exportparts="base: primarybutton"
      >
        {text.editprofiletext}
      </sl-button>
    </div>
  );
};

export default EditProfileView;
