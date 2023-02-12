/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";

export const DeviceType = PropTypes.shape({
    isMobile: PropTypes.bool,
    android: PropTypes.bool,
    ios: PropTypes.bool,
    blackberry: PropTypes.bool,
    opera: PropTypes.bool,
    safari: PropTypes.bool,
    windows: PropTypes.bool,
    standaloneMode: PropTypes.bool
});
