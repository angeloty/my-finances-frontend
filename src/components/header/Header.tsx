import React, { useState } from "react";
import * as RB from "react-bootstrap";
import "./Header.scss";
import Logo from "../../logo.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { connect } from "react-redux";
import { mapUserStateToProps } from "../../modules/shared/reducers/UserReducer";
import { LoginWindow } from "../../modules/shared/components/login-window/LoginWindow";
import { RegisterWindow } from "../../modules/shared/components/register-window/RegisterWindow";
import UserModel from "../../modules/shared/models/user";
import UserDropdown from './UserDropdown/UserDropdown';

export class Header extends React.Component<
  any,
  { openRegister: boolean; openLogin: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      openRegister: false,
      openLogin: false
    };
  }

  toggleRegisterButton = () => {
    this.setState({
      openRegister: !this.state.openRegister
    });
  };

  toggleLoginButton = () => {
    this.setState({
      openLogin: !this.state.openLogin
    });
  };

  render = () => {
    return (
      <AppContext.Consumer>
        {(value: { user: UserModel }) => (
          <>
            <header className="header-section">
              <RB.Navbar bg="light" expand="md" fixed="top">
                <RB.Navbar.Brand as={Link} to="/">
                  <RB.Image
                    className="App-logo"
                    src={Logo}
                    rounded
                    fluid
                    thumbnail
                  />
                </RB.Navbar.Brand>
                {!value.user && (
                  <RB.Form inline className="ml-auto">
                    <RB.Button
                      className="mx-2"
                      variant="outline-success"
                      onClick={this.toggleLoginButton}
                    >
                      Login
                    </RB.Button>
                    <RB.Button
                      className="mx-2"
                      variant="outline-success"
                      onClick={this.toggleRegisterButton}
                    >
                      Register
                    </RB.Button>
                  </RB.Form>
                )}
                {value.user && (<div  className="ml-auto"><UserDropdown /></div>)}
              </RB.Navbar>
            </header>
            <LoginWindow
              open={this.state.openLogin}
              onHide={this.toggleLoginButton}
            />
            <RegisterWindow
              open={this.state.openRegister}
              onHide={this.toggleRegisterButton}
            />
          </>
        )}
      </AppContext.Consumer>
    );
  };
}
export default connect(mapUserStateToProps)(Header);
