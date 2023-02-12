/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { connect } from "react-redux";

import { CUSTOMER_SUB_ACCOUNT, LOGIN, REGISTER } from "component/Header/Header.config";
import {
    mapDispatchToProps,
    mapStateToProps,
    MyAccountOverlayContainer
} from "component/MyAccountOverlay/MyAccountOverlay.container";
import history from "util/History";

import ForgotPassword from "./ForgotPassword.component";

/** @namespace Scandipwa/Route/ForgotPassword/Container/ForgotPasswordContainer */
export class ForgotPasswordContainer extends MyAccountOverlayContainer {
    containerProps() {
        const { device } = this.props;

        return {
            ...super.containerProps(),
            device
        };
    }

    containerFunctions = {
        ...this.containerFunctions,
        onLoginClick: this.onLoginClick.bind(this),
        onCreateAccountClick: this.onCreateAccountClick.bind(this)
    };

    componentDidMount() {
        const { setHeaderState } = this.props;

        setHeaderState({
            name: CUSTOMER_SUB_ACCOUNT,
            title: "Forgot password",
            onBackClick: (e) => {
                history.push({ pathname: `${ LOGIN }` });
                this.handleSignIn(e);
            }
        });
    }

    onLoginClick() {
        history.replace(`/${ LOGIN }`);
    }

    onCreateAccountClick() {
        history.replace(`/${ REGISTER }`);
    }

    render() {
        return (
            <ForgotPassword
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
