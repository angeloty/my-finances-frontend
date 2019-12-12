import React from "react";
import * as RB from "react-bootstrap";
import "./Footer.scss";

export default class Footer extends React.Component<any> {
  public render = (): React.ReactNode => {
    return (
      <RB.Container className="footer-section" fluid={true}>
        <RB.Row>
          <RB.Col xs={12} sm={6} md={4}></RB.Col>
          <RB.Col xs={12} sm={6} md={4}></RB.Col>
          <RB.Col xs={12} sm={12}></RB.Col>
        </RB.Row>
      </RB.Container>
    );
  };
}
