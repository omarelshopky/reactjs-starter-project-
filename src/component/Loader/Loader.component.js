/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import "./Loader.style.scss";

/**
 * Loader component
 * Loaders overlay to identify loading
 * @class Loader
 * @namespace Component/Loader/Component
 */
export class Loader extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        isLoading: true
    };

    classList = cn("Loader");

    renderMain() {
        return (
            <div className={ this.classList("Main") }>
                <span />
            </div>
        );
    }

    render() {
        const { isLoading } = this.props;

        if (!isLoading) {
            return null;
        }

        return (
            <div className={ this.classList() }>
                <div className={ this.classList("Scale") }>
                    { this.renderMain() }
                </div>
            </div>
        );
    }
}

export default Loader;
