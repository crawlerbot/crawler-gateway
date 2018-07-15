/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import TryParserComponentsPage from './try-parser.page-object';
import TryParserUpdatePage from './try-parser-update.page-object';

const expect = chai.expect;

describe('TryParser e2e test', () => {
  let navBarPage: NavBarPage;
  let tryParserUpdatePage: TryParserUpdatePage;
  let tryParserComponentsPage: TryParserComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load TryParsers', async () => {
    navBarPage.getEntityPage('try-parser');
    tryParserComponentsPage = new TryParserComponentsPage();
    expect(await tryParserComponentsPage.getTitle().getText()).to.match(/Try Parsers/);
  });

  it('should load create TryParser page', async () => {
    tryParserComponentsPage.clickOnCreateButton();
    tryParserUpdatePage = new TryParserUpdatePage();
    expect(await tryParserUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /crawlerEngineApp.crawlerConfigurationTryParser.home.createOrEditLabel/
    );
  });

  it('should create and save TryParsers', async () => {
    tryParserUpdatePage.setUrlInput('url');
    expect(await tryParserUpdatePage.getUrlInput()).to.match(/url/);
    tryParserUpdatePage.setUserAgentInput('userAgent');
    expect(await tryParserUpdatePage.getUserAgentInput()).to.match(/userAgent/);
    tryParserUpdatePage.setHtmlContentInput('htmlContent');
    expect(await tryParserUpdatePage.getHtmlContentInput()).to.match(/htmlContent/);
    tryParserUpdatePage.setParsedContentInput('parsedContent');
    expect(await tryParserUpdatePage.getParsedContentInput()).to.match(/parsedContent/);
    tryParserUpdatePage.setSelectorInput('selector');
    expect(await tryParserUpdatePage.getSelectorInput()).to.match(/selector/);
    tryParserUpdatePage.setSelectorResultInput('selectorResult');
    expect(await tryParserUpdatePage.getSelectorResultInput()).to.match(/selectorResult/);
    tryParserUpdatePage.fetchEngineSelectLastOption();
    tryParserUpdatePage.setAttributeSelectorInput('attributeSelector');
    expect(await tryParserUpdatePage.getAttributeSelectorInput()).to.match(/attributeSelector/);
    tryParserUpdatePage.docTypeSelectLastOption();
    await tryParserUpdatePage.save();
    expect(await tryParserUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
