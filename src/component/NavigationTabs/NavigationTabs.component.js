/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import HomeIcon from "component/HomeIcon";
import NavigationAbstract from "component/NavigationAbstract/NavigationAbstract.component";
import UserIcon from "component/UserIcon";
import { DeviceType } from "type/Device";

import {
    ACCOUNT_TAB,
    HOME_TAB
} from "./NavigationTabs.config";

import "./NavigationTabs.style.scss";

/** @namespace Component/NavigationTabs/Component */
export class NavigationTabs extends NavigationAbstract {
    static propTypes = {
        device: DeviceType.isRequired
    };

    defaultStateName = HOME_TAB;

    stateMap = {
        [HOME_TAB]: {
            home: true
        },
        [ACCOUNT_TAB]: {
            account: true
        }
    };

    renderMap = {
        home: this.renderHomeButton.bind(this),
        account: this.renderAccountButton.bind(this)
    };

    classList = cn("NavigationTabs");

    shouldComponentUpdate(nextProps) {
        const {
            navigationState: { name: prevName },
            device: prevDevice
        } = this.props;

        const {
            navigationState: { name: nextName },
            device: nextDevice
        } = nextProps;

        return prevName !== nextName || prevDevice !== nextDevice;
    }

    renderHomeButton(isActive = false) {
        const { onHomeButtonClick } = this.props;

        return (
            <button
                key="home"
                className={ this.classList("Button") }
                aria-label="Home"
                onClick={ onHomeButtonClick }
            >
                <HomeIcon isActive={ isActive } />
            </button>
        );
    }

    renderAccountButton(isActive = false) {
        const { onMyAccountButtonClick } = this.props;

        return (
            <button
                key="account"
                className={ this.classList("Button") }
                onClick={ onMyAccountButtonClick }
                aria-label="Open my account"
            >
                <UserIcon isActive={ isActive } />
            </button>
        );
    }

    render() {
        const { navigationState: { isHidden }, device } = this.props;

        if (!device.isMobile) {
            return null;
        }

        return (
            <footer className={ this.classList({ isHidden }, [cn("FixedElement", "Bottom")]) }>
                <nav className={ this.classList("Nav") }>
                    { this.renderNavigationState() }
                </nav>
            </footer>
        );
    }
}

export default NavigationTabs;
