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
import Field from "component/Field";
import Image from "component/Image";
import Notification from "component/Notification";
import UserIcon from "component/UserIcon";
import AddIcon from "component/AddIcon";
import ChevronIcon from "component/ChevronIcon";
import CloseIcon from "component/CloseIcon";
import HomeIcon from "component/HomeIcon";
import MinusIcon from "component/MinusIcon";

import {
    ADDITIONAL_ELEMENTS,
    BUTTONS, ICONS,
    ICONS_LIST,
    INPUTS,
    NOTIFICATION_ERROR_DATA,
    NOTIFICATION_INFO_DATA,
    NOTIFICATION_SUCCESS_DATA,
    TEXT_STYLES
} from "./StyleGuidePage.config";

import "./StyleGuidePage.style.scss";

/** @namespace Base/Route/StyleGuide/Component/StyleGuideComponent */
export class StyleGuidePageComponent extends PureComponent {
    static propTypes = {
        fakeFunction: PropTypes.func.isRequired
    };

    renderMap = {
        [BUTTONS]: () => this.renderButtons(),
        [TEXT_STYLES]: () => this.renderTextStyles(),
        [INPUTS]: () => this.renderInputs(),
        [ICONS]: () => this.renderIcons(),
        [ADDITIONAL_ELEMENTS]: () => this.renderAdditionalElements()
    };

    classList = cn("StyleGuidePage");

    renderButtons() {
        return (
            <div className={ this.classList("Buttons") }>
                <h4 className={ this.classList("SubHeading") }>{ "Transactional [default state + hover]" }</h4>
                <div>
                    <button className="Button" id="buttons">
                        { "Button text" }
                    </button>
                    <button className={ cn("Button")({ isHovered: true}) } id="hoverButtons">
                        { "Button text" }
                    </button>
                </div>
                <h4 className={ this.classList("SubHeading") }>{ "Supportive [default state + hover]" }</h4>
                <button className={ cn("Button")({ isHollow: true}) } id="hollowButtons">
                    { "Secondary button" }
                </button>
                <button className={ cn("Button")({ isHollow: true, isHovered: true}) } id="hollowHoverButtons">
                    { "Secondary button" }
                </button>
            </div>
        );
    }

    renderTextStyles() {
        return (
            <>
                <div className={ this.classList("DesktopTextStyles") }>
                    <h4 className={ this.classList("SubHeading") }>{ "Desktop" }</h4>
                    <h1 id="h1">{ "Heading 1" }</h1>
                    <h2 id="h2">{ "Heading 2" }</h2>
                    <h3 id="h3">{ "Heading 3" }</h3>
                    <p id="paragraph">
                        { "The " }
                        <a className="Link" href="/">{ "website" }</a>
                        { " aims to achieve" }
                        <strong>{ " following " }</strong>
                        { "business goals:" }
                    </p>
                    <p className="caption" id="caption">
                        { "The " }
                        <a className="Link" href="/">{ "website" }</a>
                        { " aims to achieve" }
                        <strong>{ " following " }</strong>
                        { "business goals:" }
                    </p>
                </div>
                <div className={ this.classList("MobileTextStyles") }>
                    <h4 className={ this.classList("SubHeading") }>{ "Mobile" }</h4>
                    <h1 id="h1Mobile">{ "Heading 1" }</h1>
                    <h2 id="h2Mobile">{ "Heading 2" }</h2>
                    <h3 id="h3Mobile">{ "Heading 3" }</h3>
                    <p id="paragraphMobile">
                        { "The " }
                        <a className="Link" href="/">{ "website" }</a>
                        { " aims to achieve" }
                        <strong>{ " following " }</strong>
                        { "business goals:" }
                    </p>
                    <p className="caption" id="captionMobile">
                        { "The " }
                        <a className="Link" href="/">{ "website" }</a>
                        { " aims to achieve" }
                        <strong>{ " following " }</strong>
                        { "business goals:" }
                    </p>
                </div>
            </>
        );
    }

    renderInputs() {
        return (
            <>
                <Field
                    type="select"
                    placeholder={ "Select color" }
                    name="testSelect"
                    selectOptions={ [{"id": 1, "value": "test", "label": "Test"}] }
                />
                <Field
                    type="text"
                    id="input"
                    placeholder={ "Your email address" }
                    name="testText"
                    validation={ ["notEmpty"] }
                />
            </>
        );
    }

    renderIcons() {
        return (
            <div className={ this.classList("Icons") }>
                { Object.entries(ICONS_LIST).map(
                    ([iconName, iconPath]) => (<Image src={ iconPath } alt={ iconName } key={ iconName } />)
                ) }
                <h4 className={ this.classList("SubHeading") }>
                    { "Icons in header [default state + hover]" }
                </h4>
                <div>
                    <UserIcon />
                    <UserIcon isActive />
                    <HomeIcon />
                    <HomeIcon isActive />
                    <MinusIcon />
                    <MinusIcon isPrimary/>
                    <AddIcon />
                    <AddIcon isPrimary/>
                    <ChevronIcon />
                    <CloseIcon />
                </div>
            </div>
        );
    }

    renderAdditionalElements() {
        const { fakeFunction } = this.props;

        return (
            <>
                <h4 className={ this.classList("SubHeading") }>
                    { "Notification messages" }
                </h4>

                <Notification
                    onHideNotification={ fakeFunction }
                    lifeTime={ 9999999 }
                    notificationId="success"
                    notification={ NOTIFICATION_SUCCESS_DATA }
                    id="notificationSuccess"
                />
                <Notification
                    onHideNotification={ fakeFunction }
                    lifeTime={ 9999999 }
                    notificationId="error"
                    notification={ NOTIFICATION_ERROR_DATA }
                    id="notificationError"
                />
                <Notification
                    onHideNotification={ fakeFunction }
                    lifeTime={ 9999999 }
                    notificationId="info"
                    notification={ NOTIFICATION_INFO_DATA }
                    id="notificationInfo"
                />
            </>
        );
    }

    renderItem = (title, render) => (
        <div className={ this.classList("Component") } key={ title }>
            <h1 className={ this.classList("Heading") }>{ title }</h1>
            { render() }
        </div>
    );

    render() {
        return (
            <main className="StyleGuidePage">
                <ContentWrapper
                    wrapperMix={ {block: "StyleGuidePage", elem: "Wrapper"} }
                    label={ "Style Guide page" }
                >
                    { Object.entries(this.renderMap).map(([key, item]) => this.renderItem(key, item)) }
                </ContentWrapper>
            </main>
        );
    }
}

export default StyleGuidePageComponent;
