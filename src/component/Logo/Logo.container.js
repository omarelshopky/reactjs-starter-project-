/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import ImageContainer from "component/Image/Image.container";

import Logo from "./Logo.component";

/** @namespace Component/Logo/Container */
export class LogoContainer extends ImageContainer {
    render() {
        return (
            <Logo
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default LogoContainer;
