/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { updateConfig } from "store/Config/Config.action";
import { showNotification } from "store/Notification/Notification.action";
import BrowserDatabase from "util/BrowserDatabase";
import { ONE_MONTH_IN_SECONDS } from "util/Request/Request.config";

/** @namespace Store/Config/Dispatcher */
export class ConfigDispatcher {
    onSuccess(data, dispatch) {
        if (data) {
            BrowserDatabase.setItem(data, "config", ONE_MONTH_IN_SECONDS);
            dispatch(updateConfig(data));
        }
    }

    onError(error, dispatch) {
        dispatch(showNotification("error", "Error fetching Config!", error));
    }

    prepareRequest() {
        return [
            // ConfigQuery.getCurrencyData(),
        ];
    }
}

export default new ConfigDispatcher();
