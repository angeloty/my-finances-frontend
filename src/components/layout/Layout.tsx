import * as React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Router from "../Router";
import "./Layout.scss";
import { SideNav } from "../SideNav/SideNav";

export class Layout extends React.Component<any, {sidebarExpanded: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {sidebarExpanded: false}
  }

  onSidebarToggle = (sidebarExpanded: boolean) => {
    this.setState({
      sidebarExpanded
    });
  }
  public render = (): React.ReactNode => {
    return (
      <div className="layout">
        <Header logged={true} />
        <SideNav onToggle={this.onSidebarToggle}
          options={[
            { text: "Home", reference: "/home", icon: "home" },
            { text: "About Us", reference: "/about-us", icon: "envelope" },
            { text: "Contact Us", reference: "/contact-us", icon: "coffee" },
            { text: "Sign Up", reference: "/sign-up", icon: "lock" },
            { text: "Help", reference: "/home", icon: "question" }
          ]}
        />
        <Router translated={this.state.sidebarExpanded} />
        <Footer logged={true} />
      </div>
    );
  };
}

export default Layout;
