import React from "react";
import { storiesOf } from "@storybook/react";
import { Tooltip } from "../Tooltip";
import styled from 'styled-components'

export default {
  title: "Components / Tooltip",
  component: Tooltip
}

const StoryFrame = styled.div`
	width: 900px;
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


export const Empty = () => (
	<StoryFrame>
		<Tooltip>
			<button> Hover </button>
		</Tooltip>
	</StoryFrame>
)

export const Short = () => (
	<StoryFrame>
		<Tooltip
			direction="top"
			text="Tool"
		>
			<button> Tip </button>
		</Tooltip>
	</StoryFrame>
)

export const Long = () => (
	<StoryFrame>
		<Tooltip
			direction="top"
			text="A tooltip that explains something in a much longer detail"
		>
			<button> Hover longer text </button>
		</Tooltip>
	</StoryFrame>
)