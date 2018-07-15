import { element, by, ElementFinder } from 'protractor';

export default class ConfigMappingUpdatePage {
  pageTitle: ElementFinder = element(by.id('crawlerEngineApp.scraperSettingConfigMapping.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#config-mapping-name'));
  selectorInput: ElementFinder = element(by.css('input#config-mapping-selector'));
  hostInput: ElementFinder = element(by.css('input#config-mapping-host'));
  configNameInput: ElementFinder = element(by.css('input#config-mapping-configName'));
  attrInput: ElementFinder = element(by.css('input#config-mapping-attr'));
  dataTypeSelect: ElementFinder = element(by.css('select#config-mapping-dataType'));

  getPageTitle() {
    return this.pageTitle;
  }

  setNameInput(name) {
    this.nameInput.sendKeys(name);
  }

  getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  setSelectorInput(selector) {
    this.selectorInput.sendKeys(selector);
  }

  getSelectorInput() {
    return this.selectorInput.getAttribute('value');
  }

  setHostInput(host) {
    this.hostInput.sendKeys(host);
  }

  getHostInput() {
    return this.hostInput.getAttribute('value');
  }

  setConfigNameInput(configName) {
    this.configNameInput.sendKeys(configName);
  }

  getConfigNameInput() {
    return this.configNameInput.getAttribute('value');
  }

  setAttrInput(attr) {
    this.attrInput.sendKeys(attr);
  }

  getAttrInput() {
    return this.attrInput.getAttribute('value');
  }

  setDataTypeSelect(dataType) {
    this.dataTypeSelect.sendKeys(dataType);
  }

  getDataTypeSelect() {
    return this.dataTypeSelect.element(by.css('option:checked')).getText();
  }

  dataTypeSelectLastOption() {
    this.dataTypeSelect
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
