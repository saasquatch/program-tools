const containers: HTMLElement[] = []; // will store container HTMLElement references
const styleElements: HTMLStyleElement[] = []; // will store {prepend: HTMLElement, append: HTMLElement}

const usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

interface Options{
    prepend?: boolean;
    container?: HTMLElement;
}

export function insertCSS(css:string, options?: Options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {} as HTMLStyleElement;
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement:HTMLStyleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    styleElement.textContent += css;

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}