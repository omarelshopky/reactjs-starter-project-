/* eslint-disable max-lines */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import AddIcon from "component/AddIcon";
import ChevronIcon from "component/ChevronIcon";
import { BOTTOM } from "component/ChevronIcon/ChevronIcon.config";
import FieldInput from "component/FieldInput";
import FieldSelect from "component/FieldSelect";
import FieldTextarea from "component/FieldTextarea";
import MinusIcon from "component/MinusIcon";
import UploadIcon from "component/UploadIcon";
import { MixType } from "type/Common";

import {
    CHECKBOX_TYPE,
    EMAIL_TYPE,
    FILE_TYPE,
    NUMBER_TYPE,
    PASSWORD_TYPE,
    RADIO_TYPE,
    SELECT_TYPE,
    TEXTAREA_TYPE
} from "./Field.config";

import "./Field.style.scss";

/**
 * Input fields component
 * @class Field
 * @namespace Component/Field/Component
 */
export class Field extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        onChangeCheckbox: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
        onKeyPress: PropTypes.func.isRequired,
        onKeyEnterDown: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        message: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        validation: PropTypes.arrayOf(PropTypes.string).isRequired,
        validationStatus: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        checked: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        mix: MixType,
        min: PropTypes.number,
        max: PropTypes.number,
        filename: PropTypes.string,
        fileExtensions: PropTypes.string,
        subLabel: PropTypes.number,
        disabled: PropTypes.bool,
        isLabelWithArrow: PropTypes.bool,
        step: PropTypes.number
    };

    static defaultProps = {
        min: 1,
        max: 99,
        checked: false,
        mix: {},
        label: "",
        value: null,
        message: "",
        validationStatus: null,
        filename: "",
        fileExtensions: "",
        subLabel: null,
        disabled: false,
        isLabelWithArrow: false,
        step: 1
    };

    classList = cn("Field");

    renderTextarea() {
        return (
            <FieldTextarea
                { ...this.props }
            />
        );
    }

    /**
     * Render Type Text, default value is passed from parent
     * handleToUpdate used to pass child data to parent
     */
    renderTypeText() {
        return (
            <FieldInput
                { ...this.props }
                type="text"
            />
        );
    }

    renderTypeEmail() {
        return (
            <FieldInput
                { ...this.props }
                type="email"
            />
        );
    }

    renderTypePassword() {
        return (
            <FieldInput
                { ...this.props }
                type="password"
            />
        );
    }

    renderTypeNumber() {
        const {
            min,
            max,
            value,
            onKeyEnterDown,
            handleChange,
            step
        } = this.props;

        return (
            <>
                <FieldInput
                    { ...this.props }
                    type="number"
                    readOnly
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={ (e) => handleChange(e.target.value, false) }
                    onKeyDown={ onKeyEnterDown }
                    aria-label={ "Value" }
                />
                <button
                    disabled={ +value === max }
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={ () => handleChange(+value + step) }
                    aria-label={ "Add" }
                >
                    <AddIcon block="SubtractButton" isPrimary />
                </button>
                <button
                    disabled={ +value === min }
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={ () => handleChange(+value - step) }
                    aria-label={ "Subtract" }
                >
                    <MinusIcon block="AddButton" isPrimary />
                </button>
            </>
        );
    }

    renderCheckbox() {
        const {
            id,
            onChangeCheckbox,
            label,
            subLabel,
            disabled
        } = this.props;

        return (
            <label htmlFor={ id } className={ this.classList("CheckboxLabel") }>
                <FieldInput
                    { ...this.props }
                    type="checkbox"
                    onChange={ onChangeCheckbox }
                    isDisabled={ disabled }
                />
                <div className="input-control" />
                <span>
                    { label }
                    { subLabel && (
                        <strong className={ this.classList("SubLabel") }>
                            { ` (${subLabel})` }
                        </strong>
                    ) }
                </span>
            </label>
        );
    }

    renderFile() {
        const {
            filename,
            id,
            onChange,
            fileExtensions
        } = this.props;

        return (
            <>
                <FieldInput
                    { ...this.props }
                    type="file"
                    onChange={ onChange }
                />
                { this.renderLabelForFile(id, filename) }
                <p>
                    { "Compatible file extensions to upload: " }
                    <b>{ fileExtensions }</b>
                </p>
            </>
        );
    }

    renderRadioButton() {
        const {
            id,
            label,
            onClick
        } = this.props;

        return (
            <label htmlFor={ id }>
                <FieldInput
                    { ...this.props }
                    type="radio"
                    onChange={ onClick }
                />
                <div className="input-control" />
                { label }
            </label>
        );
    }

    renderSelectWithOptions() {
        return (
            <FieldSelect
                { ...this.props }
            />
        );
    }

    // eslint-disable-next-line complexity
    renderInputOfType(type) {
        switch (type) {
        case CHECKBOX_TYPE:
            return this.renderCheckbox();
        case RADIO_TYPE:
            return this.renderRadioButton();
        case NUMBER_TYPE:
            return this.renderTypeNumber();
        case TEXTAREA_TYPE:
            return this.renderTextarea();
        case PASSWORD_TYPE:
            return this.renderTypePassword();
        case SELECT_TYPE:
            return this.renderSelectWithOptions();
        case EMAIL_TYPE:
            return this.renderTypeEmail();
        case FILE_TYPE:
            return this.renderFile();
        default:
            return this.renderTypeText();
        }
    }

    renderLabelForFile(id, filename = "") {
        if (filename) {
            return (
                <label htmlFor={ id }>
                    <p>{ filename }</p>
                </label>
            );
        }

        return (
            <label htmlFor={ id }>
                <UploadIcon />
                <p>{ "Drop files here or" }</p>
                <span>{ "Select files" }</span>
            </label>
        );
    }

    renderArrow() {
        const { isLabelWithArrow } = this.props;

        if (!isLabelWithArrow) {
            return null;
        }

        return <ChevronIcon direction={ BOTTOM } />;
    }

    renderLabel() {
        const {
            id,
            label,
            validation,
            type
        } = this.props;
        const isRequired = validation.includes("notEmpty");
        const noRenderLabel = type === CHECKBOX_TYPE || type === RADIO_TYPE;

        if (!label || noRenderLabel) {
            return null;
        }

        return (
            <div className={ this.classList("LabelContainer") }>
                <label
                    className={ this.classList("Label", {isRequired}) }
                    htmlFor={ id }
                >
                    { label }
                </label>

                { this.renderArrow() }
            </div>
        );
    }

    renderMessage() {
        const { message } = this.props;

        if (!message) {
            return null;
        }

        return (
            <p className={ this.classList("Message") }>
                { message }
            </p>
        );
    }

    render() {
        const {
            mix,
            type,
            message,
            validationStatus
        } = this.props;

        const mixClass = cn(mix.block);

        return (
            <div
                className={ this.classList("", {
                    type,
                    hasError: validationStatus === false || !!message,
                    isValid: validationStatus === true
                }, [mixClass(mix.elem, mix.mods)]) }
            >
                { this.renderLabel() }
                { this.renderInputOfType(type) }
                { this.renderMessage() }
            </div>
        );
    }
}

export default Field;
