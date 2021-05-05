import { navigation } from "@saasquatch/component-boilerplate";
import { h } from "@stencil/core";

export default {
  title: "Tests/Router",
};

const templates = `
    <template path="/foo"><h1>foo</h1>
    
    <p>These elements don't produce a specific box by themselves. They are replaced by their pseudo-box and their child boxes. Please note that the CSS Display Level 3 spec defines how the contents value should affect "unusual elements" — elements that aren’t rendered purely by CSS box concepts such as replaced elements. See Appendix B: Effects of display: contents on Unusual Elements for more details.

    Due to a bug in browsers this will currently remove the element from the accessibility tree — screen readers will not look at what's inside. See the Accessibility concerns section below for more details.</p>
    </template>
    <template path="/bar"><h2>bar</h2>
    
    <p>Turns off the display of an element so that it has no effect on layout (the document is rendered as though the element did not exist). All descendant elements also have their display turned off.
    To have an element take up the space that it would normally take, but without actually rendering anything, use the visibility property instead.</p>
    </template>
    <template path="/baz/bang"><h3>baz/bang</h3>
    <pre>
    ▄▄▄▄▄▄▄░▄▄▄▄▄▄▄░▄▄▄▄▄▄░▄▄▄▄▄
    ░░▀███░░░░▀██░░░░██▀░░░░██░░
    ░░░▀██░░░░░▀██░░▄█░░░░░▄█░░░
    ░░░░███░░░░░▀██▄█░░░░░░█░░░░
    ░░░░░███░░░░░▀██░░░░░░█▀░░░░
    ░░░░░░███░░░░▄███░░░░█▀░░░░░
    ░░░░░░░██▄░░▄▀░███░░█▀░░░░░░
    ░░░░░░░▀██▄█▀░░░███▄▀░░░░░░░
    ░░░░░░░░▀██▀░░░░░███░░░░░░░░
    ░░░░░░░░░▀▀░░░░░░░▀░░░░░░░░░
    </pre>
    </template>
    <template path="/refer/:page"><h3>/refer/:page</h3>
    <pre>
      refer/:page
    </pre>
    </template>
`;

const routes = `
    <sqm-route path="/foo"><h1>foo</h1>
    
    <p>These elements don't produce a specific box by themselves. They are replaced by their pseudo-box and their child boxes. Please note that the CSS Display Level 3 spec defines how the contents value should affect "unusual elements" — elements that aren’t rendered purely by CSS box concepts such as replaced elements. See Appendix B: Effects of display: contents on Unusual Elements for more details.

    Due to a bug in browsers this will currently remove the element from the accessibility tree — screen readers will not look at what's inside. See the Accessibility concerns section below for more details.</p>
    </sqm-route>
    <sqm-route path="/bar"><h2>bar</h2>
    <p>Turns off the display of an element so that it has no effect on layout (the document is rendered as though the element did not exist). All descendant elements also have their display turned off.
    To have an element take up the space that it would normally take, but without actually rendering anything, use the visibility property instead.</p>
    </sqm-route>
    <sqm-route path="/baz/bang"><h3>baz/bang</h3>
    <pre>
    ▄▄▄▄▄▄▄░▄▄▄▄▄▄▄░▄▄▄▄▄▄░▄▄▄▄▄
    ░░▀███░░░░▀██░░░░██▀░░░░██░░
    ░░░▀██░░░░░▀██░░▄█░░░░░▄█░░░
    ░░░░███░░░░░▀██▄█░░░░░░█░░░░
    ░░░░░███░░░░░▀██░░░░░░█▀░░░░
    ░░░░░░███░░░░▄███░░░░█▀░░░░░
    ░░░░░░░██▄░░▄▀░███░░█▀░░░░░░
    ░░░░░░░▀██▄█▀░░░███▄▀░░░░░░░
    ░░░░░░░░▀██▀░░░░░███░░░░░░░░
    ░░░░░░░░░▀▀░░░░░░░▀░░░░░░░░░
    </pre>
    </sqm-route>
    <sqm-route path="/refer/:page"><h3>/refer/:page</h3>
    <pre>
      refer/:page
    </pre>
    </sqm-route>
`;

export const TemplateNavigation = () => {
  return (
    <div>
      <button onClick={() => navigation.push("/")}>/</button>
      <button onClick={() => navigation.push("/foo")}>/foo</button>
      <button onClick={() => navigation.push("/bar")}>/bar</button>
      <button onClick={() => navigation.push("/baz/bang")}>/baz/bang</button>
      <button onClick={() => navigation.push("/refer")}>/refer</button>
      <button onClick={() => navigation.push("/refer/1")}>/refer/1</button>
      <button onClick={() => navigation.push("/refer/2")}>/refer/2</button>
      <button onClick={() => navigation.back()}>Back</button>
      <button onClick={() => navigation.forward()}>Forward</button>
      <hr />
      <sqm-router innerHTML={templates}></sqm-router>
    </div>
  );
};

export const RouteNavigation = () => {
  return (
    <div>
      <button onClick={() => navigation.push("/")}>/</button>
      <button onClick={() => navigation.push("/foo")}>/foo</button>
      <button onClick={() => navigation.push("/bar")}>/bar</button>
      <button onClick={() => navigation.push("/baz/bang")}>/baz/bang</button>
      <button onClick={() => navigation.push("/refer")}>/refer</button>
      <button onClick={() => navigation.push("/refer/1")}>/refer/1</button>
      <button onClick={() => navigation.push("/refer/2")}>/refer/2</button>
      <button onClick={() => navigation.back()}>Back</button>
      <button onClick={() => navigation.forward()}>Forward</button>
      <hr />
      <sqm-router innerHTML={routes}></sqm-router>
    </div>
  );
};

export const Styling = () => {
  return (
    <div>
      <button onClick={() => navigation.push("/")}>/</button>
      <button onClick={() => navigation.push("/foo")}>/foo</button>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <sqm-router
          innerHTML={`<template path="/">
      
      <div>Column 1</div>
      <div>Column 2 </div>
      </template>`}
        ></sqm-router>
      </div>
    </div>
  );
};
