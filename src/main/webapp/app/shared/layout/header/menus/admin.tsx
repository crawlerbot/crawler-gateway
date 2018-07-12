import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';
import { Translate, translate } from 'react-simlife';

const adminMenuItems = (
  <>
    <DropdownItem tag={Link} to="/admin/gateway">
      <FontAwesomeIcon icon="road" /> <Translate contentKey="global.menu.admin.gateway" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/admin/user-management">
      <FontAwesomeIcon icon="user" /> <Translate contentKey="global.menu.admin.userManagement" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/admin/metrics">
      <FontAwesomeIcon icon="tachometer-alt" /> <Translate contentKey="global.menu.admin.metrics" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/admin/health">
      <FontAwesomeIcon icon="heart" /> <Translate contentKey="global.menu.admin.health" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/admin/configuration">
      <FontAwesomeIcon icon="list" /> <Translate contentKey="global.menu.admin.configuration" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/admin/audits">
      <FontAwesomeIcon icon="bell" /> <Translate contentKey="global.menu.admin.audits" />
    </DropdownItem>
    {/* simlife-needle-add-element-to-admin-menu - Simlife will add entities to the admin menu here */}
    <DropdownItem tag={Link} to="/admin/logs">
      <FontAwesomeIcon icon="tasks" /> <Translate contentKey="global.menu.admin.logs" />
    </DropdownItem>
  </>
);

const swaggerItem = (
  <DropdownItem tag={Link} to="/admin/docs">
    <FontAwesomeIcon icon="book" /> <Translate contentKey="global.menu.admin.apidocs" />
  </DropdownItem>
);

export const AdminMenu = ({ showSwagger }) => (
  <NavDropdown icon="user-plus" name={translate('global.menu.admin.main')} style={{ width: '140%' }} id="admin-menu">
    {adminMenuItems}
    {showSwagger && swaggerItem}
  </NavDropdown>
);

export default AdminMenu;
