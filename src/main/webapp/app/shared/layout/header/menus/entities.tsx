import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translate } from 'react-simlife';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/config-mapping">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Config Mapping
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/channel">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Channel
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/config-group">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Config Group
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/try-parser">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Try Parser
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/site-channel">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Site Channel
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/channel-outer-link">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Channel Outer Link
    </DropdownItem>
    {/* simlife-needle-add-entity-to-menu - Simlife will add entities to the menu here */}
  </NavDropdown>
);
