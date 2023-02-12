/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import ChevronIcon from "component/ChevronIcon";
import { BOTTOM, TOP } from "component/ChevronIcon/ChevronIcon.config";
import ClickOutside from "component/ClickOutside";

import "./FieldSelect.style.scss";

/** @namespace Component/FieldSelect/Component */
export class FieldSelect extends PureComponent {
    static propTypes = {
        handleSelectListOptionClick: PropTypes.func.isRequired,
        handleSelectExpand: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        handleSelectListKeyPress: PropTypes.func.isRequired,
        handleSelectExpandedExpand: PropTypes.func.isRequired,
        isSelectExpanded: PropTypes.bool.isRequired,
        selectOptions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            disabled: PropTypes.bool,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        })).isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        formRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]).isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]).isRequired,
        autocomplete: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]).isRequired,
        isDisabled: PropTypes.bool.isRequired,
        skipValue: PropTypes.bool.isRequired
    };

    classList = cn("FieldSelect");

    renderNativeSelect() {
        const {
            name,
            id,
            onChange,
            selectOptions,
            formRef,
            value,
            isDisabled,
            isSelectExpanded: isExpanded,
            autocomplete,
            skipValue
        } = this.props;

        return (
            <select
                className={ this.classList("Select", { isExpanded }) }
                autoComplete={ autocomplete }
                ref={ formRef }
                name={ name }
                id={ id }
                disabled={ isDisabled }
                tabIndex="0"
                value={ value || "" }
                onChange={ onChange }
                data-skip-value={ skipValue }
                aria-label={ "Select drop-down" }
            >
                { this.renderPlaceholder() }
                { selectOptions.map(this.renderNativeOption) }
            </select>
        );
    }

    renderNativeOption = (option) => {
        const {
            id,
            value,
            disabled,
            label,
            subLabel = ""
        } = option;

        return (
            <option
                key={ id }
                id={ id }
                value={ value }
                disabled={ disabled }
            >
                { `${label} ${subLabel}` }
            </option>
        );
    };

    renderPlaceholder() {
        const { placeholder } = this.props;

        if (!placeholder) {
            return null;
        }

        return (
            <option value="" label={ placeholder }>{ placeholder }</option>
        );
    }

    renderOption = (option) => {
        const {
            id,
            label,
            subLabel
        } = option;

        const {
            isSelectExpanded: isExpanded,
            handleSelectListOptionClick
        } = this.props;

        return (
            <li
                className={ this.classList("Option", { isExpanded }) }
                key={ id }
                /**
                 * Added 'o' as querySelector does not work with
                 * ids, that consist of numbers only
                 */
                id={ `o${id}` }
                role="menuitem"
                // eslint-disable-next-line react/jsx-no-bind
                onClick={ () => handleSelectListOptionClick(option) }
                // eslint-disable-next-line react/jsx-no-bind
                onKeyPress={ () => handleSelectListOptionClick(option) }
                tabIndex={ isExpanded ? "0" : "-1" }
            >
                { label }
                { subLabel && (
                    <strong>
                        { ` ${subLabel}` }
                    </strong>
                ) }
            </li>
        );
    };

    renderOptions() {
        const {
            selectOptions,
            isSelectExpanded: isExpanded
        } = this.props;

        return (
            <ul
                className={ this.classList("Options", { isExpanded }) }
                role="menu"
            >
                { selectOptions.map(this.renderOption) }
            </ul>
        );
    }

    render() {
        const {
            isSelectExpanded: isExpanded,
            handleSelectExpand,
            handleSelectListKeyPress,
            handleSelectExpandedExpand,
            id
        } = this.props;

        return (
            <ClickOutside onClick={ handleSelectExpandedExpand }>
                <div
                    id={ `${id}_wrapper` }
                    className={ this.classList({ isExpanded }) }
                    onClick={ handleSelectExpand }
                    onKeyPress={ handleSelectListKeyPress }
                    role="button"
                    tabIndex="0"
                    aria-label="Select dropdown"
                    aria-expanded={ isExpanded }
                >
                    <div block="FieldSelect" elem="Clickable">
                        { this.renderNativeSelect() }
                        <ChevronIcon direction={ isExpanded ? TOP : BOTTOM } />
                    </div>
                    { this.renderOptions() }
                </div>
            </ClickOutside>
        );
    }
}

export default FieldSelect;
