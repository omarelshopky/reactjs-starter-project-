/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Component, lazy, Suspense } from "react";

import ContentWrapper from "component/ContentWrapper";
import Loader from "component/Loader/Loader.component";
import MyAccountOverlay from "component/MyAccountOverlay";
import MyAccountTabList from "component/MyAccountTabList";
import {
    activeTabType,
    DASHBOARD,
    tabMapType
} from "type/Account";
import { isSignedIn } from "util/Auth";

import "./MyAccount.style.scss";


export const MyAccountDashboard = lazy(() => import(
    /* WebpackMode: "lazy", webpackChunkName: "account-dashboard" */
    "component/MyAccountDashboard"
));


/** @namespace Route/MyAccount/Component */
export class MyAccount extends Component {
    static propTypes = {
        activeTab: activeTabType.isRequired,
        tabMap: tabMapType.isRequired,
        changeActiveTab: PropTypes.func.isRequired,
        onSignIn: PropTypes.func.isRequired,
        onSignOut: PropTypes.func.isRequired,
        isEditingActive: PropTypes.bool.isRequired,
        subHeading: PropTypes.string
    };

    static defaultProps = {
        subHeading: ""
    };

    renderMap = {
        [DASHBOARD]: MyAccountDashboard
    };

    classList = cn("MyAccount");

    shouldComponentUpdate(nextProps) {
        const { activeTab } = this.props;
        const { activeTab: nextActiveTab } = nextProps;

        return activeTab !== nextActiveTab;
    }

    renderLoginOverlay() {
        const { onSignIn } = this.props;

        return (
            <MyAccountOverlay
                onSignIn={ onSignIn }
            />
        );
    }

    renderSubHeading() {
        const { subHeading } = this.props;

        if (!subHeading) {
            return null;
        }

        return <span className={ this.classList("SubHeading") }>{ subHeading }</span>;
    }

    renderContent() {
        const {
            activeTab,
            tabMap,
            changeActiveTab,
            onSignOut,
            isEditingActive
        } = this.props;

        if (!isSignedIn()) {
            return this.renderLoginOverlay();
        }

        const TabContent = this.renderMap[activeTab];
        const { name } = tabMap[activeTab];

        return (
            <ContentWrapper
                label={ "My Account page" }
                wrapperMix={ { block: "MyAccount", elem: "Wrapper" } }
            >
                <MyAccountTabList
                    tabMap={ tabMap }
                    activeTab={ activeTab }
                    changeActiveTab={ changeActiveTab }
                    onSignOut={ onSignOut }
                />
                <div className={ this.classList("TabContent") }>
                    <h2 lassName={ this.classList("Heading") }>
                        { name }
                        { this.renderSubHeading() }
                    </h2>
                    <Suspense fallback={ <Loader /> }>
                        <TabContent isEditingActive={ isEditingActive } />
                    </Suspense>
                </div>
            </ContentWrapper>
        );
    }

    render() {
        return (
            <main className={ this.classList() }>
                { this.renderContent() }
            </main>
        );
    }
}

export default MyAccount;
