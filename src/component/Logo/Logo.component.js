/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import Image from "component/Image/Image.component";
import {
    IMAGE_NOT_FOUND,
    IMAGE_NOT_SPECIFIED
} from "component/Image/Image.config";
import logo from "style/logos/mainLogo.svg";

import "./Logo.style.scss";

/** @namespace Component/Logo/Component */
export class Logo extends Image {
    classList = cn("Logo");

    renderPlaceholderLogo() {
        return (
            <div className={ this.classList("Placeholder") }>
                <Image
                    src={ logo }
                    alt="LogoPlaceholder"
                    ratio="custom"
                />
            </div>
        );
    }

    renderImage() {
        const { imageStatus } = this.state;
        const { src } = this.props;

        if (!src) {
            return this.renderPlaceholderLogo();
        }

        switch (imageStatus) {
        case IMAGE_NOT_FOUND:
        case IMAGE_NOT_SPECIFIED:
            return this.renderPlaceholderLogo();
        default:
            return super.renderImage();
        }
    }

    render() {
        const { imageStatus } = this.state;

        return (
            <div className={ this.classList({ imageStatus }, [cn("Logo")]) }>
                { this.renderImage() }
            </div>
        );
    }
}

export default Logo;
