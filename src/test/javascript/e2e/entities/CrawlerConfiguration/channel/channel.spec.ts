/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import ChannelComponentsPage from './channel.page-object';
import ChannelUpdatePage from './channel-update.page-object';

const expect = chai.expect;

describe('Channel e2e test', () => {
  let navBarPage: NavBarPage;
  let channelUpdatePage: ChannelUpdatePage;
  let channelComponentsPage: ChannelComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Channels', async () => {
    navBarPage.getEntityPage('channel');
    channelComponentsPage = new ChannelComponentsPage();
    expect(await channelComponentsPage.getTitle().getText()).to.match(/Channels/);
  });

  it('should load create Channel page', async () => {
    channelComponentsPage.clickOnCreateButton();
    channelUpdatePage = new ChannelUpdatePage();
    expect(await channelUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /crawlerEngineApp.crawlerConfigurationChannel.home.createOrEditLabel/
    );
  });

  it('should create and save Channels', async () => {
    channelUpdatePage.setUrlInput('url');
    expect(await channelUpdatePage.getUrlInput()).to.match(/url/);
    channelUpdatePage.contentTypeSelectLastOption();
    channelUpdatePage.setScheduleInput('schedule');
    expect(await channelUpdatePage.getScheduleInput()).to.match(/schedule/);
    channelUpdatePage.setScheduleTimeZoneInput('scheduleTimeZone');
    expect(await channelUpdatePage.getScheduleTimeZoneInput()).to.match(/scheduleTimeZone/);
    channelUpdatePage.setTotalLevelInput('5');
    expect(await channelUpdatePage.getTotalLevelInput()).to.eq('5');
    channelUpdatePage.setArchiveLevelInput('5');
    expect(await channelUpdatePage.getArchiveLevelInput()).to.eq('5');
    const selectedUnlimitedLevel = await channelUpdatePage.getUnlimitedLevelInput().isSelected();
    if (selectedUnlimitedLevel) {
      channelUpdatePage.getUnlimitedLevelInput().click();
      expect(await channelUpdatePage.getUnlimitedLevelInput().isSelected()).to.be.false;
    } else {
      channelUpdatePage.getUnlimitedLevelInput().click();
      expect(await channelUpdatePage.getUnlimitedLevelInput().isSelected()).to.be.true;
    }
    channelUpdatePage.fetchEngineSelectLastOption();
    channelUpdatePage.setCategoryInput('category');
    expect(await channelUpdatePage.getCategoryInput()).to.match(/category/);
    channelUpdatePage.setTagInput('tag');
    expect(await channelUpdatePage.getTagInput()).to.match(/tag/);
    channelUpdatePage.setCategorySlugInput('categorySlug');
    expect(await channelUpdatePage.getCategorySlugInput()).to.match(/categorySlug/);
    channelUpdatePage.setTagSlugInput('tagSlug');
    expect(await channelUpdatePage.getTagSlugInput()).to.match(/tagSlug/);
    channelUpdatePage.setCountryCodeInput('countryCode');
    expect(await channelUpdatePage.getCountryCodeInput()).to.match(/countryCode/);
    channelUpdatePage.setLanguageCodeInput('languageCode');
    expect(await channelUpdatePage.getLanguageCodeInput()).to.match(/languageCode/);
    channelUpdatePage.setTargetQueueChannelInput('targetQueueChannel');
    expect(await channelUpdatePage.getTargetQueueChannelInput()).to.match(/targetQueueChannel/);
    channelUpdatePage.setTopicsInput('topics');
    expect(await channelUpdatePage.getTopicsInput()).to.match(/topics/);
    channelUpdatePage.setTopicSlugsInput('topicSlugs');
    expect(await channelUpdatePage.getTopicSlugsInput()).to.match(/topicSlugs/);
    channelUpdatePage.postTypeSelectLastOption();
    channelUpdatePage.setRankingCountryInput('5');
    expect(await channelUpdatePage.getRankingCountryInput()).to.eq('5');
    channelUpdatePage.setChannelTotalLevelInput('5');
    expect(await channelUpdatePage.getChannelTotalLevelInput()).to.eq('5');
    channelUpdatePage.setChannelArchiveLevelInput('5');
    expect(await channelUpdatePage.getChannelArchiveLevelInput()).to.eq('5');
    channelUpdatePage.channelFetchEngineSelectLastOption();
    channelUpdatePage.setChannelRankingInput('5');
    expect(await channelUpdatePage.getChannelRankingInput()).to.eq('5');
    channelUpdatePage.setChannelTargetQueueInput('channelTargetQueue');
    expect(await channelUpdatePage.getChannelTargetQueueInput()).to.match(/channelTargetQueue/);
    channelUpdatePage.channelTargetPostTypeSelectLastOption();
    channelUpdatePage.channelLevelOneFetchEngineSelectLastOption();
    channelUpdatePage.channelLevelTwoFetchEngineSelectLastOption();
    channelUpdatePage.channelLevelThreeFetchEngineSelectLastOption();
    channelUpdatePage.channelLevelFourFetchEngineSelectLastOption();
    channelUpdatePage.channelLevelOneContentTypeSelectLastOption();
    channelUpdatePage.channelLevelTwoContentTypeSelectLastOption();
    channelUpdatePage.channelLevelThreeContentTypeSelectLastOption();
    channelUpdatePage.channelLevelFourContentTypeSelectLastOption();
    const selectedChannelAllowExternalUrl = await channelUpdatePage.getChannelAllowExternalUrlInput().isSelected();
    if (selectedChannelAllowExternalUrl) {
      channelUpdatePage.getChannelAllowExternalUrlInput().click();
      expect(await channelUpdatePage.getChannelAllowExternalUrlInput().isSelected()).to.be.false;
    } else {
      channelUpdatePage.getChannelAllowExternalUrlInput().click();
      expect(await channelUpdatePage.getChannelAllowExternalUrlInput().isSelected()).to.be.true;
    }
    channelUpdatePage.setChannelLogoInput('channelLogo');
    expect(await channelUpdatePage.getChannelLogoInput()).to.match(/channelLogo/);
    channelUpdatePage.setChannelSiteNameInput('channelSiteName');
    expect(await channelUpdatePage.getChannelSiteNameInput()).to.match(/channelSiteName/);
    channelUpdatePage.setLogoInput('logo');
    expect(await channelUpdatePage.getLogoInput()).to.match(/logo/);
    channelUpdatePage.setSiteNameInput('siteName');
    expect(await channelUpdatePage.getSiteNameInput()).to.match(/siteName/);
    channelUpdatePage.channelTypeSelectLastOption();
    channelUpdatePage.levelOneFetchEngineSelectLastOption();
    channelUpdatePage.levelTwoFetchEngineSelectLastOption();
    channelUpdatePage.levelThreeFetchEngineSelectLastOption();
    channelUpdatePage.levelFourFetchEngineSelectLastOption();
    channelUpdatePage.levelOneContentTypeSelectLastOption();
    channelUpdatePage.levelTwoContentTypeSelectLastOption();
    channelUpdatePage.levelThreeContentTypeSelectLastOption();
    channelUpdatePage.levelFourContentTypeSelectLastOption();
    const selectedAllowExternalUrl = await channelUpdatePage.getAllowExternalUrlInput().isSelected();
    if (selectedAllowExternalUrl) {
      channelUpdatePage.getAllowExternalUrlInput().click();
      expect(await channelUpdatePage.getAllowExternalUrlInput().isSelected()).to.be.false;
    } else {
      channelUpdatePage.getAllowExternalUrlInput().click();
      expect(await channelUpdatePage.getAllowExternalUrlInput().isSelected()).to.be.true;
    }
    channelUpdatePage.targetChannelSelectLastOption();
    channelUpdatePage.targetSelectLastOption();
    channelUpdatePage.setNameInput('name');
    expect(await channelUpdatePage.getNameInput()).to.match(/name/);
    channelUpdatePage.setSiteDomainInput('siteDomain');
    expect(await channelUpdatePage.getSiteDomainInput()).to.match(/siteDomain/);
    channelUpdatePage.setSiteUrlInput('siteUrl');
    expect(await channelUpdatePage.getSiteUrlInput()).to.match(/siteUrl/);
    // channelUpdatePage.outerSelectLastOption();
    // channelUpdatePage.mappingSelectLastOption();
    // channelUpdatePage.configGroupSelectLastOption();
    // channelUpdatePage.targetGroupSelectLastOption();
    await channelUpdatePage.save();
    expect(await channelUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
