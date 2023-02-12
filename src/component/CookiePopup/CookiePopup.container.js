/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import CookiePopup from "./CookiePopup.component";

/** @namespace Component/CookiePopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    cookieText: state.ConfigReducer.cookie_text,
    cookieLink: state.ConfigReducer.cookie_link,
    code: state.ConfigReducer.code
});

/** @namespace Component/CookiePopup/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/CookiePopup/Container */
export class CookiePopupContainer extends PureComponent {
    static propTypes = {
        cookieText: PropTypes.string,
        cookieLink: PropTypes.string,
        code: PropTypes.string
    };

    static defaultProps = {
        cookieText: "",
        cookieLink: "",
        code: ""
    };

    containerProps() {
        const { code, cookieLink, cookieText } = this.props;

        return { code, cookieLink, cookieText };
    }

    render() {
        const { code } = this.props;

        return (
            <CookiePopup
                { ...this.containerProps() }
                key={ code }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CookiePopupContainer);
