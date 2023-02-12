/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

// TODO: implement props passing

import { Subscribe } from "unstated";

import SharedTransition from "./SharedTransition.component";
import SharedTransitionContainer from "./SharedTransition.unstated";

// eslint-disable-next-line react/display-name
export default (props) => (
    <Subscribe to={ [SharedTransitionContainer] }>
        { (sharedTransition) => (
            <SharedTransition
                { ...props }
                { ...sharedTransition }
            />
        ) }
    </Subscribe>
);
