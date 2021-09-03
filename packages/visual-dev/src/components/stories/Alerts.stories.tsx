import React from "react";
import { storiesOf } from "@storybook/react";
import { AlertCritical, AlertWarning, AlertSuccess, AlertInfo } from "../Alerts";

storiesOf("Components / Alerts", module).add("Critical ", () => {
	return (
		<div style={{ margin: "20px", width: "308px", height: "76px" }}>
			<AlertCritical
				title="A critical alert"
				text="An explanation of what the alert is."
			/>
		</div>
	);
});

storiesOf("Components / Alerts", module).add("Warning ", () => {
	return (
		<div style={{ margin: "20px", width: "308px", height: "76px" }}>
			<AlertWarning
				title="A warning alert"
				text="An explanation of what the alert is."
			/>
		</div>
	);
});

storiesOf("Components / Alerts", module).add("Success ", () => {
	return (
		<div style={{ margin: "20px", width: "308px", height: "76px" }}>
			<AlertSuccess
				title="A success alert"
				text="An explanation of what the alert is."
			/>
		</div>
	);
});

storiesOf("Components / Alerts", module).add("Info ", () => {
	return (
		<div style={{ margin: "20px", width: "308px", height: "76px" }}>
			<AlertInfo
				title="An info alert"
				text="A long explanation of what the alert is and takes up multiple lines."
			/>
		</div>
	);
});