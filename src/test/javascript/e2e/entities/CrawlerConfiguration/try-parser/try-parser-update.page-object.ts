import { element, by, ElementFinder } from 'protractor';

export default class TryParserUpdatePage {
  pageTitle: ElementFinder = element(by.id('crawlerEngineApp.crawlerConfigurationTryParser.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  urlInput: ElementFinder = element(by.css('input#try-parser-url'));
  userAgentInput: ElementFinder = element(by.css('input#try-parser-userAgent'));
  htmlContentInput: ElementFinder = element(by.css('input#try-parser-htmlContent'));
  parsedContentInput: ElementFinder = element(by.css('input#try-parser-parsedContent'));
  selectorInput: ElementFinder = element(by.css('input#try-parser-selector'));
  selectorResultInput: ElementFinder = element(by.css('input#try-parser-selectorResult'));
  fetchEngineSelect: ElementFinder = element(by.css('select#try-parser-fetchEngine'));
  attributeSelectorInput: ElementFinder = element(by.css('input#try-parser-attributeSelector'));
  docTypeSelect: ElementFinder = element(by.css('select#try-parser-docType'));

  getPageTitle() {
    return this.pageTitle;
  }

  setUrlInput(url) {
    this.urlInput.sendKeys(url);
  }

  getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  setUserAgentInput(userAgent) {
    this.userAgentInput.sendKeys(userAgent);
  }

  getUserAgentInput() {
    return this.userAgentInput.getAttribute('value');
  }

  setHtmlContentInput(htmlContent) {
    this.htmlContentInput.sendKeys(htmlContent);
  }

  getHtmlContentInput() {
    return this.htmlContentInput.getAttribute('value');
  }

  setParsedContentInput(parsedContent) {
    this.parsedContentInput.sendKeys(parsedContent);
  }

  getParsedContentInput() {
    return this.parsedContentInput.getAttribute('value');
  }

  setSelectorInput(selector) {
    this.selectorInput.sendKeys(selector);
  }

  getSelectorInput() {
    return this.selectorInput.getAttribute('value');
  }

  setSelectorResultInput(selectorResult) {
    this.selectorResultInput.sendKeys(selectorResult);
  }

  getSelectorResultInput() {
    return this.selectorResultInput.getAttribute('value');
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
  setAttributeSelectorInput(attributeSelector) {
    this.attributeSelectorInput.sendKeys(attributeSelector);
  }

  getAttributeSelectorInput() {
    return this.attributeSelectorInput.getAttribute('value');
  }

  setDocTypeSelect(docType) {
    this.docTypeSelect.sendKeys(docType);
  }

  getDocTypeSelect() {
    return this.docTypeSelect.element(by.css('option:checked')).getText();
  }

  docTypeSelectLastOption() {
    this.docTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
