/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SiteChannelComponentsPage from './site-channel.page-object';
import SiteChannelUpdatePage from './site-channel-update.page-object';

const expect = chai.expect;

describe('SiteChannel e2e test', () => {
  let navBarPage: NavBarPage;
  let siteChannelUpdatePage: SiteChannelUpdatePage;
  let siteChannelComponentsPage: SiteChannelComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load SiteChannels', async () => {
    navBarPage.getEntityPage('site-channel');
    siteChannelComponentsPage = new SiteChannelComponentsPage();
    expect(await siteChannelComponentsPage.getTitle().getText()).to.match(/Site Channels/);
  });

  it('should load create SiteChannel page', async () => {
    siteChannelComponentsPage.clickOnCreateButton();
    siteChannelUpdatePage = new SiteChannelUpdatePage();
    expect(await siteChannelUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /crawlerEngineApp.crawlerConfigurationSiteChannel.home.createOrEditLabel/
    );
  });

  it('should create and save SiteChannels', async () => {
    siteChannelUpdatePage.setUrlInput('url');
    expect(await siteChannelUpdatePage.getUrlInput()).to.match(/url/);
    siteChannelUpdatePage.contentTypeSelectLastOption();
    siteChannelUpdatePage.setScheduleInput('schedule');
    expect(await siteChannelUpdatePage.getScheduleInput()).to.match(/schedule/);
    siteChannelUpdatePage.setScheduleTimeZoneInput('scheduleTimeZone');
    expect(await siteChannelUpdatePage.getScheduleTimeZoneInput()).to.match(/scheduleTimeZone/);
    siteChannelUpdatePage.setTotalLevelInput('5');
    expect(await siteChannelUpdatePage.getTotalLevelInput()).to.eq('5');
    siteChannelUpdatePage.setArchiveLevelInput('5');
    expect(await siteChannelUpdatePage.getArchiveLevelInput()).to.eq('5');
    const selectedUnlimitedLevel = await siteChannelUpdatePage.getUnlimitedLevelInput().isSelected();
    if (selectedUnlimitedLevel) {
      siteChannelUpdatePage.getUnlimitedLevelInput().click();
      expect(await siteChannelUpdatePage.getUnlimitedLevelInput().isSelected()).to.be.false;
    } else {
      siteChannelUpdatePage.getUnlimitedLevelInput().click();
      expect(await siteChannelUpdatePage.getUnlimitedLevelInput().isSelected()).to.be.true;
    }
    siteChannelUpdatePage.fetchEngineSelectLastOption();
    siteChannelUpdatePage.setCategoryInput('category');
    expect(await siteChannelUpdatePage.getCategoryInput()).to.match(/category/);
    siteChannelUpdatePage.setTagInput('tag');
    expect(await siteChannelUpdatePage.getTagInput()).to.match(/tag/);
    siteChannelUpdatePage.setCategorySlugInput('categorySlug');
    expect(await siteChannelUpdatePage.getCategorySlugInput()).to.match(/categorySlug/);
    siteChannelUpdatePage.setTagSlugInput('tagSlug');
    expect(await siteChannelUpdatePage.getTagSlugInput()).to.match(/tagSlug/);
    siteChannelUpdatePage.setCountryCodeInput('countryCode');
    expect(await siteChannelUpdatePage.getCountryCodeInput()).to.match(/countryCode/);
    siteChannelUpdatePage.setLanguageCodeInput('languageCode');
    expect(await siteChannelUpdatePage.getLanguageCodeInput()).to.match(/languageCode/);
    siteChannelUpdatePage.setTargetQueueChannelInput('targetQueueChannel');
    expect(await siteChannelUpdatePage.getTargetQueueChannelInput()).to.match(/targetQueueChannel/);
    siteChannelUpdatePage.setTopicsInput('topics');
    expect(await siteChannelUpdatePage.getTopicsInput()).to.match(/topics/);
    siteChannelUpdatePage.setTopicSlugsInput('topicSlugs');
    expect(await siteChannelUpdatePage.getTopicSlugsInput()).to.match(/topicSlugs/);
    siteChannelUpdatePage.postTypeSelectLastOption();
    siteChannelUpdatePage.setRankingCountryInput('5');
    expect(await siteChannelUpdatePage.getRankingCountryInput()).to.eq('5');
    siteChannelUpdatePage.setChannelTotalLevelInput('5');
    expect(await siteChannelUpdatePage.getChannelTotalLevelInput()).to.eq('5');
    siteChannelUpdatePage.setChannelArchiveLevelInput('5');
    expect(await siteChannelUpdatePage.getChannelArchiveLevelInput()).to.eq('5');
    siteChannelUpdatePage.channelFetchEngineSelectLastOption();
    siteChannelUpdatePage.setChannelRankingInput('5');
    expect(await siteChannelUpdatePage.getChannelRankingInput()).to.eq('5');
    siteChannelUpdatePage.setChannelTargetQueueInput('channelTargetQueue');
    expect(await siteChannelUpdatePage.getChannelTargetQueueInput()).to.match(/channelTargetQueue/);
    siteChannelUpdatePage.channelTargetPostTypeSelectLastOption();
    siteChannelUpdatePage.channelLevelOneFetchEngineSelectLastOption();
    siteChannelUpdatePage.channelLevelTwoFetchEngineSelectLastOption();
    siteChannelUpdatePage.channelLevelThreeFetchEngineSelectLastOption();
    siteChannelUpdatePage.channelLevelFourFetchEngineSelectLastOption();
    siteChannelUpdatePage.channelLevelOneContentTypeSelectLastOption();
    siteChannelUpdatePage.channelLevelTwoContentTypeSelectLastOption();
    siteChannelUpdatePage.channelLevelThreeContentTypeSelectLastOption();
    siteChannelUpdatePage.channelLevelFourContentTypeSelectLastOption();
    const selectedChannelAllowExternalUrl = await siteChannelUpdatePage.getChannelAllowExternalUrlInput().isSelected();
    if (selectedChannelAllowExternalUrl) {
      siteChannelUpdatePage.getChannelAllowExternalUrlInput().click();
      expect(await siteChannelUpdatePage.getChannelAllowExternalUrlInput().isSelected()).to.be.false;
    } else {
      siteChannelUpdatePage.getChannelAllowExternalUrlInput().click();
      expect(await siteChannelUpdatePage.getChannelAllowExternalUrlInput().isSelected()).to.be.true;
    }
    siteChannelUpdatePage.setChannelLogoInput('channelLogo');
    expect(await siteChannelUpdatePage.getChannelLogoInput()).to.match(/channelLogo/);
    siteChannelUpdatePage.setChannelSiteNameInput('channelSiteName');
    expect(await siteChannelUpdatePage.getChannelSiteNameInput()).to.match(/channelSiteName/);
    siteChannelUpdatePage.setLogoInput('logo');
    expect(await siteChannelUpdatePage.getLogoInput()).to.match(/logo/);
    siteChannelUpdatePage.setSiteNameInput('siteName');
    expect(await siteChannelUpdatePage.getSiteNameInput()).to.match(/siteName/);
    siteChannelUpdatePage.channelTypeSelectLastOption();
    siteChannelUpdatePage.levelOneFetchEngineSelectLastOption();
    siteChannelUpdatePage.levelTwoFetchEngineSelectLastOption();
    siteChannelUpdatePage.levelThreeFetchEngineSelectLastOption();
    siteChannelUpdatePage.levelFourFetchEngineSelectLastOption();
    siteChannelUpdatePage.levelOneContentTypeSelectLastOption();
    siteChannelUpdatePage.levelTwoContentTypeSelectLastOption();
    siteChannelUpdatePage.levelThreeContentTypeSelectLastOption();
    siteChannelUpdatePage.levelFourContentTypeSelectLastOption();
    const selectedAllowExternalUrl = await siteChannelUpdatePage.getAllowExternalUrlInput().isSelected();
    if (selectedAllowExternalUrl) {
      siteChannelUpdatePage.getAllowExternalUrlInput().click();
      expect(await siteChannelUpdatePage.getAllowExternalUrlInput().isSelected()).to.be.false;
    } else {
      siteChannelUpdatePage.getAllowExternalUrlInput().click();
      expect(await siteChannelUpdatePage.getAllowExternalUrlInput().isSelected()).to.be.true;
    }
    siteChannelUpdatePage.setSiteUrlInput('siteUrl');
    expect(await siteChannelUpdatePage.getSiteUrlInput()).to.match(/siteUrl/);
    siteChannelUpdatePage.targetChannelSelectLastOption();
    siteChannelUpdatePage.targetSelectLastOption();
    siteChannelUpdatePage.setSiteDomainInput('siteDomain');
    expect(await siteChannelUpdatePage.getSiteDomainInput()).to.match(/siteDomain/);
    // siteChannelUpdatePage.outerSelectLastOption();
    // siteChannelUpdatePage.mappingSelectLastOption();
    // siteChannelUpdatePage.configGroupSelectLastOption();
    // siteChannelUpdatePage.targetGroupSelectLastOption();
    await siteChannelUpdatePage.save();
    expect(await siteChannelUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
