import * as React from "react";
import * as RB from "react-bootstrap";
import "./RegisterForm.scss";
import UserModel from "../../models/user";
import { AppContext } from "../../../../App";

export class RegisterForm extends React.Component<
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
  submit = (e: React.FormEvent): Promise<{user: UserModel, token: string}> => {
    e.preventDefault();
    return new Promise(resolve => {
      this.state.user.save().then((user: UserModel) => {
        this.setUser(user);
        user.login().then((auth: { user: UserModel; token: string }) => {
          if (this.props.onSuccess) {
            this.props.onSuccess(auth.user);
          }
          resolve(auth);
        });
      });
    });
  };
  changeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
    e.persist();
    const user = this.state.user;
    user.username = (e.target as HTMLInputElement).value as string;
    this.setUser(user);
  };
  changeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
    e.persist();
    const user = this.state.user;
    user.email = (e.target as HTMLInputElement).value as string;
    this.setUser(user);
  };
  changePassword = (e: React.FormEvent<HTMLInputElement>): void => {
    e.persist();
    const user = this.state.user;
    user.password = (e.target as HTMLInputElement).value as string;
    this.setUser(user);
  };
  public render = (): any => {
    return (
      <AppContext.Consumer>
        {(value: {
          user: UserModel;
          updateUser: Function;
          updateToken: Function;
        }) => {
          const submit = (e: React.FormEvent) => {
            this.submit(e).then((auth: {user: UserModel, token: string}) => {
             value.updateUser(auth.user);
             value.updateToken(auth.token);
            });
          };
          return (
            <RB.Form onSubmit={submit}>
              <RB.Form.Group controlId="formUsername">
                <RB.Form.Label>Username</RB.Form.Label>
                <RB.Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={this.state.user.username}
                  onChange={this.changeUsername}
                />
              </RB.Form.Group>
              <RB.Form.Group controlId="formBasicEmail">
                <RB.Form.Label>Email address</RB.Form.Label>
                <RB.Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.state.user.email}
                  onChange={this.changeEmail}
                />
              </RB.Form.Group>

              <RB.Form.Group controlId="formBasicPassword">
                <RB.Form.Label>Password</RB.Form.Label>
                <RB.Form.Control
                  type="password"
                  placeholder="Password"
                  minLength={6}
                  value={this.state.user.password}
                  onChange={this.changePassword}
                />
                <RB.Form.Text className="text-muted">
                  Password must content more than 6 characters
                </RB.Form.Text>
              </RB.Form.Group>
              <RB.Form.Group controlId="formBasicConfirmPassword">
                <RB.Form.Label>Retype Password</RB.Form.Label>
                <RB.Form.Control
                  type="password"
                  placeholder="Retype Password"
                />
              </RB.Form.Group>
              <RB.Form.Group controlId="formBasicCheckbox">
                <RB.Form.Check
                  type="checkbox"
                  label="I accept terms and conditions"
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

export default RegisterForm;
