import React from "react"
import { Card, CardEdit, CardLong } from "."
import { Button } from "../Button"

export default {
  title: "Components / Card",
  component: Card,
}
export const CardProgram = () => <CardEdit title="Program Name">A brief description of this program</CardEdit>
export const CardProgramEdit = () => (
  <CardEdit edit title="Program Name">
    A brief description of this program
  </CardEdit>
)

export const CardA = () => <Card title="Birthday">Engage with loyal customers on their birthday with a special reward</Card>
export const CardB = () => <Card title="Partner">Team up with brand champions to boost sales and acquire new users.</Card>
export const CardC = () => <Card title="Points Rewards">Give points to your users for making purchases.</Card>
export const CardD = () => <Card title="Profile Completion">Improve marketing campaigns by learning more about your users.</Card>
export const CardE = () => <Card title="Referral Program With Objectives">Engage with loyal customers on their birthday with a special reward</Card>
export const CardF = () => <Card title="Regional Signup">Team up with brand champions to boost sales and acquire new users.</Card>
export const CardG = () => <Card title="Signup">Team up with brand champions to boost sales and acquire new users.</Card>
export const CardH = () => <Card title="Test Program 4 (for HTML Emails)">Team up with brand champions to boost sales and acquire new users.</Card>

export const cardLongA = () => {
  const footer = (
    <>
      <span> No Codes Available</span>
      <Button buttonType="primary" size="medium" pill css="float: right;">
        Upload Codes
      </Button>
    </>
  )
  return (
    <CardLong title="VIP Program" footer={footer}>
      <span> VIP Reward </span> <br />
      <span style={{ color: "grey" }}>$5.00</span>
    </CardLong>
  )
}

export const cardLongB = () => {
  const footer = (
    <>
      <span style={{ color: "#57AC59" }}> 123 Codes Available </span>
      <Button buttonType="secondary" size="medium" pill css="float: right;">
        Upload Codes
      </Button>
      <Button buttonType="secondary" size="medium" pill css="margin-right: 8px; float: right;">
        Manage
      </Button>
    </>
  )
  return (
    <CardLong title="VIP Program" footer={footer}>
      <span> VIP Reward </span> <br />
      <span style={{ color: "grey" }}>$5.00</span>
    </CardLong>
  )
}
