import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTaskLabel(): Promise<string> {
    return element(by.css('.col-form-label')).getText();
  }
}
