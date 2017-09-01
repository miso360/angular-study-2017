import { browser, by, element } from 'protractor';

export class SimpleCommerceManagerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('scm-root h1')).getText();
  }
}
