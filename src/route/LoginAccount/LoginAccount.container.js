/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { connect } from "react-redux";

import { CUSTOMER_ACCOUNT, FORGOT_PASSWORD, REGISTER } from "component/Header/Header.config";
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps,
    MyAccountOverlayContainer
} from "component/MyAccountOverlay/MyAccountOverlay.container";
import { isSignedIn } from "util/Auth";
import history from "util/History";

import LoginAccount from "./LoginAccount.component";

/** @namespace Component/LoginAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
});

/** @namespace Scandipwa/Route/LoginAccount/Container/LoginAccountContainer */
export class LoginAccountContainer extends MyAccountOverlayContainer {
    static propTypes = {
        ...MyAccountOverlayContainer.propTypes
    };

    containerFunctions = {
        ...this.containerFunctions,
        onCreateAccountClick: this.onCreateAccountClick.bind(this)
    };

    onCreateAccountClick() {
        history.replace(`/${ REGISTER }`);
    }

    handleForgotPassword() {
        history.replace(`/${ FORGOT_PASSWORD }`);
    }

    componentDidMount() {
        const { setHeaderState } = this.props;

        if (isSignedIn()) {
            history.push("/");
        }

        setHeaderState({ name: CUSTOMER_ACCOUNT, title: "Sign in" });
    }

    componentDidUpdate(prevProps, prevState) {
        if (isSignedIn()) {
            history.push("/");

            return;
        }

        super.componentDidUpdate(prevProps, prevState);
    }

    render() {
        return (
            <LoginAccount
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAccountContainer);
