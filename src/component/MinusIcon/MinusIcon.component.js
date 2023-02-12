/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import "./MinusIcon.style.scss";

/** @namespace Component/MinusIcon/Component */
export class MinusIcon extends PureComponent {
    static propTypes = {
        isPrimary: PropTypes.bool
    };

    static defaultProps = {
        isPrimary: false
    };

    classList = cn("MinusIcon");

    render() {
        const { isPrimary } = this.props;

        return (
            <svg
                className={ this.classList({ isPrimary }) }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M5 11H19V13H5V11Z" />
            </svg>
        );
    }
}

export default MinusIcon;
