/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

export const MIN_PASSWORD_LENGTH = 8;

/** @namespace Component/Form/Config/validateEmail */
export const validateEmail = ({ value }) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

/** @namespace Component/Form/Config/validateEmails */
export const validateEmails = ({ value }) => value.split(",").every((email) => validateEmail({ value: email.trim() }));

/** @namespace Component/Form/Config/validatePassword */
export const validatePassword = ({ value }) => value.length >= MIN_PASSWORD_LENGTH;

/** @namespace Component/Form/Config/validateTelephone */
export const validateTelephone = ({ value }) => value.length > 0 && value.match(/^\+?(?:[0-9-] ?){6,14}[0-9]$/);

/** @namespace Component/Form/Config/isNotEmpty */
export const isNotEmpty = ({ value }) => value.trim().length > 0;

/** @namespace Component/Form/Config/validatePasswordMatch */
export const validatePasswordMatch = ({ value }, { password }) => {
    const { current: { value: passwordValue } } = password || { current: {} };

    return value === passwordValue;
};

/** @namespace Component/Form/Config */
export const formConfig = () => ({
    email: {
        validate: validateEmail,
        message: "Email is invalid."
    },
    emails: {
        validate: validateEmails,
        message: "Email addresses are not valid"
    },
    password: {
        validate: validatePassword,
        message: "Password should be at least 8 characters long"
    },
    telephone: {
        validate: validateTelephone,
        message: "Phone number is invalid!"
    },
    notEmpty: {
        validate: isNotEmpty,
        message: "This field is required!"
    },
    password_match: {
        validate: validatePasswordMatch,
        message: "Password does not match."
    }
});

export default formConfig();
