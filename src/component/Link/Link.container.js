/* eslint-disable react/prop-types */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import Link from "./Link.component";

/** @namespace Component/Link/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/Link/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/Link/Container */
export class LinkContainer extends PureComponent {
    static propTypes = {
        to: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired
    };

    containerProps = () => {
        const {
            block,
            elem,
            mods,
            mix,
            ...restProps
        } = this.props;

        return {
            ...restProps,
            to: this.getTo(),
            bemProps: {
                block,
                elem,
                mods,
                mix
            }
        };
    };

    getTo() {
        const { to: toProp } = this.props;
        // Fix null, undefined and empty links
        const to = toProp || "/";

        if (typeof to === "string") {
            return to;
        }

        return {
            ...to,
            pathname: to.pathname || "/"
        };
    }

    render() {
        return (
            <Link
                { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainer);
