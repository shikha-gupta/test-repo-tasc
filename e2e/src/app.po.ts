import { browser, protractor, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  getCurrentUrl() {
    return browser.getCurrentUrl();
  }
  getBaseUrl() {
    return browser.baseUrl;
  }
  getExpectedConditions() {
    return protractor.ExpectedConditions;
  }
  waitBrowser(condition, waitTime: number= 5000) {
    browser.wait(condition, waitTime);
  }
}
