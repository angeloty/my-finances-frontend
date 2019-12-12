import * as React from "react";
import { Route } from "react-router-dom";
import { LandingPage } from "../modules/main/components/landingpage/LandingPage";
import { Homepage } from "../modules/main/components/homepage/Homepage";
import { AboutUs } from "../modules/main/components/about-us/AboutUs";
import { SignUp } from "../modules/main/components/signup/SignUp";
import { ContactUs } from "../modules/main/components/contact-us/ContactUs";

export default class Router extends React.Component<{translated: boolean}> {
  render = (): React.ReactNode => {
    return (
      <div className={`content ${this.props.translated ? 'translated' : ''}`}>
        <Route path="/" exact render={props => <LandingPage {...props} />} />
        <Route path="/home" exact render={props => <Homepage {...props} />} />
        <Route path="/about-us" exact render={props => <AboutUs {...props} />} />
        <Route path="/sign-up" exact render={props => <SignUp {...props} />} />
        <Route
          path="/contact-us"
          exact
          render={props => <ContactUs {...props} />}
        />
      </div>
    );
  };
}
