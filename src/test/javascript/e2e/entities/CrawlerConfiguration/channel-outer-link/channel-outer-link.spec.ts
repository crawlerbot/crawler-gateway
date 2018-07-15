/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import ChannelOuterLinkComponentsPage from './channel-outer-link.page-object';
import ChannelOuterLinkUpdatePage from './channel-outer-link-update.page-object';

const expect = chai.expect;

describe('ChannelOuterLink e2e test', () => {
  let navBarPage: NavBarPage;
  let channelOuterLinkUpdatePage: ChannelOuterLinkUpdatePage;
  let channelOuterLinkComponentsPage: ChannelOuterLinkComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load ChannelOuterLinks', async () => {
    navBarPage.getEntityPage('channel-outer-link');
    channelOuterLinkComponentsPage = new ChannelOuterLinkComponentsPage();
    expect(await channelOuterLinkComponentsPage.getTitle().getText()).to.match(/Channel Outer Links/);
  });

  it('should load create ChannelOuterLink page', async () => {
    channelOuterLinkComponentsPage.clickOnCreateButton();
    channelOuterLinkUpdatePage = new ChannelOuterLinkUpdatePage();
    expect(await channelOuterLinkUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /crawlerEngineApp.crawlerConfigurationChannelOuterLink.home.createOrEditLabel/
    );
  });

  it('should create and save ChannelOuterLinks', async () => {
    channelOuterLinkUpdatePage.setConfigNameInput('configName');
    expect(await channelOuterLinkUpdatePage.getConfigNameInput()).to.match(/configName/);
    channelOuterLinkUpdatePage.setSelectorNameInput('selectorName');
    expect(await channelOuterLinkUpdatePage.getSelectorNameInput()).to.match(/selectorName/);
    channelOuterLinkUpdatePage.setSelectorAttrInput('selectorAttr');
    expect(await channelOuterLinkUpdatePage.getSelectorAttrInput()).to.match(/selectorAttr/);
    channelOuterLinkUpdatePage.setHostInput('host');
    expect(await channelOuterLinkUpdatePage.getHostInput()).to.match(/host/);
    channelOuterLinkUpdatePage.setUrlInput('url');
    expect(await channelOuterLinkUpdatePage.getUrlInput()).to.match(/url/);
    await channelOuterLinkUpdatePage.save();
    expect(await channelOuterLinkUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
