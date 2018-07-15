/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import ConfigMappingComponentsPage from './config-mapping.page-object';
import ConfigMappingUpdatePage from './config-mapping-update.page-object';

const expect = chai.expect;

describe('ConfigMapping e2e test', () => {
  let navBarPage: NavBarPage;
  let configMappingUpdatePage: ConfigMappingUpdatePage;
  let configMappingComponentsPage: ConfigMappingComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load ConfigMappings', async () => {
    navBarPage.getEntityPage('config-mapping');
    configMappingComponentsPage = new ConfigMappingComponentsPage();
    expect(await configMappingComponentsPage.getTitle().getText()).to.match(/Config Mappings/);
  });

  it('should load create ConfigMapping page', async () => {
    configMappingComponentsPage.clickOnCreateButton();
    configMappingUpdatePage = new ConfigMappingUpdatePage();
    expect(await configMappingUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /crawlerEngineApp.crawlerConfigurationConfigMapping.home.createOrEditLabel/
    );
  });

  it('should create and save ConfigMappings', async () => {
    configMappingUpdatePage.setNameInput('name');
    expect(await configMappingUpdatePage.getNameInput()).to.match(/name/);
    configMappingUpdatePage.setSelectorInput('selector');
    expect(await configMappingUpdatePage.getSelectorInput()).to.match(/selector/);
    configMappingUpdatePage.setHostInput('host');
    expect(await configMappingUpdatePage.getHostInput()).to.match(/host/);
    configMappingUpdatePage.setConfigNameInput('configName');
    expect(await configMappingUpdatePage.getConfigNameInput()).to.match(/configName/);
    configMappingUpdatePage.setAttrInput('attr');
    expect(await configMappingUpdatePage.getAttrInput()).to.match(/attr/);
    configMappingUpdatePage.dataTypeSelectLastOption();
    await configMappingUpdatePage.save();
    expect(await configMappingUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
