import * as React from "react";
import * as RB from "react-bootstrap";
import "./RegisterWindow.scss";
import { RegisterForm } from "../register-form/RegisterForm";
import UserModel from "../../models/user";
import { AppContext } from "../../../../App";

export class RegisterWindow extends React.Component<
  {
    open: boolean;
    onSuccess?: Function;
    onFail?: Function;
    onHide?: Function;
  },
  {
    open: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    console.log(this.state)
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
  registerSucceeded = (user: UserModel) => {
    this.hide();
  };
  render = () => {
    return (
      <RB.Modal show={this.state.open} onHide={this.hide}>
        <RB.Modal.Header closeButton={true}>
          <RB.Modal.Title>Register</RB.Modal.Title>
        </RB.Modal.Header>
        <RB.Modal.Body>
          <RegisterForm onSuccess={this.registerSucceeded}></RegisterForm>
        </RB.Modal.Body>
      </RB.Modal>
    );
  };
}
