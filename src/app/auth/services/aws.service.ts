import { Injectable } from '@angular/core';
import { LocalStorageService,
          SessionStorageService,
          LocalStorage,
          SessionStorage
        } from 'angular-web-storage';

import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { attributeName } from 'aws-sdk/clients/sns';
import { callbackify } from 'util';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(environment.aws);

@Injectable()
export class AWSService {
  public userEmail = this.session.get('userEmail') || '';
  public phone_number = this.session.get('phone_number') || '';
  public userData = {
    Username : this.userEmail,
    Pool : userPool
  };
  cognitoUser = new AmazonCognitoIdentity.CognitoUser(this.userData);
  authenticationDetailsForFirstSession;

  constructor( private session: SessionStorageService,
      private router: Router,
      private toastr: ToastrService,
      private spinnerService: Ng4LoadingSpinnerService ) {}

  signIn(emailId, password, noRedirection) {
    const authenticationData = {
      Username : emailId,
      Password : password
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    this.userEmail = emailId;
    const userData = {
        Username : emailId,
        Pool : userPool
    };
    this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        this.session.set('accessToken', accessToken);
        this.session.remove('authenticationDetailsForFirstSession');
        this.spinnerService.hide();
        if (!noRedirection) {
          // manual login
          this.isTwoFactorVerificationDone();
        }
      },

      onFailure: (err) => {
        if (err.code === 'UserNotConfirmedException') {
          this.session.set( 'userEmail', emailId);
          this.userEmail = emailId;
          this.router.navigate(['/signup/verify']);
        }
        if (!noRedirection) {
          this.toastr.error(err.message);
        }
        this.spinnerService.hide();
      }
    });
  }

  signUp(emailId, password, callback) {
    const cognitoAttributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name : 'email',
        Value : emailId
      })
    ];

    const authenticationData = {
      Username : emailId,
      Password : password
    };
    this.session.set('authenticationDetailsForFirstSession', new AmazonCognitoIdentity.AuthenticationDetails(authenticationData));

    userPool.signUp(emailId, password, cognitoAttributeList, null, callback);
  }

  emailVerification(code, callback) {
    this.userEmail = this.session.get('userEmail');
    this.userData  = {
      Username : this.userEmail,
      Pool : userPool
    };
    this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(this.userData);

    this.cognitoUser.confirmRegistration(code, true, callback);
  }

  getUserSession = () => {
    this.authenticationDetailsForFirstSession = this.session.get('authenticationDetailsForFirstSession') ?
        this.session.get('authenticationDetailsForFirstSession') : {};
    this.signIn(this.authenticationDetailsForFirstSession.username, this.authenticationDetailsForFirstSession.password, true);
  }

  updateAttributeAndConfirmSignUp( firstname, lastname, callback ) {
    const attributeList = [];
    const name = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name : 'name',
      Value : firstname + ' ' + lastname
    });
    attributeList.push(name);

    this.cognitoUser.updateAttributes(attributeList, callback);
  }

  updateAttribute( oData, callback ) {
    if (Object.keys(oData).length > 0) {
      const attributeList = [];
      for (const i in oData) {
        if (oData.hasOwnProperty(i)) {
          const toUpdate = new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: i,
            Value: oData[ i ]
          });
          attributeList.push(toUpdate);
        }
      }
      this.cognitoUser.updateAttributes(attributeList, callback);
    }
  }

  getAttributeVerification(attribute, callback) {
    this.cognitoUser.getAttributeVerificationCode(attribute, callback );
  }

  resendEmailVerificationCode() {
    this.userEmail = this.session.get('userEmail');
    this.userData  = {
      Username : this.userEmail,
      Pool : userPool
    };
    this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(this.userData);
    this.cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        this.spinnerService.hide();
        this.toastr.info(err.message, '', {
          positionClass: 'toast-top-right'
        });
        return;
      }
      this.spinnerService.hide();
      this.toastr.info('Successfully sent code to ' + this.userEmail, '', {
        positionClass: 'toast-top-right'
      });
    });
  }

  resendVerificationCode(callback) {
    this.cognitoUser.resendConfirmationCode(callback);
  }

  verifyCodeByAttribute(attribute, verificationCode, callback) {
    this.cognitoUser.verifyAttribute(attribute, verificationCode, callback);
  }

  userHasValidSession() {
    return new Promise((resolve, reject) => {
      this.cognitoUser = userPool.getCurrentUser();
      if (this.cognitoUser === null) {
        reject(false);
      }
      this.cognitoUser.getSession(function(err, session) {
        if (err) {
          reject(false);
        }
        console.log('session validity: ' + session.isValid());
        resolve(session.isValid());
      });
    });
  }

  signOut() {
    this.spinnerService.show();
    this.cognitoUser.signOut();
    setTimeout(() => {
      this.session.clear();
      this.spinnerService.hide();
    }, 100);
    this.router.navigate(['/']);
  }

  forgotPaswword(emailId, resent) {
    this.spinnerService.show();
    this.session.set('forgot-email', emailId);
    this.userData = {
      Username : emailId,
      Pool : userPool
    };
    this.userEmail = this.session.set('userEmail', this.userData.Username);
    this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(this.userData);
    this.cognitoUser.forgotPassword({
      onSuccess: (data) => {
        this.spinnerService.hide();
        this.session.set('forgot-code-destination', data.CodeDeliveryDetails.Destination);
        if (resent) {
          this.toastr.info('Code resent successfully.');
          return;
        }
        this.router.navigate(['/forgot-password/code']);
      },
      onFailure: (err) => {
        this.spinnerService.hide();
        if (err['code'] === 'UserNotFoundException') {
          this.router.navigate(['/signup']);
          this.toastr.error('No such user found, please create account.');
          return;
        }
        this.toastr.error(err.message);
      }
    });
  }

  // Reset Password AWS API
  resetPassword(data) {
    const verificationCode = data.verifycode;
    const newPassword = data.newpassword;
    this.userEmail = this.session.get('userEmail');
    this.userData  = {
      Username : this.userEmail,
      Pool : userPool
    };
    this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(this.userData);
    this.cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        this.spinnerService.hide();
        this.router.navigate(['forgot-password/success']);
      },
      onFailure: (err) => {
        this.spinnerService.hide();
        if (err['code'] === 'CodeMismatchException') {
          this.router.navigate(['forgot-password/code']);
        }
        this.toastr.error(err.message, '', {
          positionClass: 'toast-top-right',
          timeOut: 10000
        });
      }
    });
  }

  isTwoFactorVerificationDone() {
    const oAttributes: any = {};
    this.cognitoUser.getUserAttributes((err, attributes) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(attributes);
      // tslint:disable-next-line:no-shadowed-variable
      const nameArray = attributes.map(function (el) { return el['Name']; });
      const valueArray = attributes.map(function (el) { return el['Value']; });
      if (nameArray.indexOf('phone_number_verified') !== -1 && valueArray[nameArray.indexOf('phone_number_verified')]  === 'true') {
        // skip phone verification screen
        this.router.navigate(['settings/user-profile']);
        this.toastr.info('Successfully Logged In', '', {
          positionClass: 'toast-top-right'
        });
        return true;
      } else if (nameArray.indexOf('phone_number') !== -1) {
        // phone verification screen with pre filled phone number
        const keyIndex = nameArray.indexOf('phone_number');
        this.session.set('phone_number', valueArray[keyIndex]);
        this.moveToPhoneVerification();
        return valueArray[keyIndex];
      } else {
        this.moveToPhoneVerification();
        return false;
      }
    });
  }

  moveToPhoneVerification() {
    this.router.navigate(['authentication']);
  }

  /**
    * @description Change password
    * @param {string} oldPassword
    * @param {string} newPassword
    * @param {function} callback
  */
  changePassword(oldPassword, newPassword, callback) {
    this.cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
      if (err) {
        this.toastr.error(err.message);
        return;
      }
      this.toastr.info('Your password has been changed');
      callback();
  });
  }

}
