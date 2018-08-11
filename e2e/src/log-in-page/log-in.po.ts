import { browser, by, element } from 'protractor';
import { AppPage } from '../app.po';
export class LogIn extends AppPage {
  navigateToLogin() {
    return browser.get('/login');
  }
  getForm() {
    return element(by.css('form[name=loginForm]'));
  }
  getEmailControl() {
    return element(by.css('input[formControlName=email]'));
  }
  getPasswordControl() {
    return element(by.css('input[formControlName=password]'));
  }
  getPasswordShowHideElement() {
    return element(by.css('div[name=showHidePassword]'));
  }
  getRememberMeToggle() {
    return element(by.css('input[name=rememberMeToggle]'));
  }
  getFormSubmitButton() {
    return element(by.css('button[type=submit]'));
  }
}
