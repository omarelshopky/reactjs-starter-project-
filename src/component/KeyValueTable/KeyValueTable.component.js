/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import RadioButton from "component/RadioButtonIcon";

import "./KeyValueTable.style.scss";

/** @namespace Component/KeyValueTable/Component */
export class KeyValueTable extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        isSelected: PropTypes.bool
    };

    static defaultProps = {
        title: "",
        isSelected: false
    };

    classList = cn("KeyValueTable");

    get dataPairArray() {
        return [
            /**
             * {
             *     key: 'id',
             *     label': 'Identifier',
             *     source: customer
             * }
             */
        ];
    }

    getValueFromSource({ key, source }) {
        const { [key]: value } = source;

        return Array.isArray(value) ? value.join(", ") : value;
    }

    renderTableRow = (data) => {
        const { key, label } = data;
        const value = this.getValueFromSource(data);

        if (!value) {
            return null;
        }

        return (
            <tr key={ key }>
                <th>{ label }</th>
                <td>{ value }</td>
            </tr>
        );
    };

    renderHeading() {
        const { title, isSelected } = this.props;
        if (!title) {
            return null;
        }

        return (
            <tr>
                <th
                    className={ this.classList("Heading") }
                    colSpan={ 2 }
                >
                    { title }
                    <RadioButton isActive={ isSelected } />
                </th>
            </tr>
        );
    }

    renderTable() {
        return (
            <div className={ this.classList("Wrapper") }>
                <table className={ this.classList() }>
                    <thead>
                        { this.renderHeading() }
                    </thead>
                    <tbody>
                        { this.dataPairArray.map(this.renderTableRow) }
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return this.renderTable();
    }
}

export default KeyValueTable;
