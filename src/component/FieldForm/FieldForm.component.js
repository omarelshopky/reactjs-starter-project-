/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */

import { cn } from "@bem-react/classname";
import { PureComponent } from "react";

import Field from "component/Field";
import Form from "component/Form";

import "./FieldForm.style.scss";

/** @namespace Component/FieldForm/Component */
export class FieldForm extends PureComponent {
    classList = cn("FieldForm");

    onFormSuccess() {
        // TODO: implement
    }

    get fieldMap() {
        return {
            /*
             * Email: {
             *     label: __('Email'),
             *     validation: ['notEmpty']
             * }
             */
        };
    }

    getDefaultValues([key, props]) {
        const {
            type = "text",
            onChange = () => {},
            ...otherProps
        } = props;

        return {
            ...otherProps,
            key,
            name: key,
            id: key,
            type,
            onChange
        };
    }

    renderField = (fieldEntry) => {
        const {
            key = null,
            isSubmitted,
            id = null,
            label = null,
            name = null,
            onChange = null,
            placeholder = null,
            type = null,
            validateSeparately,
            validation = [],
            value = null,
            selectOptions = [],
            checked = null,
            ariaLabel = null
        } = this.getDefaultValues(fieldEntry);

        return (
            <Field
                id={ id }
                key={ key }
                label={ label }
                name={ name }
                onChange={ onChange }
                placeholder={ placeholder }
                type={ type }
                validateSeparately={ validateSeparately }
                validation={ validation }
                value={ value }
                isSubmitted={ isSubmitted }
                selectOptions={ selectOptions }
                checked={ checked }
                ariaLabel={ ariaLabel }
            />
        );
    };

    renderFields() {
        return (
            <div className={ this.classList("Fields") }>
                { Object.entries(this.fieldMap).map(this.renderField) }
            </div>
        );
    }

    renderActions() {
        return null;
    }

    render() {
        return (
            <Form
                onSubmitSuccess={ this.onFormSuccess }
                mix={ { block: "FieldForm" } }
            >
                { this.renderFields() }
                { this.renderActions() }
            </Form>
        );
    }
}

export default FieldForm;
