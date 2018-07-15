import { element, by, ElementFinder } from 'protractor';

export default class ChannelOuterLinkUpdatePage {
  pageTitle: ElementFinder = element(by.id('crawlerEngineApp.crawlerConfigurationChannelOuterLink.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  configNameInput: ElementFinder = element(by.css('input#channel-outer-link-configName'));
  selectorNameInput: ElementFinder = element(by.css('input#channel-outer-link-selectorName'));
  selectorAttrInput: ElementFinder = element(by.css('input#channel-outer-link-selectorAttr'));
  hostInput: ElementFinder = element(by.css('input#channel-outer-link-host'));
  urlInput: ElementFinder = element(by.css('input#channel-outer-link-url'));

  getPageTitle() {
    return this.pageTitle;
  }

  setConfigNameInput(configName) {
    this.configNameInput.sendKeys(configName);
  }

  getConfigNameInput() {
    return this.configNameInput.getAttribute('value');
  }

  setSelectorNameInput(selectorName) {
    this.selectorNameInput.sendKeys(selectorName);
  }

  getSelectorNameInput() {
    return this.selectorNameInput.getAttribute('value');
  }

  setSelectorAttrInput(selectorAttr) {
    this.selectorAttrInput.sendKeys(selectorAttr);
  }

  getSelectorAttrInput() {
    return this.selectorAttrInput.getAttribute('value');
  }

  setHostInput(host) {
    this.hostInput.sendKeys(host);
  }

  getHostInput() {
    return this.hostInput.getAttribute('value');
  }

  setUrlInput(url) {
    this.urlInput.sendKeys(url);
  }

  getUrlInput() {
    return this.urlInput.getAttribute('value');
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
