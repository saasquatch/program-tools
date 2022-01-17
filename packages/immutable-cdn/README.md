# immutable-cdn

Manages a switchable CDN cookie for implementing the [Immutable Web App](https://immutablewebapps.org/) concept of _Static assets are independent of the web application environments(s)_.

## Why?

Typically in a single page web application, you would have an `index.html` similar to the following:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Favicon, meta attributes, etc. -->
  </head>
  <body>
    <!-- Where your application renders, e.g. for React -->
    <div id="root"></div>

    <!-- Pull in your application bundles -->
    <script type="module" src="http://example.com/my-application.es.js"></script>
    <script nomodule src="http://example.com/my-application.umd.js"></script>
  </body>
</html>
```

In an immutable web app, you would want to server render this HTML, dynamically replacing `http://example.com` with the URL of your current bundles.

This has several advantages for your application bundles:

- They are separated from your application environment
  - The bundle can be switched out by changing a setting on your backend, which makes deploying new frontends very simple
- They do not need to include any environment-specific configuration
  - Your server can render this configuration directly in the HTML, e.g. in a script tag in the `<head>` that sets some environment-specific configuration on `window` which your application can pick up
  - You do not need a build of your application for each of dev, staging, production and there are no environment variables baked into your bundles (e.g. like `REACT_APP_*`)

This is great for deployments, but in development it is also very convenient to run your frontend locally (e.g. `npm run start` with Create React App), and then use your local frontend directly in your deployed environments.

This package provides a simple management layer for a CDN cookie, which can be switched on the fly by changing a URL parameter and lets you specify what bundles you would like pull in from the CDN.

## How to use

Once configured, you can add the `cdn` parameter to any URL in your frontend application to switch CDNs on the fly:

```
&cdn=https://some-other-cdn.com
```

You will be prompted to change the CDN and the cookie will be modified.

To revert to the default CDN / clear the cookie, use:

```
&cdn=none
```

## Getting Started

Install the package:

```bash
npm i @saasquatch/immutable-cdn
```

Pull the package into your HTML from your favourite `npm` package CDN and initialize:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Favicon, meta attributes, etc. -->
    <script src="https://unpkg.com/@saasquatch/immutable-cdn@latest/dist/immutable-cdn.umd.production.min.js"></script>
  </head>
  <body>
    <!-- Initialise the CDN -->
    <script>
      window.CDN.init({
        defaultCdn: "http://example.com",
        cookieName: "CDN" // Defaults to 'CDN'
      });
    </script>

    <!-- Where your application renders, e.g. for React -->
    <div id="root"></div>

    <!-- Pull in your application bundles -->
    <script type="module" src="http://example.com/my-application.es.js"></script>
    <script nomodule src="http://example.com/my-application.umd.js"></script>
  </body>
</html>
```

In the server rendered HTML case, this is all you have to do - the cookie `CDN` will be provided to your server and it can use this to dynamically change the URL of any resources your frontend will need when it renders the HTML.

## Client-specified resources

If you want to dynamically add resources to your HTML from your CDN client-side, you can specify the `tags` options with a list of tags and their attributes. Any string attribute containing the special identifier `%cdn%` will have it replaced with the actual value of your CDN cookie.

For example:

```js
window.CDN.init({
  defaultCdn: "example.com",
  tags: [
    { tag: "link", attrs: { rel: "stylesheet", href: "%cdn%/style.css" } },
    { tag: "script", attrs: { type: "module", src: "%cdn%/my-app.es.js" } },
    { tag: "script", attrs: { nomodule: true, src: "%cdn%/my-app.umd.js" } }
  ]
});
```

Would append the following HTML to your body:

```html
<link rel="stylesheet" href="http://example.com/style.css">
<script type="module" src="http://example.com/my-app.es.js"></script>
<script nomodule="true" src="http://example.com/my-app.umd.js"></script>
```

If you would rather append something to the `<head>` instead of the `<body>` you can use the `appendTo` property:

```js
{
    tag: "link",
    appendTo: "head",
    attrs: { rel: "stylesheet", href: "%cdn%/style.css" }
}
```

## Current CDN value

If you need to know the current value of the CDN cookie at any point, you can use:

```
window.CDN.get()
```
