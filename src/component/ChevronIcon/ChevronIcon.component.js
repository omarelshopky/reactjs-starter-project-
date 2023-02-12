/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import { PureComponent } from "react";

import { DirectionType } from "type/Direction";

import { RIGHT } from "./ChevronIcon.config";

import "./ChevronIcon.style.scss";

/** @namespace Component/ChevronIcon/Component */
export class ChevronIcon extends PureComponent {
    static propTypes = {
        direction: DirectionType
    };

    static defaultProps = {
        direction: RIGHT
    };

    classList = cn("ChevronIcon");

    render() {
        const { direction } = this.props;

        return (
            <svg
                className={ this.classList({ direction }) }
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M5.8535 13.707L11.5605 7.99997L5.8535 2.29297L4.4395 3.70697L8.7325 7.99997L4.4395 12.293L5.8535 13.707Z" />
            </svg>
        );
    }
}

export default ChevronIcon;
