import { h, VNode } from "@stencil/core";

import { createStyleSheet } from "../../styling/JSS";
import { gap } from "../../global/mixins";

export interface NavigationSidebarViewProps {
  mobileItemsSlot: any;
}

const style = {
  ItemsContainer: {
    "min-width": "290px",
    "max-width": "320px",
    "box-sizing": "border-box",
    padding: "20px 15px",
    ...gap({ direction: "column" as const, size: "4px" }),
    "@media screen and (max-width: 799px)": {
      minWidth: "0px",
      display: "none",
    },
  },
};

const vanillaStyle = `
  @media screen and (max-width: 799px) {
    :host {
      max-width: max-content !important;
      min-width: max-content !important;
    }
  }
  :host {    
    width: 30vw;
    min-width: max-content;
    max-width: 320px;
  }
`;

const hamburgerStyle = `
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    .hamburger-container {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 60px;
      flex-direction: column;
      z-index: 100;
      display: none;
    }
    .menu-items { 
      display: none;
      padding: 20px;
      border-right: 2px solid #eaeaea;
      padding-top: 60px;
      background: white; 
      max-width: 400px;
      width: 70vw;
      height: 100vh;
      position: absolute;
      top: 0;
      right: 0;
      left: 0px;
      margin: 0;
      animation: slideIn 500ms ease-in-out;
    }
  
   @keyframes slideIn {
      0% {
        left: -350px;
      }
      100% {
        left: 0;
      }
    } 
  

    .toggler {
      border: 2px solid #eee;
      cursor: pointer;
      opacity: 0;
      z-index: 5;
    }

    @media screen and (max-width: 799px) {
      .toggler,
      .hamburger {
        visibility: visible !important;
      }

      .hamburger-container {
        display: flex;
      }

      .hamburger > .line {
        visibility: visible !important;
      }
    }


    .toggler,
    .hamburger {
      user-select: none;
      visibility:hidden;
      position: absolute;
      padding: 20px 10px;
    }

    .toggler {
      z-index: 100;
      width: 100%;
      height: 100%;
    }

    .hamburger {
      z-index: 10;
      width: 75%;
      height: 100%;
    }

    .toggler:checked ~ .menu-items {
      display: block;
    }

    /***** Turn hamburger into an X *****/
    .toggler:checked ~ .hamburger > .line:nth-child(1) {
      opacity: 0;
    }

    .toggler:checked ~ .hamburger > .line:nth-child(2) {
      transform: rotate(45deg) translate(0px, -0.5px);
    }

    .toggler:checked ~ .hamburger > .line:nth-child(3) {
      transform: rotate(-45deg) translate(3px, -3.5px);
    }

    .toggler:checked ~ .hamburger > .line:nth-child(1),
    .toggler:checked ~ .hamburger > .line:nth-child(2),
    .toggler:checked ~ .hamburger > .line:nth-child(3) {
      width: 75%;
      border-bottom: 3px solid #444445;
      margin: 0;
    }

    .hamburger > .line {
      visibility:hidden;
      z-index: 2;
      height: 4px;
      width: 100%;
      margin-bottom: 3px;
      border-bottom: 5px solid #444445;
    }

  `;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function NavigationSidebarView(
  props: NavigationSidebarViewProps,
  children: VNode
) {
  return (
    <div>
      <div class="hamburger-container">
        <input type="checkbox" class="toggler" part="toggler" />
        <div class="hamburger">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <ul class="menu-items">{props.mobileItemsSlot}</ul>
      </div>
      <div class={sheet.classes.ItemsContainer}>
        <style type="text/css">
          {vanillaStyle}
          {styleString}
          {hamburgerStyle}
        </style>
        {<div>{children}</div>}
      </div>
    </div>
  );
}
