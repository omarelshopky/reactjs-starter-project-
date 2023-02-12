/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import React from "react";
import { render } from "react-dom";
window.React = React;

import "bootstrap/dist/css/bootstrap.min.css";
import "style/main.scss";
import App from "component/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

render(<App />,document.getElementById("root"));

/*
* If you want your app to work offline and load faster, you can change
* unregister() to register() below. Note this comes with some pitfalls.
* Learn more about service workers: https://cra.link/PWA
*/
serviceWorkerRegistration.register();
