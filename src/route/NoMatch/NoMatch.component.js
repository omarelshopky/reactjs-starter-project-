/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import ContentWrapper from "component/ContentWrapper";
import Link from "component/Link";

import "./NoMatch.style.scss";

/** @namespace Route/NoMatch/Component */
export class NoMatch extends PureComponent {
    static propTypes = {
        cleanUpTransition: PropTypes.func.isRequired
    };

    classList = cn("NoMatch");

    componentDidMount() {
        this.cleanUpTransition();
    }

    cleanUpTransition() {
        const { cleanUpTransition } = this.props;

        cleanUpTransition();
    }

    render() {
        return (
            <main className={ this.classList() } aria-label={ "Page not found" }>
                <ContentWrapper
                    mix={ { block: "NoMatch" } }
                    wrapperMix={ { block: "NoMatch", elem: "Wrapper" } }
                    label={ "Page Not Found Content" }
                >
                    <h1>
                        404
                    </h1>
                    <p className={ this.classList("Subtitle") }>
                        { "Page not found" }
                    </p>
                    <p>
                        { /* eslint-disable-next-line max-len */ }
                        { "Sorry, we can`t find the page you are looking for! Please press a button below to go back to homepage." }
                    </p>
                    <Link
                        to="/"
                        // eslint-disable-next-line react/forbid-component-props
                        className={ this.classList("Button", null, [cn("Button")]) }
                    >
                        { "Back to homepage" }
                    </Link>
                </ContentWrapper>
            </main>
        );
    }
}

export default NoMatch;
