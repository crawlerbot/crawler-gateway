import { element, by, ElementFinder } from 'protractor';

export default class ConfigGroupUpdatePage {
  pageTitle: ElementFinder = element(by.id('crawlerEngineApp.crawlerConfigurationConfigGroup.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#config-group-name'));
  hostInput: ElementFinder = element(by.css('input#config-group-host'));
  currentLevelInput: ElementFinder = element(by.css('input#config-group-currentLevel'));
  expectResultTypeSelect: ElementFinder = element(by.css('select#config-group-expectResultType'));
  mappingSelect: ElementFinder = element(by.css('select#config-group-mapping'));

  getPageTitle() {
    return this.pageTitle;
  }

  setNameInput(name) {
    this.nameInput.sendKeys(name);
  }

  getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  setHostInput(host) {
    this.hostInput.sendKeys(host);
  }

  getHostInput() {
    return this.hostInput.getAttribute('value');
  }

  setCurrentLevelInput(currentLevel) {
    this.currentLevelInput.sendKeys(currentLevel);
  }

  getCurrentLevelInput() {
    return this.currentLevelInput.getAttribute('value');
  }

  setExpectResultTypeSelect(expectResultType) {
    this.expectResultTypeSelect.sendKeys(expectResultType);
  }

  getExpectResultTypeSelect() {
    return this.expectResultTypeSelect.element(by.css('option:checked')).getText();
  }

  expectResultTypeSelectLastOption() {
    this.expectResultTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
