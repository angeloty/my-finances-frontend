import * as React from "react";
import * as RB from "react-bootstrap";
import { AppContext } from "../../../App";
import UserModel from "../../../modules/shared/models/user";
import Logo from "../../../logo.svg";
import "./UserDropdown.scss";

export default class UserDropdown extends React.Component {
  render = (): React.ReactNode => {
    return (
      <AppContext.Consumer>
        {(value: {
          user: UserModel;
          updateUser: Function;
          updateToken: Function;
        }) => {
          const logout = () => {
            value.updateToken('');
            value.updateUser(null);
          }
          return (
            <>
              <RB.Dropdown className="drop-topleft">
                <RB.Dropdown.Toggle
                  className="user-btn"
                  id={value.user.username}
                >
                  <RB.Image
                    src={
                      value.user.profile && value.user.profile.photo
                        ? value.user.profile.photo
                        : Logo
                    }
                    roundedCircle
                    thumbnail
                  />
                </RB.Dropdown.Toggle>
                <RB.Dropdown.Menu>
                  <RB.Dropdown.Item as="button">Action</RB.Dropdown.Item>
                  <RB.Dropdown.Item as="button">
                    Another action
                  </RB.Dropdown.Item>
                  <RB.Dropdown.Item as="button" onClick={logout}>
                    Logout
                  </RB.Dropdown.Item>
                </RB.Dropdown.Menu>
              </RB.Dropdown>
            </>
          );
        }}
      </AppContext.Consumer>
    );
  };
}
