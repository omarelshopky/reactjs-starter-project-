/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { Subscribe } from "unstated";

import { NO_MATCH } from "component/Header/Header.config";
import SharedTransitionContainer from "component/SharedTransition/SharedTransition.unstated";
import { updateMeta } from "store/Meta/Meta.action";
import { changeNavigationState } from "store/Navigation/Navigation.action";
import { TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";

import NoMatch from "./NoMatch.component";

/** @namespace Route/NoMatch/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace Route/NoMatch/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

/** @namespace Route/NoMatch/Container */
export class NoMatchContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.updateHeaderState();
        this.updateMeta();
    }

    updateHeaderState() {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: NO_MATCH,
            title: "Page not found",
            isHiddenOnMobile: true
        });
    }

    updateMeta() {
        const { updateMeta } = this.props;

        updateMeta({ title: "Page not found", status_code: "404" });
    }


    render() {
        return (
            <Subscribe to={ [SharedTransitionContainer] }>
                { ({ cleanUpTransition }) => (
                    <NoMatch
                        cleanUpTransition={ cleanUpTransition }
                    />
                ) }
            </Subscribe>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoMatchContainer);
