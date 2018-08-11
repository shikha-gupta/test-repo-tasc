import { browser, by, element } from 'protractor';
import { AppPage } from '../app.po';
export class SignUp extends AppPage {
  navigateToSignUp() {
    return browser.get('signup');
  }
  getForm() {
    return element(by.css('form[name=signUpForm]'));
  }
  getEmailControl() {
    return element(by.css('input[formControlName=email]'));
  }
  getPasswordControl() {
    return element(by.css('input[formControlName=password]'));
  }
  getPasswordShowHideButton() {
    return element(by.css('button[name=showHidePassword]'));
  }
  getFormSubmitButton() {
    return element(by.css('button[type=submit]'));
  }
}
