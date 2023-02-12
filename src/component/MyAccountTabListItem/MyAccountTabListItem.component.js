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

import ChevronIcon from "component/ChevronIcon";
import { tabType } from "type/Account";

import "./MyAccountTabListItem.style.scss";

/** @namespace Component/MyAccountTabListItem/Component */
export class MyAccountTabListItem extends PureComponent {
    static propTypes = {
        tabEntry: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                tabType
            ])
        ).isRequired,
        isActive: PropTypes.bool,
        changeActiveTab: PropTypes.func.isRequired
    };

    static defaultProps = {
        isActive: false
    };

    classList = cn("MyAccountTabListItem");

    changeActiveTab = () => {
        const { changeActiveTab, tabEntry: [key] } = this.props;
        changeActiveTab(key);
    };

    render() {
        const { tabEntry: [, { name }], isActive } = this.props;

        return (
            <li className={ this.classList("MyAccountTabListItem")({ isActive }) }>
                <button
                    className={ this.classList("MyAccountTabListItem", "Button") }
                    onClick={ this.changeActiveTab }
                    role="link"
                >
                    { name }
                    <ChevronIcon />
                </button>
            </li>
        );
    }
}

export default MyAccountTabListItem;
