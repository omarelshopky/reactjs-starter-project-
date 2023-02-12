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

import ExpandableContent from "component/ExpandableContent";
import MyAccountTabListItem from "component/MyAccountTabListItem";
import { activeTabType, tabMapType } from "type/Account";
import { isSignedIn } from "util/Auth";

import "./MyAccountTabList.style.scss";

/** @namespace Component/MyAccountTabList/Component */
export class MyAccountTabList extends PureComponent {
    static propTypes = {
        tabMap: tabMapType.isRequired,
        activeTab: activeTabType.isRequired,
        handleLogout: PropTypes.func.isRequired,
        changeActiveTab: PropTypes.func.isRequired
    };

    state = {
        isContentExpanded: false
    };

    toggleExpandableContent = () => {
        this.setState(({ isContentExpanded }) => ({ isContentExpanded: !isContentExpanded }));
    };

    onTabClick = (key) => {
        const { changeActiveTab } = this.props;
        if (!isSignedIn()) {
            return;
        }
        this.toggleExpandableContent();
        changeActiveTab(key);
    };

    renderTabListItem = (tabEntry) => {
        const { activeTab } = this.props;
        const [key] = tabEntry;

        return (
            <MyAccountTabListItem
                key={ key }
                isActive={ activeTab === key }
                changeActiveTab={ this.onTabClick }
                tabEntry={ tabEntry }
            />
        );
    };

    renderLogoutTab() {
        const { handleLogout } = this.props;

        return (
            <li
                key="logout"
                className="MyAccountTabListItem"
            >
                <button
                    className={ cn("MyAccountTabListItem", "Button") }
                    onClick={ handleLogout }
                    role="link"
                >
                    { "Logout" }
                </button>
            </li>
        );
    }

    render() {
        const { tabMap, activeTab } = this.props;
        const { isContentExpanded } = this.state;
        const { name } = tabMap[activeTab];

        const tabs = [
            ...Object.entries(tabMap).map(this.renderTabListItem),
            this.renderLogoutTab()
        ];

        return (
            <ExpandableContent
                heading={ name }
                isContentExpanded={ isContentExpanded }
                onClick={ this.toggleExpandableContent }
                mix={ { block: "MyAccountTabList" } }
                mods={ { isWithoutBorder: true } }
            >
                <ul>
                    { tabs }
                </ul>
            </ExpandableContent>
        );
    }
}

export default MyAccountTabList;
