/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import Footer from "component/Footer";
import InstallPrompt from "component/InstallPrompt";
import { DEFAULT_STATE_NAME } from "component/NavigationAbstract/NavigationAbstract.config";
import { changeNavigationState } from "store/Navigation/Navigation.action";
import { TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";
import { LocationType, MatchType } from "type/Common";

import "./HomePage.style.scss";

/** @namespace Route/HomePage/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

/** @namespace Route/HomePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace Route/HomePage/Container */
export class HomePageContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        match: MatchType.isRequired
    };

    componentDidMount() {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: false
        });
    }

    containerProps() {
        const {
            changeHeaderState,
            location,
            match
        } = this.props;

        return {
            changeHeaderState,
            location,
            match
        };
    }

    render() {
        return (
            <div className="HomePage">
                <InstallPrompt />
                <Footer isVisibleOnMobile />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
