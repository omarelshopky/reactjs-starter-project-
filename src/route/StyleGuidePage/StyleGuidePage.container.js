/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { PureComponent } from "react";

import StyleGuide from "./StyleGuidePage.component";


/** @namespace Route/StyleGuide/Container/StyleGuidePageContainer */
export class StyleGuidePageContainer extends PureComponent {
    containerFunctions = {
        fakeFunction: this.fakeFunction.bind(this)
    };

    fakeFunction() {
        return "fake";
    }

    render() {
        return (
            <StyleGuide
                { ...this.containerFunctions }
            />
        );
    }
}

export default StyleGuidePageContainer;
