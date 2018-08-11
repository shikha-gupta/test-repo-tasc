import { SignUp } from './sign-up.po';

describe('On sign up page',  () => {
  let page: SignUp;
  let EC: any;

  beforeEach(() => {
    page = new SignUp();
    EC = page.getExpectedConditions();
    page.navigateToSignUp();
  });

  it('open sign up page',  async () => {
    expect(page.getCurrentUrl()).toEqual(page.getBaseUrl() + '/signup');
  });

  it('fail sign up and navigate to user exist page',  async () => {
    expect(page.getCurrentUrl()).toEqual(page.getBaseUrl() + '/signup');
    const signUpForm =  page.getForm();
    const emailInput =  page.getEmailControl();
    const passwordInput =  page.getPasswordControl();
    const showHideButton =  page.getPasswordShowHideButton();
    const formSubmitButton =  page.getFormSubmitButton();
    expect(formSubmitButton.getAttribute('disabled')).toBe('true');
    await emailInput.sendKeys('xyz@yopmail.com');
    await passwordInput.sendKeys('Shikha@1234567');
    showHideButton.click();
    showHideButton.click();
    showHideButton.click();
    showHideButton.click();
    expect(formSubmitButton.getAttribute('disabled')).toBeNull();
    await signUpForm.submit();
    page.waitBrowser(EC.urlContains('signup'));

    expect(page.getCurrentUrl()).toEqual(page.getBaseUrl() + '/signup/user-exist');
  });
});
