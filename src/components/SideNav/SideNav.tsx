import * as React from "react";
import * as RB from "react-bootstrap";
import "./SideNav.scss";
import { Toggler } from "../../modules/shared/components/toggler/Toggler";
import { SideNavItem, ISideBarOption } from "./SideNavItem";

export class SideNav extends React.Component<
  { options: ISideBarOption[]; onToggle: Function },
  { expanded: boolean }
> {
  public expanded: boolean = false;

  expand = (expanded: boolean) => {
    this.setState({
      expanded
    });
    this.props.onToggle(expanded);
  };
  constructor(
    props: { options: any[]; onToggle: Function } = {
      options: [],
      onToggle: (expanded: boolean) => {}
    }
  ) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  render = () => {
    let sideBar = null;
    if (this.props.hasOwnProperty("options")) {
      sideBar = this.props.options.map((o: ISideBarOption, i: number) => (
        <SideNavItem {...o} key={i} />
      ));
    }
    return (
      <div className="navbar-light">
        <RB.ListGroup
          className={this.state.expanded ? "expanded" : "collapsed"}
        >
          <Toggler onToggle={this.expand}></Toggler>
          {sideBar}
        </RB.ListGroup>
      </div>
    );
  };
}
