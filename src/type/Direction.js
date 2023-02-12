/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";

import {
    BOTTOM,
    LEFT,
    RIGHT,
    TOP
} from "component/ChevronIcon/ChevronIcon.config";

// eslint-disable-next-line import/prefer-default-export
export const DirectionType = PropTypes.oneOf([RIGHT, LEFT, TOP, BOTTOM]);
