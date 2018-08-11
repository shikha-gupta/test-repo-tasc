import { LogIn } from './log-in.po';

describe('On Log in page',  () => {
  let page: LogIn;
  let EC: any;

  beforeEach(() => {
    page = new LogIn();
    EC = page.getExpectedConditions();
    page.navigateToLogin();
  });

  it('open log in page',  async () => {
    expect(page.getCurrentUrl()).toEqual(page.getBaseUrl() + '/login');
  });

  it('successful login and navigate to user profile',  async () => {
    expect(page.getCurrentUrl()).toEqual(page.getBaseUrl() + '/login');
    const loginForm =  page.getForm();
    const emailInput =  page.getEmailControl();
    const passwordInput =  page.getPasswordControl();
    const showHideButton =  page.getPasswordShowHideElement();
    const rememberMeToggle =  page.getRememberMeToggle();
    const formSubmitButton =  page.getFormSubmitButton();
    expect(formSubmitButton.getAttribute('disabled')).toBe('true');
    await emailInput.sendKeys('wq@yopmail.com');
    await passwordInput.sendKeys('Shikha@1234567');
    showHideButton.click();
    showHideButton.click();
    showHideButton.click();
    showHideButton.click();
    expect(formSubmitButton.getAttribute('disabled')).toBeNull();
    await formSubmitButton.submit();
    page.waitBrowser(EC.urlContains('settings'));

    expect(page.getCurrentUrl()).toEqual(page.getBaseUrl() + '/settings/user-profile');
  });
});
