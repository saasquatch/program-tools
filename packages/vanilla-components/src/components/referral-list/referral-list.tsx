import { Component, Prop, State } from "@stencil/core";
import faker from "faker";

const API: MyAPI = window["WidgetHost"];

const demoData: Referral[] = [1, 2, 3, 4, 5, 6].map(generateFakeReferral);

function generateFakeReferral(): Referral {
  return {
    id: faker.random.uuid(),
    dateReferralStarted: faker.random.number(),
    dateReferralPaid: faker.random.number(),
    dateReferralEnded: faker.random.number(),
    moderationStatus: faker.random.word(),
    referredUser: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName() + " Demo"
    }
  };
}

@Component({
  tag: "referral-list",
  styleUrl: "referral-list.scss"
})
export class ReferralList {
  @Prop() emptyText: string;
  @State() referrals: Referral[] = demoData;
  @State() loading: boolean;

  constructor() {
    if (API) {
      this.loading = true;
      API.graphql
        .getReferrals()
        .then(res => {
          try {
            // this.referrals = res.data.feed[0].repository.full_name;
            this.referrals = res.data.user.referrals.data;
            if (!(this.referrals instanceof Array)) throw new Error("Didn't get a referral list from GraphQL");
            this.loading = false;
          } catch (e) {
            this.onError(e);
          }
        })
        .catch(e => {
          this.onError(e);
        });
    } else {
      this.referrals = demoData;
    }
  }
  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
    this.referrals = demoData;
    this.loading = false;
  }

  componentWillLoad() {}

  componentDidLoad() {
    if (API) {
      API.analytics.loadEvent();
    }
  }

  handleClick(event: UIEvent) {
    API.ui.close();
  }

  render() {
    let content;
    if (this.loading) {
      content = "Loading...";
    } else {
      content = (
        <div>
          {this.referrals.map(r => {
            return (
              <div class="referral-row">
                <img src={faker.internet.avatar()} style={{ float: "left", margin: "0 10px", height:"50px" }} />
                <div>
                  <b>Name:</b> {r.referredUser.firstName}{" "}{r.referredUser.lastName} <br />
                  <b>Email:</b> <span style={{ color: "grey" }}>
                    {faker.internet.email()}{" "}
                  </span><br/>
                  <b>ModerationStatus:</b> {r.moderationStatus} <br/>
                  <b>ID:</b> <code>{r.id}</code>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div>
        <h1>Referral List</h1>
        {content}
        <h1>Referral Data</h1>

        <pre>{JSON.stringify(this.referrals, null, 2)}</pre>
      </div>
    );
  }
}
