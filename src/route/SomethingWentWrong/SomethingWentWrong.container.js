/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { updateMeta } from "store/Meta/Meta.action";

import SomethingWentWrong from "./SomethingWentWrong.component";

/** @namespace Route/SomethingWentWrong/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta))
});

/** @namespace Route/SomethingWentWrong/Container */
export class SomethingWentWrongContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        errorDetails: PropTypes.shape({
            err: PropTypes.shape({

            }),
            info: PropTypes.shape({
                componentStack: PropTypes.string
            })
        }).isRequired
    };

    componentDidMount() {
        const { updateMeta } = this.props;

        updateMeta({ title: "Something went wrong!" });
    }

    containerProps() {
        const { onClick, errorDetails } = this.props;

        return { onClick, errorDetails };
    }

    render() {
        return (
            <SomethingWentWrong
                { ...this.containerProps() }
            />
        );
    }
}

/** @namespace Route/SomethingWentWrong/Container/mapStateToProps */
export const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SomethingWentWrongContainer);
