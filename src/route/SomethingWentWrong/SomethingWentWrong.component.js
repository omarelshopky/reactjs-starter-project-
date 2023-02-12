/* eslint-disable no-console */

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

import "./SomethingWentWrong.style.scss";

/** @namespace Route/SomethingWentWrong/Component */
export class SomethingWentWrong extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        errorDetails: PropTypes.shape({
            err: PropTypes.shape({

            }),
            info: PropTypes.shape({
                componentStack: PropTypes.string
            })
        }).isRequired
    };

    classList = cn("SomethingWentWrong");

    renderErrorDetails() {
        const { errorDetails: { err, info: { componentStack } = {} } } = this.props;
        const errorString = err.toString();

        console.groupCollapsed("Suppressed error log:");
        console.error(errorString);
        console.groupEnd();

        // eslint-disable-next-line no-undef
        if (process.env.NODE_ENV === "production") {
            return null;
        }

        return (
            <div className={ this.classList("Debug") }>
                { errorString }
                { componentStack }
            </div>
        );
    }

    render() {
        const { onClick } = this.props;

        return (
            <main block="SomethingWentWrong">
                <ContentWrapper label="Something went wrong on the page.">
                    <h1 className={ this.classList("Heading") }>{ "Ooops!" }</h1>
                    <h2 className={ this.classList("SubHeading") }>{ "Something went wrong!" }</h2>
                    <a
                        href="/"
                        className={ this.classList("Button", {}, [cn("Button")]) }
                        onClick={ onClick }
                    >
                        { "Back to homepage" }
                    </a>
                    { this.renderErrorDetails() }
                </ContentWrapper>
            </main>
        );
    }
}

export default SomethingWentWrong;
