/* eslint-disable max-lines */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";

import validationConfig from "component/Form/Form.config";
import { MixType } from "type/Common";

import Field from "./Field.component";
import {
    CHECKBOX_TYPE,
    EMAIL_TYPE,
    ENTER_KEY_CODE,
    FILE_TYPE,
    NUMBER_TYPE,
    PASSWORD_TYPE,
    RADIO_TYPE,
    SELECT_TYPE,
    TEXT_TYPE,
    TEXTAREA_TYPE,
    VALIDATION_STATUS
} from "./Field.config";

/** @namespace Component/Field/Container */
export class FieldContainer extends PureComponent {
    static propTypes = {
        isControlled: PropTypes.bool,
        checked: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        type: PropTypes.oneOf([
            TEXT_TYPE,
            NUMBER_TYPE,
            TEXTAREA_TYPE,
            PASSWORD_TYPE,
            RADIO_TYPE,
            CHECKBOX_TYPE,
            SELECT_TYPE,
            FILE_TYPE,
            EMAIL_TYPE
        ]).isRequired,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onClick: PropTypes.func,
        onKeyPress: PropTypes.func,
        min: PropTypes.number,
        max: PropTypes.number,
        validation: PropTypes.arrayOf(PropTypes.string),
        message: PropTypes.string,
        customValidationStatus: PropTypes.oneOf(Object.values(VALIDATION_STATUS)),
        id: PropTypes.string,
        formRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        formRefMap: PropTypes.object,
        validateSeparately: PropTypes.bool,
        isSubmitted: PropTypes.bool,
        disabled: PropTypes.bool,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        placeholder: PropTypes.string,
        subLabel: PropTypes.number,
        filename: PropTypes.string,
        fileExtensions: PropTypes.string,
        mix: MixType,
        selectOptions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        })),
        name: PropTypes.string.isRequired,
        autocomplete: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        ariaLabel: PropTypes.string,
        isLabelWithArrow: PropTypes.bool,
        step: PropTypes.number
    };

    static defaultProps = {
        min: 1,
        max: 99,
        checked: false,
        value: null,
        onChange: () => {},
        onFocus: () => {},
        onBlur: () => {},
        onClick: () => {},
        onKeyPress: () => {},
        formRef: () => {},
        isControlled: false,
        validation: [],
        message: "",
        customValidationStatus: null,
        id: "",
        formRefMap: {},
        validateSeparately: false,
        isSubmitted: false,
        disabled: false,
        label: "",
        placeholder: "",
        subLabel: null,
        ariaLabel: "",
        mix: {},
        filename: "",
        fileExtensions: "",
        selectOptions: [],
        autocomplete: "off",
        isLabelWithArrow: false,
        step: 1
    };

    containerFunctions = {
        onChange: this.onChange.bind(this),
        handleChange: this.handleChange.bind(this),
        onChangeCheckbox: this.onChangeCheckbox.bind(this),
        onFocus: this.onFocus.bind(this),
        onKeyPress: this.onKeyPress.bind(this),
        onKeyEnterDown: this.onKeyEnterDown.bind(this),
        onClick: this.onClick.bind(this)
    };

    constructor(props) {
        super(props);

        const { checked } = props;
        const value = this.getInitialPropsValue();

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = {
            value,
            checked,
            validationMessage: "",
            validationStatus: null,
            eventId: ""
        };
    }

    // eslint-disable-next-line complexity
    componentDidUpdate(prevProps) {
        const { value: prevValue, checked: prevChecked, isSubmitted: prevSubmitted } = prevProps;
        const {
            value: currentValue,
            checked: currChecked,
            type,
            id,
            validateSeparately,
            isSubmitted
        } = this.props;
        const { eventId } = this.state;

        if (prevValue !== currentValue) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ value: currentValue });
        }
        if (type === CHECKBOX_TYPE && currChecked !== prevChecked) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ checked: currChecked });
        }

        // Prevents validating all fields when entering data in only one of them
        if (eventId === id || prevSubmitted !== isSubmitted || !validateSeparately) {
            this.updateValidationStatus();
            this.setValidationMessage(prevProps);
        }
    }

    setValidationMessage(prevProps) {
        const { message: prevMessage = {} } = prevProps;
        const { message = {} } = this.props;
        const { validationMessage = {} } = this.state;

        if (message !== validationMessage && !prevMessage && message) {
            this.setState({ validationMessage: message });
        }
    }

    getInitialPropsValue() {
        const { type, value } = this.props;

        if (value) {
            return value;
        }

        switch (type) {
        case NUMBER_TYPE:
            return 0;
        case CHECKBOX_TYPE:
            return false;
        default:
            return "";
        }
    }

    containerProps() {
        const {
            autocomplete,
            checked: propsChecked,
            customValidationStatus,
            disabled,
            fileExtensions,
            formRef,
            formRefMap,
            id,
            label,
            placeholder,
            max,
            min,
            mix,
            name,
            selectOptions,
            subLabel,
            type,
            validation,
            ariaLabel,
            isLabelWithArrow,
            step
        } = this.props;

        const {
            checked,
            value,
            validationStatus,
            validationMessage,
            filename
        } = this.state;

        return {
            autocomplete,
            checked: type === CHECKBOX_TYPE ? propsChecked : checked,
            customValidationStatus,
            disabled,
            fileExtensions,
            filename,
            formRef,
            formRefMap,
            id,
            label,
            ariaLabel,
            placeholder,
            max,
            message: validationMessage,
            min,
            mix,
            name,
            selectOptions,
            subLabel,
            type,
            validation,
            validationStatus: customValidationStatus ?? validationStatus,
            value,
            isLabelWithArrow,
            step
        };
    }

    // eslint-disable-next-line complexity
    validateField() {
        const {
            validation,
            id,
            formRef: refMap,
            formRefMap
        } = this.props;

        if (!validation || !id || !refMap || !refMap.current) {
            return {};
        }

        const { current: inputNode } = refMap || {};

        if (!inputNode) {
            return {};
        }

        // We are looking for validation and executing it
        const rule = validation.find((rule) => {
            if (!validationConfig[rule]) {
                return false;
            }

            const validationRules = validationConfig[rule];
            const isValid = validationRules.validate(inputNode, formRefMap);

            return !isValid;
        });

        return validationConfig[rule] || {};
    }

    updateValidationStatus() {
        const validationRule = this.validateField();

        this.setState({
            validationStatus: !validationRule.validate,
            validationMessage: validationRule.message
        });
    }

    onChange(event) {
        const { type } = this.props;
        this.setState({ eventId: event?.target?.name });

        if (typeof event === "string" || typeof event === "number") {
            return this.handleChange(event);
        }

        if (event.currentTarget.value.length <= 0) {
            this.setState({
                validationStatus: null
            });
        }

        this.updateValidationStatus();

        if (type === FILE_TYPE) {
            return this.handleChange(event.target.value, false, event.target.files[0]);
        }

        return this.handleChange(event.target.value);
    }

    onChangeCheckbox(event) {
        const { onChange } = this.props;
        const { target: { checked, value } } = event;

        if (onChange) {
            onChange(value, checked);
        }

        this.setState({ checked });
    }

    onFocus(event) {
        const { onFocus } = this.props;

        if (onFocus) {
            onFocus(event);
        }
    }

    onBlur(event) {
        const { onBlur } = this.props;

        if (onBlur) {
            onBlur(event);
        }
    }

    onKeyPress(event) {
        const { onKeyPress } = this.props;

        if (onKeyPress) {
            onKeyPress(event);
        }
    }

    onKeyEnterDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            const value = event.target.value || 1;
            this.handleChange(value);
        }
    }

    onClick(event, selectValue = false) {
        const { onClick } = this.props;

        if (selectValue) {
            event.target.select();
        }
        if (onClick) {
            onClick(event);
        }
    }

    // eslint-disable-next-line complexity
    handleChange(value, shouldUpdate = true, fileValue = false) {
        const {
            isControlled,
            onChange,
            type,
            min,
            max
        } = this.props;

        switch (type) {
        case NUMBER_TYPE:
            if (min > value || value > max || Number.isNaN(parseInt(value, 10))) {
                break;
            }
            if (onChange && shouldUpdate) {
                onChange(value);
            }
            if (!isControlled) {
                this.setState({ value });
            }
            break;
        case FILE_TYPE:
            if (value) {
                const result = onChange && onChange(fileValue);

                this.setState({
                    value: result ? value : "",
                    filename: result ? value.substr(value.lastIndexOf("\\") + 1) : ""
                });
            }

            break;
        default:
            if (onChange) {
                onChange(value);
            }
            if (!isControlled) {
                this.setState({ value });
            }
        }
    }

    render() {
        return (
            <Field
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default FieldContainer;
