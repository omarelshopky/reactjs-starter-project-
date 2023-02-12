/* eslint-disable no-unused-vars */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { PropTypes } from "prop-types";
import { PureComponent } from "react";

import FieldInput from "./FieldInput.component";

/** @namespace Component/FieldInput/Container */
export class FieldInputContainer extends PureComponent {
    static propTypes = {
        isDisabled: PropTypes.bool,
        autocomplete: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        type: PropTypes.string.isRequired,
        skipValue: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        ariaLabel: PropTypes.string
    };

    static defaultProps = {
        value: "",
        autocomplete: "off",
        isDisabled: false,
        skipValue: false,
        ariaLabel: ""
    };

    getAutocomplete() {
        const { autocomplete, type } = this.props;

        /**
         * Make sure password auto-complete is enabled
         */
        if (type === "password" && autocomplete === "off") {
            return "current-password";
        }

        return autocomplete;
    }

    containerProps = () => {
        const {
            /* eslint-disable react/prop-types */
            dispatch,
            selectOptions,
            isControlled,
            handleChange,
            onChangeCheckbox,
            onKeyEnterDown,
            formRefMap,
            validationStatus,
            subLabel,
            fileExtensions,
            customValidationStatus,
            isLabelWithArrow,

            // Props to be transformed
            isDisabled: disabled,
            autocomplete,
            skipValue,
            ariaLabel,

            // Props that are passed correctly from the beginning
            ...validProps
        } = this.props;

        const ariaLabelProp = ariaLabel ? { "aria-label": ariaLabel } : {};

        return {
            ...validProps,
            ...ariaLabelProp,
            disabled,
            "data-skip-value": skipValue,
            autoComplete: this.getAutocomplete()
        };
    };

    render() {
        return (
            <FieldInput { ...this.containerProps() } />
        );
    }
}

export default FieldInputContainer;
