import React from "react";
import { CardView, CardEditView, CardLongView } from ".";
import { Button } from "../Button";

export default {
  title: "Components / Card",
  component: CardView,
};
export const CardProgram = () => (
  <CardEditView title="Program Name">
    A brief description of this program
  </CardEditView>
);
export const CardProgramEdit = () => (
  <CardEditView edit title="Program Name">
    A brief description of this program
  </CardEditView>
);

export const CardA = () => (
  <CardView title="Birthday">
    Engage with loyal customers on their birthday with a special reward
  </CardView>
);
export const CardB = () => (
  <CardView title="Partner">
    Team up with brand champions to boost sales and acquire new users.
  </CardView>
);
export const CardC = () => (
  <CardView title="Points Rewards">
    Give points to your users for making purchases.
  </CardView>
);
export const CardD = () => (
  <CardView title="Profile Completion">
    Improve marketing campaigns by learning more about your users.
  </CardView>
);
export const CardE = () => (
  <CardView title="Referral Program With Objectives">
    Engage with loyal customers on their birthday with a special reward
  </CardView>
);
export const CardF = () => (
  <CardView title="Regional Signup">
    Team up with brand champions to boost sales and acquire new users.
  </CardView>
);
export const CardG = () => (
  <CardView title="Signup">
    Team up with brand champions to boost sales and acquire new users.
  </CardView>
);
export const CardH = () => (
  <CardView title="Test Program 4 (for HTML Emails)">
    Team up with brand champions to boost sales and acquire new users.
  </CardView>
);

export const cardLongA = () => {
  const footer = (
    <>
      <span> No Codes Available</span>
      <Button buttonType="primary" size="medium" pill customCSS="float: right;">
        Upload Codes
      </Button>
    </>
  );
  return (
    <CardLongView title="VIP Program" footer={footer}>
      <span> VIP Reward </span> <br />
      <span style={{ color: "grey" }}>$5.00</span>
    </CardLongView>
  );
};

export const cardLongB = () => {
  const footer = (
    <>
      <span style={{ color: "#57AC59" }}> 123 Codes Available </span>
      <Button
        buttonType="secondary"
        size="medium"
        pill
        customCSS="float: right;"
      >
        Upload Codes
      </Button>
      <Button
        buttonType="secondary"
        size="medium"
        pill
        customCSS="margin-right: 8px; float: right;"
      >
        Manage
      </Button>
    </>
  );
  return (
    <CardLongView title="VIP Program" footer={footer}>
      <span> VIP Reward </span> <br />
      <span style={{ color: "grey" }}>$5.00</span>
    </CardLongView>
  );
};
