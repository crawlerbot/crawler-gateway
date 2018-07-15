/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import ConfigGroupComponentsPage from './config-group.page-object';
import ConfigGroupUpdatePage from './config-group-update.page-object';

const expect = chai.expect;

describe('ConfigGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let configGroupUpdatePage: ConfigGroupUpdatePage;
  let configGroupComponentsPage: ConfigGroupComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load ConfigGroups', async () => {
    navBarPage.getEntityPage('config-group');
    configGroupComponentsPage = new ConfigGroupComponentsPage();
    expect(await configGroupComponentsPage.getTitle().getText()).to.match(/Config Groups/);
  });

  it('should load create ConfigGroup page', async () => {
    configGroupComponentsPage.clickOnCreateButton();
    configGroupUpdatePage = new ConfigGroupUpdatePage();
    expect(await configGroupUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /crawlerEngineApp.crawlerConfigurationConfigGroup.home.createOrEditLabel/
    );
  });

  it('should create and save ConfigGroups', async () => {
    configGroupUpdatePage.setNameInput('name');
    expect(await configGroupUpdatePage.getNameInput()).to.match(/name/);
    configGroupUpdatePage.setHostInput('host');
    expect(await configGroupUpdatePage.getHostInput()).to.match(/host/);
    configGroupUpdatePage.setCurrentLevelInput('5');
    expect(await configGroupUpdatePage.getCurrentLevelInput()).to.eq('5');
    configGroupUpdatePage.expectResultTypeSelectLastOption();
    // configGroupUpdatePage.mappingSelectLastOption();
    await configGroupUpdatePage.save();
    expect(await configGroupUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
