/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

/** @namespace Util/FormPortalCollector */
export class FormPortalCollector {
    portalsObservers = {};

    subscribe(id, f, name) {
        if (this.portalsObservers[id]) {
            this.portalsObservers[id][name] = f;

            return;
        }

        this.portalsObservers[id] = { [name]: f };
    }

    unsubscribe(id, name) {
        if (!this.portalsObservers[id]) {
            return;
        }
        // eslint-disable-next-line fp/no-delete
        delete this.portalsObservers[id][name];
    }

    collect(id) {
        const portals = this.portalsObservers[id] || {};

        return Object.values(portals).map((portal) => portal());
    }
}

export default FormPortalCollector;
