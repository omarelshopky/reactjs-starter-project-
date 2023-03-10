/* eslint-disable max-lines */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import {
    Children,
    cloneElement,
    createRef,
    PureComponent
} from "react";

import { FieldContainer } from "component/Field/Field.container";
import { ChildrenType, MixType } from "type/Common";
import FormPortalCollector from "util/FormPortalCollector";

import validationConfig from "./Form.config";

/** @namespace Component/Form/Component */
export class Form extends PureComponent {
    static propTypes = {
        onSubmitSuccess: PropTypes.func,
        onSubmitError: PropTypes.func,
        onSubmit: PropTypes.func,
        children: ChildrenType.isRequired,
        id: PropTypes.string,
        mix: MixType
    };

    static defaultProps = {
        onSubmitSuccess: () => {},
        onSubmitError: () => {},
        onSubmit: () => {},
        mix: {},
        id: ""
    };

    static updateChildrenRefs(props, state = {}) {
        const { children: propsChildren } = props;
        const { refMap: refMapState = {} } = state;

        const refMap = {};

        const children = Form.cloneChildren(
            propsChildren,
            (child) => {
                const { props: { name } } = child;
                const { message } = Object.keys(refMapState).length
                    ? Form.validateField(child, refMapState)
                    : {};

                refMap[name] = createRef();

                const childProps = {
                    formRef: refMap[name],
                    formRefMap: refMap
                };

                if (message) {
                    childProps.message = message;
                }

                return cloneElement(child, childProps);
            }
        );

        return { children, refMap };
    }

    static cloneChildren(originChildren, fieldCallback) {
        // eslint-disable-next-line complexity
        const executeClone = (originChildren) => Children.map(originChildren, (child) => {
            if (child && typeof child === "object" && child.type && child.props) {
                const { type: { name }, props, props: { children } } = child;

                if (name === FieldContainer.prototype.constructor.name) {
                    return fieldCallback(child);
                }

                if (typeof children === "object") {
                    return cloneElement(child, {
                        ...props,
                        children: executeClone(children)
                    });
                }

                return child;
            }

            return child;
        });

        return executeClone(originChildren);
    }

    static cloneAndValidateChildren(propsChildren, refMap) {
        const invalidFields = [];
        const children = Form.cloneChildren(
            propsChildren,
            (child) => {
                const { props: { id, name } } = child;
                const { message } = Form.validateField(child, refMap);

                if (message) {
                    invalidFields.push(id);

                    return cloneElement(child, {
                        message,
                        formRef: refMap[name]
                    });
                }

                return cloneElement(child, {
                    formRef: refMap[name]
                });
            }
        );

        return { children, fieldsAreValid: !invalidFields.length, invalidFields };
    }

    static validateField(field, refMap) {
        const { validation, id, name } = field.props;

        if (validation && id && refMap[name] && refMap[name].current) {
            const { current: inputNode } = refMap[name];

            const rule = validation.find((rule) => {
                if (!validationConfig[rule]) {
                    return false;
                }
                const validationRules = validationConfig[rule];
                const isValid = validationRules.validate(inputNode, refMap);

                return !isValid;
            });

            if (rule) {
                return validationConfig[rule];
            }
        }

        return {};
    }

    classList = cn("Form");

    constructor(props) {
        super(props);

        if (!window.formPortalCollector) {
            window.formPortalCollector = new FormPortalCollector();
        }

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = {
            ...Form.updateChildrenRefs(props),
            fieldsAreValid: true
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { refMap } = state;
        const { children } = props;

        return {
            ...Form.cloneAndValidateChildren(children, refMap),
            ...Form.updateChildrenRefs(props, state)
        };
    }

    handleFormSubmit = async (e) => {
        const {
            onSubmitSuccess,
            onSubmitError,
            onSubmit,
            id
        } = this.props;

        e.preventDefault();
        onSubmit();

        const portalData = id ? await window.formPortalCollector.collect(id) : [];

        const {
            invalidFields,
            inputValues
        } = portalData.reduce((acc, portalData) => {
            const {
                invalidFields = [],
                inputValues = {}
            } = portalData;

            const {
                invalidFields: initialInvalidFields,
                inputValues: initialInputValues
            } = acc;

            return ({
                invalidFields: [...initialInvalidFields, ...invalidFields],
                inputValues: { ...initialInputValues, ...inputValues }
            });
        }, this.collectFieldsInformation());

        const asyncData = Promise.all(portalData.reduce((acc, { asyncData }) => {
            if (!asyncData) {
                return acc;
            }

            return [...acc, asyncData];
        }, []));

        asyncData.then(
            /** @namespace Component/Form/Component/handleFormSubmitAsyncDataThen */
            (asyncDataList) => {
                if (!invalidFields.length) {
                    onSubmitSuccess(inputValues, asyncDataList);

                    return;
                }

                onSubmitError(inputValues, invalidFields);
            },
            /** @namespace Component/Form/Component/handleFormSubmitAsyncDataCatch */
            (e) => onSubmitError(inputValues, invalidFields, e)
        );
    };

    collectFieldsInformation = () => {
        const { refMap } = this.state;
        const { children: propsChildren } = this.props;

        const {
            children,
            fieldsAreValid,
            invalidFields
        } = Form.cloneAndValidateChildren(propsChildren, refMap);

        this.setState({ children, fieldsAreValid });

        const inputValues = Object.values(refMap).reduce((inputValues, input) => {
            const { current } = input;
            if (current && current.id && current.value) {
                const { name, value, checked } = current;

                if (current.dataset.skipValue === "true") {
                    return inputValues;
                }

                if (current.type === "checkbox") {
                    const boolValue = checked;

                    return { ...inputValues, [name]: boolValue };
                }

                return { ...inputValues, [name]: value };
            }

            return inputValues;
        }, {});

        if (invalidFields.length) {
            const { current } = refMap[invalidFields[0]];

            current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        return {
            inputValues,
            invalidFields
        };
    };

    render() {
        const { mix, id } = this.props;
        const { children, fieldsAreValid } = this.state;

        const mixClass = cn(mix.block);
        
        return (
            <form
                className={ this.classList({ isInvalid: !fieldsAreValid }, [mixClass(mix.elem, mix.mods)]) }
                ref={ (ref) => {
                    this.form = ref;
                } }
                id={ id }
                onSubmit={ this.handleFormSubmit }
            >
                { children }
            </form>
        );
    }
}

export default Form;
