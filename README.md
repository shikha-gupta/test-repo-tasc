#### Step 1 : Download the Long Term Support (LTS) version of [node.js](https://nodejs.org/en/)
****
It provides javascript runtime and dependency management using [Node package management (npm)](https://www.npmjs.com/).

* node.js version 8.11.3

* npm version 6.1.0
    
#### Step 2 : Install [Angular CLI](https://cli.angular.io/)
****
It is a tool to initialize, develop, scaffold and maintain Angular applications.

* version 6.0.8

To install on Windows Operating system type command on command line application 
    
 ###### `npm install -g @angular/cli`

To install on Mac or Ubuntu operating system type command on terminal application 
    
 ###### `sudo npm install -g @angular/cli`
    
#### Step 3 : Install Git version control system if not installed on your machine before.<br/>
****
Please refer https://git-scm.com/downloads&hl=en-IN for installation instructions.
 
  After installing Git 
  1. Open terminal
  2. After installing Git, open command terminal & change directory where TASC source code will be cloned.

#### Step 4 : Checkout latest code branch from Bitbucket TASC repository
 *****
  `git clone https://user-name@bitbucket.org/tasconline/pux-web.git`
  
  `git checkout -b <new_feature_branch> origin/development`
    
#### Step 5 : Go to the project's root directory using command 
*****
 ###### `cd tasc-angular-test`

#### Step 6 : For installing project dependencies, run command
*****
 ###### `npm install` 

#### Step 7 : Run the project using command 
*****
 ###### `ng serve` 
 and view app running on http://localhost:4200/

#### Step 8 : Run the Test
*****
For Unit test cases
 ###### `ng test`
 
For End to End test cases
 ###### `ng e2e`



#### GIT Branch Structure to be followed
****
Please follow URL...

https://github.com/iParse/tasc-android-test/wiki/Git-Workflow
