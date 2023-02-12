/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { activeTabType, tabMapType } from "type/Account";

import MyAccountTabList from "./MyAccountTabList.component";

export const MyAccountDispatcher = import(
    /* WebpackMode: "lazy", webpackChunkName: "dispatchers" */
    "store/MyAccount/MyAccount.dispatcher"
);

/** @namespace Component/MyAccountTabList/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/MyAccountTabList/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    logout: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.logout(false, dispatch)
    )
});

/** @namespace Component/MyAccountTabList/Container */
export class MyAccountTabListContainer extends PureComponent {
    static propTypes = {
        onSignOut: PropTypes.func,
        logout: PropTypes.func.isRequired,
        tabMap: tabMapType.isRequired,
        activeTab: activeTabType.isRequired,
        changeActiveTab: PropTypes.func.isRequired
    };

    static defaultProps = {
        onSignOut: () => {}
    };

    containerFunctions = {
        handleLogout: this.handleLogout.bind(this)
    };

    containerProps() {
        const {
            tabMap,
            activeTab,
            changeActiveTab
        } = this.props;

        return {
            tabMap,
            activeTab,
            changeActiveTab
        };
    }

    handleLogout() {
        const { onSignOut, logout } = this.props;

        logout();
        onSignOut();
    }

    render() {
        return (
            <MyAccountTabList
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountTabListContainer);
