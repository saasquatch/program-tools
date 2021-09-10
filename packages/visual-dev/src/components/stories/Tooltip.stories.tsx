import React from "react";
import { storiesOf } from "@storybook/react";
import { Tooltip } from "../Tooltip";
import styled from 'styled-components'

export default {
  title: "Components / Tooltip",
  component: Tooltip
}

const StoryFrame = styled.div`
	width: 800px;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Top = () => (
	<StoryFrame>
		<Tooltip
			direction="top"
			text="A tooltip that explains something in detail"
		>
			<button> Hover </button>
		</Tooltip>
	</StoryFrame>
)

export const Bottom = () => (
	<StoryFrame>
		<Tooltip
			direction="bottom"
			text="A tooltip that explains something in detail"
		>
			<button> Hover </button>
		</Tooltip>
	</StoryFrame>
)

export const Left = () => (
	<StoryFrame>
		<Tooltip
			direction="left"
			text="A tooltip that explains something in detail"
		>
			<button> Hover </button>
		</Tooltip>
	</StoryFrame>
)

export const Right = () => (
	<StoryFrame>
		<Tooltip
			direction="right"
			text="A tooltip that explains something in detail"
		>
			<button> Hover </button>
		</Tooltip>
	</StoryFrame>
)

export const EmptyAndNoDirection = () => (
	<StoryFrame>
		<Tooltip
			direction="top"
			text=""
		>
			<button> Hover </button>
		</Tooltip>
	</StoryFrame>
)