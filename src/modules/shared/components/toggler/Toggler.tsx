import * as React from "react";
import "./Toggler.scss";

export class Toggler extends React.Component<
  { onExpanded?: Function; onCollapsed?: Function; onToggle?: Function },
  { expanded: boolean }
> {
  constructor(props?: any) {
    super(props);
    this.state = { expanded: false };
  }

  expand = () => {
    this.setState(
      {
        expanded: !this.state.expanded
      },
      () => {
        this.propagateToggle();
      }
    );
  };

  propagateToggle = () => {
    if (this.props.onToggle) {
      this.props.onToggle(this.state.expanded);
    }
    if (this.state.expanded) {
      if (this.props.onExpanded) {
        this.props.onExpanded();
      }
    } else {
      if (this.props.onCollapsed) {
        this.props.onCollapsed();
      }
    }
  };

  render = () => {
    return (
      <button
        onClick={this.expand}
        className={`btn toggler ${
          this.state.expanded ? "expanded" : "collapsed"
        }`}
      >
        <div className="middle"></div>
      </button>
    );
  };
}
