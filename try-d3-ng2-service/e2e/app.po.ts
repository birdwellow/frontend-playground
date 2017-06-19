import { browser, by, element } from 'protractor';

export class TryD3Ng2ServicePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
