import { Component, Prop, State, h } from "@stencil/core";
import { css } from "emotion";
import Ajv from "ajv";
import { draft06 } from "./schemas";
import { onChange, SchemaForm } from "../../jsx-components/FormComponents";
import { API } from "../../services/WidgetHost";

declare global {
  interface Object {
    fromEntries: any;
  }
}

function LoadingStateSmall() {
  return (
    <div
      class="container-loading-small"
      style={{
        position:"absolute",
        display:"inline",
        width: "10px",
        top: "14px",
        left: "15px",
      }}
    >
      <div class="loading-icon-small">
        <div
          class="bar1-small"
          style={{
            width: "10px",
            height: "10px",
          }}
        ></div>
      </div>
    </div>
  );
}

@Component({
  tag: "form-component",
  styleUrl: "form-component.scss",
})
export class FormComponent {
  //////////////////////////////////////////
  @State() context: any = {};
  //////////////////////////////////////////
  @Prop() ishidden: boolean;
  @Prop() formkey: any;
  @Prop() namespace: string;
  @Prop() textcolor: string = "white";

  @State() form: any;
  @State() formData: any = {};
  @State() errorMessage: string;
  @State() errors: any;
  @State() formErrors: any;
  @State() submitted: boolean = false;
  @State() loading: boolean = true;
  @State() loadingForm: boolean = false;

  componentWillLoad() {
    this.getForm(this.formkey)
      .then((res) => {
        console.log("form retrieved", res);
        this.form = res.form;
        this.loading = false;
      })
      .catch((error) => {
        this.errorMessage = error;
        this.loading = false;
      });
  }
  getForm(key) {
    return API.graphql.getForm(key);
  }

  validate = (e) => {
    // ISSUES:
    // - "required" does not mean value needs to be true (checkboxes)
    // - draft schema stuff is funky, need to figure out how to properly import it
    // - just took ajv options from our portal code, not sure if it's correct here
    if (!this.formData) return;
    const schema = this.form.schema;
    this.errorMessage = "";
    e.preventDefault();
    var ajv = new Ajv({
      jsonPointers: true,
      errorDataPath: "property",
      allErrors: true,
      multipleOfPrecision: 8,
      schemaId: "auto",
      unknownFormats: "ignore",
    });
    // TODO: sort out this draft meta schema stuff
    ajv.addMetaSchema(draft06);
    var validate = ajv.compile(schema);
    var valid = validate(this.formData);
    if (!valid) {
      console.log("validate", validate.errors);
      this.formErrors = validate.errors;
      return;
    } else {
      this.submitForm(this.formData);
    }
  };

  submitForm = async (formData) => {
    this.loadingForm = true;
    const formSubmissionInput = {
      formSubmissionInput: { key: this.form.key, formData },
    };
    console.log(formSubmissionInput);
    const res = await API.graphql.submitForm(formSubmissionInput);
    console.log("submit data", res);
    const data = res.data;

    if (!data.submitForm.success) {
      const error =
        data.submitForm.results[0] &&
        data.submitForm.results[0].result.results[0].message;
      this.errorMessage = error;
    } else {
      this.submitted = true;
    }
    this.loadingForm = false;
  };

  render() {
    if (this.loading) return <div>loading form</div>;
    console.log("form found", this.form);
    const buttonStyle = css`
      width: 100%;
      height: 45px;
      border: 1px solid #ddd;
      background-color: #222;
      border-radius: 4px;
      color: #fff;
      font-family: "Montserrat", Helvetica;
      font-size: 16px;
      font-weight: 500;
      z-index: 3;
      &:hover {
        background-color: #444;
        cursor: pointer;
      }
    `;
    // const isDisabled = !(
    //   this.form.initialData && this.form.initialData.isEnabled
    // );

    const isDisabled = false;
    return (
      !this.ishidden && (
        <div>
          <h4
            style={{
              textAlign: "center",
              marginBottom: "-10px",
              marginTop: "25px",
            }}
          >
            Submit a Referral
          </h4>
          {
            <div style={{ padding: "25px 20px", paddingBottom: "10px" }}>
              <div
                class="altx-reward-component"
                style={{ marginTop: "-22px", paddingBottom: "8px" }}
              >
                <form
                  id={this.form.key}
                  onSubmit={(e) => {
                    this.validate(e);
                  }}
                >
                  {!this.submitted ? (
                    <SchemaForm
                      schema={this.form.schema}
                      onChange={(e) => {
                        this.formData = onChange(e, this.formData);
                      }}
                      formData={this.formData}
                      errors={this.formErrors}
                    />
                  ) : (
                    <span></span>
                  )}
                  {this.errorMessage && (
                    <p style={{ color: "#e4344b" }}>{this.errorMessage}</p>
                  )}
                  {this.loading && <p>Loading</p>}
                  <button
                    style={{ marginTop: "24px", position: "relative" }}
                    class={`${buttonStyle} submit-button`}
                    type="submit"
                    disabled={isDisabled}
                  >
                    {this.loadingForm ? <LoadingStateSmall /> : <span></span>}
                    {isDisabled
                      ? this.form.initialData.isEnabledErrorMessage ||
                        "Form Disabled"
                      : this.submitted ? "Successfully Submitted!"
                      : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          }
        </div>
      )
    );
  }
}
