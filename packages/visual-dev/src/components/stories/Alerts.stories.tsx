import React from "react";
import { storiesOf } from "@storybook/react";
import Alert from "../Alerts";

storiesOf("Components / Alerts", module).add("Critical ", () => {
	return (
		<div style={{ margin: "20px", width: "308px", height: "76px" }}>
			<Alert
				type="critical"
				title="A critical alert"
				text="An explanation of what the alert is."
			/>
		</div>
	);
});

storiesOf("Components / Alerts", module).add("Warning ", () => {
	return (
		<div style={{ margin: "20px", width: "308px", height: "76px" }}>
			<Alert
				type="warning"
				title="A warning alert"
				text="An explanation of what the alert is."
			/>
		</div>
	);
});

storiesOf("Components / Alerts", module).add("Success ", () => {
	return (
		<div style={{ margin: "20px", width: "308px", height: "76px" }}>
			<Alert
				type="success"
				title="A success alert"
				text="An explanation of what the alert is."
			/>
		</div>
	);
});

storiesOf("Components / Alerts", module).add("Info ", () => {
	return (
		<div style={{ margin: "20px", width: "308px", height: "76px" }}>
			<Alert
				type="info"
				title="An info alert"
				text="A long explanation of what the alert is and takes up multiple lines."
			/>
		</div>
	);
});