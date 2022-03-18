import { h, VNode } from "@stencil/core";

type HamburgerMenuViewProps = {
  position?: string;
};

export function HamburgerMenuView(
  props: HamburgerMenuViewProps,
  children: VNode
) {
  const vanillaStyle = `

    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    .menu-items { 
      display: none;
      padding: 30px;
      border-radius: 12px;
      border: 2px solid #eaeaea;
      padding-top: 90px;
      background: white; 
      max-width: 35%;
      min-width: 325px;
      position: absolute;
      top: 0;
      right: ${props.position === "right" && "0"};
      left: ${props.position === "left" && "0"};
      margin: 0;
      animation: slideIn 500ms ease-in;
    }
    /*
   @keyframes slideIn {
      0% {
        right: -350px;
      }
      100% {
        right: 0;
      }
    } 
    */

    .toggler {
      border: 2px solid #eee;
      cursor: pointer;
      opacity: 0;
      z-index: 5;
    }

    @media screen and (max-width: 599px) {
      .toggler,
      .hamburger {
        visibility: visible !important;
      }

      .hamburger > .line {
        visibility: visible !important;
      }
    }

    .toggler,
    .hamburger {
      visibility:hidden;
      position: absolute;
      top: 25px;
      width: 50px;
      height: 50px;
      right: ${props.position === "right" && "20px"};
      left: ${props.position === "left" && "20px"};
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
      width: 40%;
      border-bottom: 3px solid #444445;
      margin: 0;
    }

    .hamburger {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .hamburger > .line {
      visibility:hidden;
      z-index: 2;
      height: 4px;
      width: 65%;
      margin-bottom: 3px;
      border-bottom: 5px solid #444445;
    }

  `;

  return (
    <div>
      <style>{vanillaStyle}</style>
      <input type="checkbox" class="toggler" />
      <div class="hamburger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <ul class="menu-items">
        <div>{children}</div>
      </ul>
    </div>
  );
}
