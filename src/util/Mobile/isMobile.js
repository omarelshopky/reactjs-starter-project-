/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
export const isUsingClientHints = "userAgentData" in navigator;

export const isMobile = {
    android: (agent = navigator.userAgent) => /android/i.test(agent),
    blackBerry: (agent = navigator.userAgent) => /blackberry/i.test(agent),
    iOS: (agent = navigator.userAgent) => /iphone|ipod|ipad/i.test(agent),
    opera: (agent = navigator.userAgent) => /opera mini/i.test(agent),
    // See https://developer.chrome.com/docs/multidevice/user-agent/ for details
    safari: (agent = navigator.userAgent) => /safari/i.test(agent)
        && !/chrome/i.test(agent)
        && !/CriOS/i.test(agent)
        && !/FxiOS/i.test(agent),
    windows: (agent = navigator.userAgent) => /iemobile/i.test(agent),
    // IPad uses 810 so we need to handle that.
    any: () => window.matchMedia("(max-width: 810px)").matches,
    standaloneMode: () => window.matchMedia("(display-mode: standalone)").matches
};

// https://medium.com/@galmeiri/get-ready-for-chrome-user-agent-string-phase-out-c6840da1c31e
export const isMobileClientHints = {
    getDeviceData: () => navigator.userAgentData.getHighEntropyValues(["platform", "model"])
};

export default isMobile;
