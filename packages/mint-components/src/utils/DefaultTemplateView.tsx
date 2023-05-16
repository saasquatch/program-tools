import { h } from "@stencil/core";
import { navigation } from "@saasquatch/component-boilerplate";

function Buttons({ callbacks, states, template }) {
  return (
    <div>
      <button
        onClick={() => callbacks.setPreviewTemplate(states.editedTemplate)}
      >
        Update Preview
      </button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => callbacks.setPreviewTemplate(template)}
      >
        Preview Dashboard
      </button>
    </div>
  );
}

export function DefaultTemplateView(props) {
  const { states, callbacks } = props;
  return (
    <div style={{ height: "50vh" }}>
      <textarea
        style={{ width: "100%", height: "300px" }}
        onChange={(e: Event) =>
          callbacks.setEditedTemplate((e.target as HTMLInputElement).value)
        }
      >
        {states.editedTemplate}
      </textarea>
      <Buttons
        states={states}
        callbacks={callbacks}
        template={props.template}
      />
      <h2>Navigation</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 80px)",
          gridGap: "10px",
        }}
      >
        <button onClick={() => navigation.push("/")}>Dashboard</button>
        {props.leadSubmit && (
          <button onClick={() => navigation.push("/refer")}>
            Submit a Referral
          </button>
        )}
        <button onClick={() => navigation.push("/activity")}>Activity</button>
        <button onClick={() => navigation.push("/editProfile")}>
          Edit Profile
        </button>
        <button onClick={() => navigation.push("/login")}>Login</button>
        <button onClick={() => navigation.push("/register")}>Register</button>
        <button onClick={() => navigation.push("/emailVerification")}>
          Email Verification
        </button>
        <button onClick={() => navigation.push("/verifyEmail")}>
          Verify Email
        </button>
        <button onClick={() => navigation.push("/forgotPassword")}>
          Forgot Password
        </button>
        <button onClick={() => navigation.push("/resetPassword")}>
          Reset Password
        </button>
      </div>
      <br />
      <div innerHTML={states.previewTemplate}></div>
    </div>
  );
}
