import * as React from "react";
import * as RB from "react-bootstrap";
import "./LoginWindow.scss";
import { LoginForm } from "../login-form/LoginForm";

export class LoginWindow extends React.Component<
  {
    open: boolean;
    onLoginSuccess?: Function;
    onLoginFail?: Function;
    onHide?: Function;
  },
  {
    open: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: this.props.open
    };
  }
  hide = () => {
    if (this.props.onHide) {
      this.props.onHide();
    } else {
      this.setState({
        open: false
      });
    }
  };
  componentWillReceiveProps = (nextProps: any) => {
    this.setState({
      open: nextProps.open
    });
  };
  render = () => {
    return (
      <RB.Modal show={this.state.open} onHide={this.hide}>
        <RB.Modal.Header closeButton>
          <RB.Modal.Title>Register</RB.Modal.Title>
        </RB.Modal.Header>
        <RB.Modal.Body>
          <LoginForm onSuccess={this.hide}></LoginForm>
        </RB.Modal.Body>
      </RB.Modal>
    );
  };
}
