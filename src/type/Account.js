/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import PropTypes from "prop-types";

export const addressType = PropTypes.shape({
    customer_id: PropTypes.number,
    firstname: PropTypes.string,
    id: PropTypes.number,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    postcode: PropTypes.string,
    prefix: PropTypes.string,
    street: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    suffix: PropTypes.string,
    telephone: PropTypes.string
});

export const addressesType = PropTypes.arrayOf(addressType);

export const customerType = PropTypes.shape({
    addressesType,
    created_at: PropTypes.string,
    dob: PropTypes.date,
    email: PropTypes.string,
    firstname: PropTypes.string,
    group_id: PropTypes.number,
    id: PropTypes.number,
    is_subscribed: PropTypes.bool,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string
});

export const DASHBOARD = "dashboard";

export const activeTabType = PropTypes.string;

export const tabType = PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string
});

export const tabMapType = PropTypes.objectOf(tabType);

export const signInStateType = PropTypes.string;
