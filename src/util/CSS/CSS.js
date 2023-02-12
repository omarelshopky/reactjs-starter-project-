/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

/**
 * Set of helpers related to CSS
 * @class CSS
 * @namespace Util/CSS
 */
export class CSS {
    /**
     * Change CSS custom property in referenced node scope
     * @static
     * @param  {HTMLElement} ref React reference to an HTML element (node).
     * @param  {String} name CSS variable name (without `--`).
     * @param  {String} value CSS variable value.
     * @return {void}
     * @memberof CSS
     */
    static setVariable(ref, name, value) {
        if (ref && ref.current) {
            ref.current.style.setProperty(`--${name}`, value);
        }
    }
}

/** @namespace Util/CSS/getHeight */
export const getElementHeight = (id) => Array.from(
    document.getElementsByClassName(id)
).reduce((acc, item) => {
    const { offsetHeight } = item;

    return acc + offsetHeight;
}, 0);

/** @namespace Util/CSS/getFixedElementHeight */
export const getFixedElementHeight = () => {
    const top = getElementHeight("FixedElement-Top");
    const bottom = getElementHeight("FixedElement-Bottom");

    return {
        total: top + bottom,
        top,
        bottom
    };
};

/** @namespace Util/CSS/isRtl */
export const isRtl = () => document.documentElement.getAttribute("dir") === "rtl";

export default CSS;
