/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { Container } from "unstated";

export const sharedTransitionInitialState = {
    sharedElementDestination: null,
    sharedElement: null,
    destinationPosition: {},
    startingPosition: {}
};

/** @namespace Component/SharedTransition/Unstated */
export class SharedTransitionUnstated extends Container {
    state = sharedTransitionInitialState;

    _parseRectangle = (val) => JSON.parse(JSON.stringify(val));

    cleanUpTransition = () => {
        this.setState(sharedTransitionInitialState);
    };

    registerSharedElementDestination = ({ current }) => {
        if (current) {
            this.setState(({ sharedElementDestination }) => {
                if (sharedElementDestination) {
                    return {};
                }

                return {
                    sharedElementDestination: current,
                    destinationPosition: this._parseRectangle(current.getBoundingClientRect())
                };
            });
        }
    };

    registerSharedElement = ({ current }) => {
        if (current) {
            const clone = current.cloneNode(true);

            this.setState({
                sharedElement: clone,
                sharedElementDestination: null,
                destinationPosition: {},
                startingPosition: this._parseRectangle(current.getBoundingClientRect())
            });
        }
    };
}

export default new SharedTransitionUnstated();
