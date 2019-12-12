import * as React from "react";
import { Link } from "react-router-dom";
import * as RB from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SideNavItem.scss";
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  IconName
} from "@fortawesome/fontawesome-svg-core";

export interface ISideBarOption {
  text: string;
  reference: string;
  icon?: string;
  children?: ISideBarOption[];
}

export const NavItemIcon = (props: { icon: string | undefined }) => {
  if (props.icon) {
    const iconLookup: IconLookup = {
      prefix: "fas",
      iconName: props.icon as IconName
    };
    const iconDefinition: IconDefinition = findIconDefinition(iconLookup);
    return (
      <FontAwesomeIcon
        className="nav-item-icon"
        icon={iconDefinition}
      ></FontAwesomeIcon>
    );
  }
  return <></>;
};

export const SideNavItem = (props: ISideBarOption) => {
  const className = useRouteMatch(props.reference) ? "active" : "inactive";
  return (
    <RB.ListGroup.Item
      as={Link}
      to={props.reference}
      className={`side-nav-item ${className}`}
    >
      <NavItemIcon icon={props.icon}></NavItemIcon>
      {props.text}
    </RB.ListGroup.Item>
  );
}
