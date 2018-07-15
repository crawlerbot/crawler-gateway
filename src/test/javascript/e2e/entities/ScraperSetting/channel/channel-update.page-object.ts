import { element, by, ElementFinder } from 'protractor';

export default class ChannelUpdatePage {
  pageTitle: ElementFinder = element(by.id('crawlerEngineApp.scraperSettingChannel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  urlInput: ElementFinder = element(by.css('input#channel-url'));
  contentTypeSelect: ElementFinder = element(by.css('select#channel-contentType'));
  scheduleInput: ElementFinder = element(by.css('input#channel-schedule'));
  scheduleTimeZoneInput: ElementFinder = element(by.css('input#channel-scheduleTimeZone'));
  totalLevelInput: ElementFinder = element(by.css('input#channel-totalLevel'));
  archiveLevelInput: ElementFinder = element(by.css('input#channel-archiveLevel'));
  unlimitedLevelInput: ElementFinder = element(by.css('input#channel-unlimitedLevel'));
  fetchEngineSelect: ElementFinder = element(by.css('select#channel-fetchEngine'));
  categoryInput: ElementFinder = element(by.css('input#channel-category'));
  tagInput: ElementFinder = element(by.css('input#channel-tag'));
  categorySlugInput: ElementFinder = element(by.css('input#channel-categorySlug'));
  tagSlugInput: ElementFinder = element(by.css('input#channel-tagSlug'));
  countryCodeInput: ElementFinder = element(by.css('input#channel-countryCode'));
  languageCodeInput: ElementFinder = element(by.css('input#channel-languageCode'));
  targetQueueChannelInput: ElementFinder = element(by.css('input#channel-targetQueueChannel'));
  topicsInput: ElementFinder = element(by.css('input#channel-topics'));
  topicSlugsInput: ElementFinder = element(by.css('input#channel-topicSlugs'));
  postTypeSelect: ElementFinder = element(by.css('select#channel-postType'));
  rankingCountryInput: ElementFinder = element(by.css('input#channel-rankingCountry'));
  channelTotalLevelInput: ElementFinder = element(by.css('input#channel-channelTotalLevel'));
  channelArchiveLevelInput: ElementFinder = element(by.css('input#channel-channelArchiveLevel'));
  channelFetchEngineSelect: ElementFinder = element(by.css('select#channel-channelFetchEngine'));
  channelRankingInput: ElementFinder = element(by.css('input#channel-channelRanking'));
  channelTargetQueueInput: ElementFinder = element(by.css('input#channel-channelTargetQueue'));
  channelTargetPostTypeSelect: ElementFinder = element(by.css('select#channel-channelTargetPostType'));
  channelLevelOneFetchEngineSelect: ElementFinder = element(by.css('select#channel-channelLevelOneFetchEngine'));
  channelLevelTwoFetchEngineSelect: ElementFinder = element(by.css('select#channel-channelLevelTwoFetchEngine'));
  channelLevelThreeFetchEngineSelect: ElementFinder = element(by.css('select#channel-channelLevelThreeFetchEngine'));
  channelLevelFourFetchEngineSelect: ElementFinder = element(by.css('select#channel-channelLevelFourFetchEngine'));
  channelLevelOneContentTypeSelect: ElementFinder = element(by.css('select#channel-channelLevelOneContentType'));
  channelLevelTwoContentTypeSelect: ElementFinder = element(by.css('select#channel-channelLevelTwoContentType'));
  channelLevelThreeContentTypeSelect: ElementFinder = element(by.css('select#channel-channelLevelThreeContentType'));
  channelLevelFourContentTypeSelect: ElementFinder = element(by.css('select#channel-channelLevelFourContentType'));
  channelAllowExternalUrlInput: ElementFinder = element(by.css('input#channel-channelAllowExternalUrl'));
  channelLogoInput: ElementFinder = element(by.css('input#channel-channelLogo'));
  channelSiteNameInput: ElementFinder = element(by.css('input#channel-channelSiteName'));
  logoInput: ElementFinder = element(by.css('input#channel-logo'));
  siteNameInput: ElementFinder = element(by.css('input#channel-siteName'));
  channelTypeSelect: ElementFinder = element(by.css('select#channel-channelType'));
  levelOneFetchEngineSelect: ElementFinder = element(by.css('select#channel-levelOneFetchEngine'));
  levelTwoFetchEngineSelect: ElementFinder = element(by.css('select#channel-levelTwoFetchEngine'));
  levelThreeFetchEngineSelect: ElementFinder = element(by.css('select#channel-levelThreeFetchEngine'));
  levelFourFetchEngineSelect: ElementFinder = element(by.css('select#channel-levelFourFetchEngine'));
  levelOneContentTypeSelect: ElementFinder = element(by.css('select#channel-levelOneContentType'));
  levelTwoContentTypeSelect: ElementFinder = element(by.css('select#channel-levelTwoContentType'));
  levelThreeContentTypeSelect: ElementFinder = element(by.css('select#channel-levelThreeContentType'));
  levelFourContentTypeSelect: ElementFinder = element(by.css('select#channel-levelFourContentType'));
  allowExternalUrlInput: ElementFinder = element(by.css('input#channel-allowExternalUrl'));
  targetChannelSelect: ElementFinder = element(by.css('select#channel-targetChannel'));
  targetSelect: ElementFinder = element(by.css('select#channel-target'));
  nameInput: ElementFinder = element(by.css('input#channel-name'));
  siteDomainInput: ElementFinder = element(by.css('input#channel-siteDomain'));
  siteUrlInput: ElementFinder = element(by.css('input#channel-siteUrl'));
  outerSelect: ElementFinder = element(by.css('select#channel-outer'));
  mappingSelect: ElementFinder = element(by.css('select#channel-mapping'));
  configGroupSelect: ElementFinder = element(by.css('select#channel-configGroup'));
  targetGroupSelect: ElementFinder = element(by.css('select#channel-targetGroup'));

  getPageTitle() {
    return this.pageTitle;
  }

  setUrlInput(url) {
    this.urlInput.sendKeys(url);
  }

  getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  setContentTypeSelect(contentType) {
    this.contentTypeSelect.sendKeys(contentType);
  }

  getContentTypeSelect() {
    return this.contentTypeSelect.element(by.css('option:checked')).getText();
  }

  contentTypeSelectLastOption() {
    this.contentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setScheduleInput(schedule) {
    this.scheduleInput.sendKeys(schedule);
  }

  getScheduleInput() {
    return this.scheduleInput.getAttribute('value');
  }

  setScheduleTimeZoneInput(scheduleTimeZone) {
    this.scheduleTimeZoneInput.sendKeys(scheduleTimeZone);
  }

  getScheduleTimeZoneInput() {
    return this.scheduleTimeZoneInput.getAttribute('value');
  }

  setTotalLevelInput(totalLevel) {
    this.totalLevelInput.sendKeys(totalLevel);
  }

  getTotalLevelInput() {
    return this.totalLevelInput.getAttribute('value');
  }

  setArchiveLevelInput(archiveLevel) {
    this.archiveLevelInput.sendKeys(archiveLevel);
  }

  getArchiveLevelInput() {
    return this.archiveLevelInput.getAttribute('value');
  }

  getUnlimitedLevelInput() {
    return this.unlimitedLevelInput;
  }
  setFetchEngineSelect(fetchEngine) {
    this.fetchEngineSelect.sendKeys(fetchEngine);
  }

  getFetchEngineSelect() {
    return this.fetchEngineSelect.element(by.css('option:checked')).getText();
  }

  fetchEngineSelectLastOption() {
    this.fetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setCategoryInput(category) {
    this.categoryInput.sendKeys(category);
  }

  getCategoryInput() {
    return this.categoryInput.getAttribute('value');
  }

  setTagInput(tag) {
    this.tagInput.sendKeys(tag);
  }

  getTagInput() {
    return this.tagInput.getAttribute('value');
  }

  setCategorySlugInput(categorySlug) {
    this.categorySlugInput.sendKeys(categorySlug);
  }

  getCategorySlugInput() {
    return this.categorySlugInput.getAttribute('value');
  }

  setTagSlugInput(tagSlug) {
    this.tagSlugInput.sendKeys(tagSlug);
  }

  getTagSlugInput() {
    return this.tagSlugInput.getAttribute('value');
  }

  setCountryCodeInput(countryCode) {
    this.countryCodeInput.sendKeys(countryCode);
  }

  getCountryCodeInput() {
    return this.countryCodeInput.getAttribute('value');
  }

  setLanguageCodeInput(languageCode) {
    this.languageCodeInput.sendKeys(languageCode);
  }

  getLanguageCodeInput() {
    return this.languageCodeInput.getAttribute('value');
  }

  setTargetQueueChannelInput(targetQueueChannel) {
    this.targetQueueChannelInput.sendKeys(targetQueueChannel);
  }

  getTargetQueueChannelInput() {
    return this.targetQueueChannelInput.getAttribute('value');
  }

  setTopicsInput(topics) {
    this.topicsInput.sendKeys(topics);
  }

  getTopicsInput() {
    return this.topicsInput.getAttribute('value');
  }

  setTopicSlugsInput(topicSlugs) {
    this.topicSlugsInput.sendKeys(topicSlugs);
  }

  getTopicSlugsInput() {
    return this.topicSlugsInput.getAttribute('value');
  }

  setPostTypeSelect(postType) {
    this.postTypeSelect.sendKeys(postType);
  }

  getPostTypeSelect() {
    return this.postTypeSelect.element(by.css('option:checked')).getText();
  }

  postTypeSelectLastOption() {
    this.postTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setRankingCountryInput(rankingCountry) {
    this.rankingCountryInput.sendKeys(rankingCountry);
  }

  getRankingCountryInput() {
    return this.rankingCountryInput.getAttribute('value');
  }

  setChannelTotalLevelInput(channelTotalLevel) {
    this.channelTotalLevelInput.sendKeys(channelTotalLevel);
  }

  getChannelTotalLevelInput() {
    return this.channelTotalLevelInput.getAttribute('value');
  }

  setChannelArchiveLevelInput(channelArchiveLevel) {
    this.channelArchiveLevelInput.sendKeys(channelArchiveLevel);
  }

  getChannelArchiveLevelInput() {
    return this.channelArchiveLevelInput.getAttribute('value');
  }

  setChannelFetchEngineSelect(channelFetchEngine) {
    this.channelFetchEngineSelect.sendKeys(channelFetchEngine);
  }

  getChannelFetchEngineSelect() {
    return this.channelFetchEngineSelect.element(by.css('option:checked')).getText();
  }

  channelFetchEngineSelectLastOption() {
    this.channelFetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setChannelRankingInput(channelRanking) {
    this.channelRankingInput.sendKeys(channelRanking);
  }

  getChannelRankingInput() {
    return this.channelRankingInput.getAttribute('value');
  }

  setChannelTargetQueueInput(channelTargetQueue) {
    this.channelTargetQueueInput.sendKeys(channelTargetQueue);
  }

  getChannelTargetQueueInput() {
    return this.channelTargetQueueInput.getAttribute('value');
  }

  setChannelTargetPostTypeSelect(channelTargetPostType) {
    this.channelTargetPostTypeSelect.sendKeys(channelTargetPostType);
  }

  getChannelTargetPostTypeSelect() {
    return this.channelTargetPostTypeSelect.element(by.css('option:checked')).getText();
  }

  channelTargetPostTypeSelectLastOption() {
    this.channelTargetPostTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setChannelLevelOneFetchEngineSelect(channelLevelOneFetchEngine) {
    this.channelLevelOneFetchEngineSelect.sendKeys(channelLevelOneFetchEngine);
  }

  getChannelLevelOneFetchEngineSelect() {
    return this.channelLevelOneFetchEngineSelect.element(by.css('option:checked')).getText();
  }

  channelLevelOneFetchEngineSelectLastOption() {
    this.channelLevelOneFetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setChannelLevelTwoFetchEngineSelect(channelLevelTwoFetchEngine) {
    this.channelLevelTwoFetchEngineSelect.sendKeys(channelLevelTwoFetchEngine);
  }

  getChannelLevelTwoFetchEngineSelect() {
    return this.channelLevelTwoFetchEngineSelect.element(by.css('option:checked')).getText();
  }

  channelLevelTwoFetchEngineSelectLastOption() {
    this.channelLevelTwoFetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setChannelLevelThreeFetchEngineSelect(channelLevelThreeFetchEngine) {
    this.channelLevelThreeFetchEngineSelect.sendKeys(channelLevelThreeFetchEngine);
  }

  getChannelLevelThreeFetchEngineSelect() {
    return this.channelLevelThreeFetchEngineSelect.element(by.css('option:checked')).getText();
  }

  channelLevelThreeFetchEngineSelectLastOption() {
    this.channelLevelThreeFetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setChannelLevelFourFetchEngineSelect(channelLevelFourFetchEngine) {
    this.channelLevelFourFetchEngineSelect.sendKeys(channelLevelFourFetchEngine);
  }

  getChannelLevelFourFetchEngineSelect() {
    return this.channelLevelFourFetchEngineSelect.element(by.css('option:checked')).getText();
  }

  channelLevelFourFetchEngineSelectLastOption() {
    this.channelLevelFourFetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setChannelLevelOneContentTypeSelect(channelLevelOneContentType) {
    this.channelLevelOneContentTypeSelect.sendKeys(channelLevelOneContentType);
  }

  getChannelLevelOneContentTypeSelect() {
    return this.channelLevelOneContentTypeSelect.element(by.css('option:checked')).getText();
  }

  channelLevelOneContentTypeSelectLastOption() {
    this.channelLevelOneContentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setChannelLevelTwoContentTypeSelect(channelLevelTwoContentType) {
    this.channelLevelTwoContentTypeSelect.sendKeys(channelLevelTwoContentType);
  }

  getChannelLevelTwoContentTypeSelect() {
    return this.channelLevelTwoContentTypeSelect.element(by.css('option:checked')).getText();
  }

  channelLevelTwoContentTypeSelectLastOption() {
    this.channelLevelTwoContentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setChannelLevelThreeContentTypeSelect(channelLevelThreeContentType) {
    this.channelLevelThreeContentTypeSelect.sendKeys(channelLevelThreeContentType);
  }

  getChannelLevelThreeContentTypeSelect() {
    return this.channelLevelThreeContentTypeSelect.element(by.css('option:checked')).getText();
  }

  channelLevelThreeContentTypeSelectLastOption() {
    this.channelLevelThreeContentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setChannelLevelFourContentTypeSelect(channelLevelFourContentType) {
    this.channelLevelFourContentTypeSelect.sendKeys(channelLevelFourContentType);
  }

  getChannelLevelFourContentTypeSelect() {
    return this.channelLevelFourContentTypeSelect.element(by.css('option:checked')).getText();
  }

  channelLevelFourContentTypeSelectLastOption() {
    this.channelLevelFourContentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  getChannelAllowExternalUrlInput() {
    return this.channelAllowExternalUrlInput;
  }
  setChannelLogoInput(channelLogo) {
    this.channelLogoInput.sendKeys(channelLogo);
  }

  getChannelLogoInput() {
    return this.channelLogoInput.getAttribute('value');
  }

  setChannelSiteNameInput(channelSiteName) {
    this.channelSiteNameInput.sendKeys(channelSiteName);
  }

  getChannelSiteNameInput() {
    return this.channelSiteNameInput.getAttribute('value');
  }

  setLogoInput(logo) {
    this.logoInput.sendKeys(logo);
  }

  getLogoInput() {
    return this.logoInput.getAttribute('value');
  }

  setSiteNameInput(siteName) {
    this.siteNameInput.sendKeys(siteName);
  }

  getSiteNameInput() {
    return this.siteNameInput.getAttribute('value');
  }

  setChannelTypeSelect(channelType) {
    this.channelTypeSelect.sendKeys(channelType);
  }

  getChannelTypeSelect() {
    return this.channelTypeSelect.element(by.css('option:checked')).getText();
  }

  channelTypeSelectLastOption() {
    this.channelTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setLevelOneFetchEngineSelect(levelOneFetchEngine) {
    this.levelOneFetchEngineSelect.sendKeys(levelOneFetchEngine);
  }

  getLevelOneFetchEngineSelect() {
    return this.levelOneFetchEngineSelect.element(by.css('option:checked')).getText();
  }

  levelOneFetchEngineSelectLastOption() {
    this.levelOneFetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setLevelTwoFetchEngineSelect(levelTwoFetchEngine) {
    this.levelTwoFetchEngineSelect.sendKeys(levelTwoFetchEngine);
  }

  getLevelTwoFetchEngineSelect() {
    return this.levelTwoFetchEngineSelect.element(by.css('option:checked')).getText();
  }

  levelTwoFetchEngineSelectLastOption() {
    this.levelTwoFetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setLevelThreeFetchEngineSelect(levelThreeFetchEngine) {
    this.levelThreeFetchEngineSelect.sendKeys(levelThreeFetchEngine);
  }

  getLevelThreeFetchEngineSelect() {
    return this.levelThreeFetchEngineSelect.element(by.css('option:checked')).getText();
  }

  levelThreeFetchEngineSelectLastOption() {
    this.levelThreeFetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setLevelFourFetchEngineSelect(levelFourFetchEngine) {
    this.levelFourFetchEngineSelect.sendKeys(levelFourFetchEngine);
  }

  getLevelFourFetchEngineSelect() {
    return this.levelFourFetchEngineSelect.element(by.css('option:checked')).getText();
  }

  levelFourFetchEngineSelectLastOption() {
    this.levelFourFetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setLevelOneContentTypeSelect(levelOneContentType) {
    this.levelOneContentTypeSelect.sendKeys(levelOneContentType);
  }

  getLevelOneContentTypeSelect() {
    return this.levelOneContentTypeSelect.element(by.css('option:checked')).getText();
  }

  levelOneContentTypeSelectLastOption() {
    this.levelOneContentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setLevelTwoContentTypeSelect(levelTwoContentType) {
    this.levelTwoContentTypeSelect.sendKeys(levelTwoContentType);
  }

  getLevelTwoContentTypeSelect() {
    return this.levelTwoContentTypeSelect.element(by.css('option:checked')).getText();
  }

  levelTwoContentTypeSelectLastOption() {
    this.levelTwoContentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setLevelThreeContentTypeSelect(levelThreeContentType) {
    this.levelThreeContentTypeSelect.sendKeys(levelThreeContentType);
  }

  getLevelThreeContentTypeSelect() {
    return this.levelThreeContentTypeSelect.element(by.css('option:checked')).getText();
  }

  levelThreeContentTypeSelectLastOption() {
    this.levelThreeContentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setLevelFourContentTypeSelect(levelFourContentType) {
    this.levelFourContentTypeSelect.sendKeys(levelFourContentType);
  }

  getLevelFourContentTypeSelect() {
    return this.levelFourContentTypeSelect.element(by.css('option:checked')).getText();
  }

  levelFourContentTypeSelectLastOption() {
    this.levelFourContentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  getAllowExternalUrlInput() {
    return this.allowExternalUrlInput;
  }
  setTargetChannelSelect(targetChannel) {
    this.targetChannelSelect.sendKeys(targetChannel);
  }

  getTargetChannelSelect() {
    return this.targetChannelSelect.element(by.css('option:checked')).getText();
  }

  targetChannelSelectLastOption() {
    this.targetChannelSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setTargetSelect(target) {
    this.targetSelect.sendKeys(target);
  }

  getTargetSelect() {
    return this.targetSelect.element(by.css('option:checked')).getText();
  }

  targetSelectLastOption() {
    this.targetSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setNameInput(name) {
    this.nameInput.sendKeys(name);
  }

  getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  setSiteDomainInput(siteDomain) {
    this.siteDomainInput.sendKeys(siteDomain);
  }

  getSiteDomainInput() {
    return this.siteDomainInput.getAttribute('value');
  }

  setSiteUrlInput(siteUrl) {
    this.siteUrlInput.sendKeys(siteUrl);
  }

  getSiteUrlInput() {
    return this.siteUrlInput.getAttribute('value');
  }

  outerSelectLastOption() {
    this.outerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  outerSelectOption(option) {
    this.outerSelect.sendKeys(option);
  }

  getOuterSelect() {
    return this.outerSelect;
  }

  getOuterSelectedOption() {
    return this.outerSelect.element(by.css('option:checked')).getText();
  }

  mappingSelectLastOption() {
    this.mappingSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  mappingSelectOption(option) {
    this.mappingSelect.sendKeys(option);
  }

  getMappingSelect() {
    return this.mappingSelect;
  }

  getMappingSelectedOption() {
    return this.mappingSelect.element(by.css('option:checked')).getText();
  }

  configGroupSelectLastOption() {
    this.configGroupSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  configGroupSelectOption(option) {
    this.configGroupSelect.sendKeys(option);
  }

  getConfigGroupSelect() {
    return this.configGroupSelect;
  }

  getConfigGroupSelectedOption() {
    return this.configGroupSelect.element(by.css('option:checked')).getText();
  }

  targetGroupSelectLastOption() {
    this.targetGroupSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  targetGroupSelectOption(option) {
    this.targetGroupSelect.sendKeys(option);
  }

  getTargetGroupSelect() {
    return this.targetGroupSelect;
  }

  getTargetGroupSelectedOption() {
    return this.targetGroupSelect.element(by.css('option:checked')).getText();
  }

  save() {
    return this.saveButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
