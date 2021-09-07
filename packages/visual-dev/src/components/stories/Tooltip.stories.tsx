import React from "react";
import { storiesOf } from "@storybook/react";
import Tooltip from "../Tooltip";

storiesOf("Components / Tooltip", module).add("Top ", () => {
	return (
		<div style={{ margin: "300px", width: "308px", height: "76px" }}>
			<Tooltip
				text="A tooltip that explains something in detail"
				direction="top"
			>
				<button>Hover</button>
			</Tooltip>
		</div>
	);
});


storiesOf("Components / Tooltip", module).add("Left ", () => {
	return (
		<div style={{ margin: "300px", width: "308px", height: "76px" }}>
			<Tooltip
				text="A tooltip that explains something in detail"
				direction="left"
			>
				<button>Hover</button>
			</Tooltip>
		</div>
	);
});



storiesOf("Components / Tooltip", module).add("Right ", () => {
	return (
		<div style={{ margin: "300px", width: "308px", height: "76px" }}>
			<Tooltip
				text="A tooltip that explains something in detail"
				direction="right"
			>
				<button>Hover</button>
			</Tooltip>
		</div>
	);
});



storiesOf("Components / Tooltip", module).add("Bottom ", () => {
	return (
		<div style={{ margin: "300px", width: "308px", height: "76px" }}>
			<Tooltip
				text="A tooltip that explains something in detail"
				direction="bottom"
			>
				<button>Hover</button>
			</Tooltip>
		</div>
	);
});