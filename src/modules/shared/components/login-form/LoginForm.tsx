import * as React from "react";
import * as RB from "react-bootstrap";
import "./LoginForm.scss";
import UserModel from "../../models/user";
import { AppContext } from "../../../../App";

export class LoginForm extends React.Component<
  { user?: UserModel; onSuccess?: Function },
  { user: UserModel }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: this.props.user ? this.props.user : new UserModel()
    };
  }

  setUser = (user: UserModel) => {
    this.setState({
      user
    });
  };

  changeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
    e.persist();
    const user = this.state.user;
    user.username = (e.target as HTMLInputElement).value as string;
    this.setUser(user);
  };

  changePassword = (e: React.FormEvent<HTMLInputElement>): void => {
    e.persist();
    const user = this.state.user;
    user.password = (e.target as HTMLInputElement).value as string;
    this.setUser(user);
    console.log(this.context);
  };
  public render = (): React.ReactNode => {
    return (
      <AppContext.Consumer>
        {(value: {
          user: UserModel;
          updateUser: Function;
          token: string;
          updateToken: Function;
        }) => {
          const login = (e: React.FormEvent) => {
            e.preventDefault();
            this.state.user
              .login()
              .then((auth: { user: UserModel; token: string }) => {
                value.updateToken(auth.token);
                value.updateUser(auth.user);
                if (this.props.onSuccess) {
                  this.props.onSuccess(auth.user);
                }
              });
          };
          return (
            <RB.Form onSubmit={login}>
              <RB.Form.Group controlId="formUsername">
                <RB.Form.Label>Username</RB.Form.Label>
                <RB.Form.Control
                  type="text"
                  placeholder="Username or Email"
                  value={this.state.user.username}
                  onChange={this.changeUsername}
                />
              </RB.Form.Group>

              <RB.Form.Group controlId="formBasicPassword">
                <RB.Form.Label>Password</RB.Form.Label>
                <RB.Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.user.password}
                  onChange={this.changePassword}
                />
              </RB.Form.Group>
              <RB.Form.Group controlId="formBasicCheckbox">
                <RB.Form.Check
                  type="checkbox"
                  label="Remember me on this computer."
                />
              </RB.Form.Group>
              <RB.Button variant="primary" type="submit">
                Submit
              </RB.Button>
            </RB.Form>
          );
        }}
      </AppContext.Consumer>
    );
  };
}
