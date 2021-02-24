// Emotion doesn't natively support named exports with Rollup
import { css } from "@emotion/css";

export const Style = css`
  width: 100vw;
  height: 100vh;

  .story-book-outer-div {
    .story-div {
      font-family: "Arial", sans-serif;
      font-size: 12px;
    }
    padding-bottom: 500px;
  }

  .story-div {
    position: fixed;
    box-sizing: border-box;
    top: 0;
    width: 250px;
    height: 100vh;
    z-index: 999;
    overflow-y: scroll;
    background: white;
    margin-bottom: 32px;
  }

  .header {
    padding: 24px 0 16px 16px;
    margin-bottom: 24px;
    color: white;
    background: #333;

    h2 {
      letter-spacing: 3px;
      font-weight: 400;
    }
  }

  .parentStoryList {
    list-style: none;
    padding-left: 16px;

    summary {
      margin-bottom: 4px;
    }
  }
  .parentStory {
    cursor: pointer;
  }
  .parentStory.selected {
    font-weight: bold;
  }

  .subStory {
    font-size: 12px;
    cursor: pointer;
    line-height: 1.5em;
    margin-top: 4px;

    a {
      display: block;
      padding: 4px 4px 4px 16px;
    }
  }
  .subStory:hover {
    background-color: #eee;
  }
  .subStory.selected {
    background-color: lightgreen;
  }

  .component {
    padding: 24px 16px;
  }

  h4.group-header {
    margin: 8px 0;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    color: #575757;
  }

  .group-wrapper {
    margin-bottom: 24px;
  }

  .dynamic-display-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    left: 100%;
    padding: 16px;
    z-index: 1000;
    background: white;
    transform: translateX(-100%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    & > :not(:first-child) {
      margin-top: 12px;
    }

    p {
      font-size: 12px;
      margin: 0;
      padding: 0;
    }

    .button-wrapper {
      display: flex;

      & > :not(:first-child) {
        margin-left: 12px;
      }
    }

    & button {
      border: 1px solid #eaeaea;
      background: white;
      border-radius: 4px;
      color: #777;
      padding: 4px 12px;
      justify-content: center;
      align-items: center;
      text-align: center;

      &.active {
        background: #555;
        border-color: #555;
        color: white;
      }
    }
  }
`;
