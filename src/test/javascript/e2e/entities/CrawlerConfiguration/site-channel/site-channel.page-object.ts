import { element, by, ElementFinder } from 'protractor';

export default class SiteChannelComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  title: ElementFinder = element(by.id('site-channel-heading'));

  clickOnCreateButton() {
    return this.createButton.click();
  }

  getTitle() {
    return this.title;
  }
}
