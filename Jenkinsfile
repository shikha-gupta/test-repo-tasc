pipeline {
    agent any

    environment {
        ARTIFACTS_NAME  = "participant-ui.artifacts.${env.BUILD_NUMBER}"
        CONFIG_PATH = "node_modules/@tasc/bam-config"
        YARN_PARAMS = "--frozen-lockfile --strict --strict-semver --har --link-duplicates"
        SONAR_URI = "http://sonar.tasconline.com"
        REGION = "us-east-1"
    }

    stages {

        stage('Initialize') {

            agent { label 'nodejs8' }
            steps {
                milestone 1
                ansiColor('xterm'){
                    sh 'rm -rf log'
                    sh 'mkdir log'
                }
                loadPackageConfig()

            }
        }

        stage('Build') {

            agent { label 'nodejs8' }
            steps {
                milestone 2

                ansiColor('xterm'){
                    sh 'npm install'
                }

                loadConfig()
                loadBranches()
                stash includes: '**', name: ARTIFACTS_NAME
            }
       }

       stage('Unit Tests') {

            agent { label 'nodejs8' }
            when { branch "develop" }
            steps {
                sh ''
            }
        }

       stage('Environment') {

            agent none
            steps {
                milestone 3


                    timeout(5) {
                        script {
                            if (!env.ACCOUNTGROUP) {
                               def envChoices = env.ENV_CHOICES
                                   env.ACCOUNTGROUP = input message: '', ok: 'Next',
                               parameters: [choice(name: 'ACCOUNTGROUP', choices: "${envChoices}", description: 'AWS Account Group')]
                            }
                        }
                    }


                ansiColor('xterm'){
                sh """

                """
                }
            }
        }

        stage('Prefix') {

            agent none
            steps {
                milestone 4

                    timeout(5) {
                        script {
                            if (!env.DEPLOYPREFIX) {
                               def prefixChoices = env.PREFIX_CHOICES
                               env.DEPLOYPREFIX = input message: '', ok: 'Deploy',
                               parameters: [choice(name: 'DEPLOYPREFIX', choices: "${prefixChoices}", description: 'AWS Account Group')]
                            }
                        }
                    }

                ansiColor('xterm'){
                    sh """
                    """
                }
                validateNamespace()


            }
        }

        stage('PUX Web') {

                agent { label 'nodejs8' }
                steps {
                    deployUI("participant-ui")

                }

        }


        stage('Tests') {

             agent { label 'nodejs8' }
             steps {
                 milestone 10
                 ansiColor('xterm'){
                     sh """
                     """
                 }
             }
         }

        stage('Finalize') {

              agent { label 'nodejs8' }
              steps {
                  milestone 11
                  ansiColor('xterm'){
                      sh """
                      """
                  }
              }
          }


    }

    post {

        always {
            deleteDir()
        }
        failure {
            notify("failure")
        }

    }

}

def checksum(input) {

    withCredentials([[$class: 'UsernamePasswordMultiBinding',
                        credentialsId: "svc_${env.INSTANCE}_hash_salt",
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD']]) {

        def digest = java.security.MessageDigest.getInstance("SHA-256")
        def saltedInput = "input${PASSWORD}"
        digest.update( saltedInput.bytes )
        return new BigInteger(1,digest.digest()).toString(16).padLeft(64, '0')

    }

}

def s3Get(bucket, key, body) {

        withCredentials([[$class: 'UsernamePasswordMultiBinding',
                                credentialsId: "svc_aws_${env.ACCOUNT_ID}",
                                usernameVariable: 'AWS_ACCESS_KEY_ID',
                                passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {

             sh "aws s3api get-object --bucket ${bucket} --key ${key} ${body} || echo 'Unable to get metadata ${key}'"

        }

}

def s3Put(bucket, key, body) {


        withCredentials([[$class: 'UsernamePasswordMultiBinding',
                                credentialsId: "svc_aws_${env.ACCOUNT_ID}",
                                usernameVariable: 'AWS_ACCESS_KEY_ID',
                                passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {

            sh "aws s3api put-object --bucket ${bucket} --key ${key} --body ${body} || echo 'Unable to put metadata for ${key}'"

        }

}

def saveEnv() {

    sh "cp -r package.json log/package.json"
    sh(script: 'env|sort > log/env.txt', returnStdout: true)

}

def uploadLogs() {

    s3Put("${env.ACCOUNTGROUP}-${env.ACCOUNT_ID}-metadata", "${env.ACCOUNTGROUP}/${env.DEPLOYPREFIX}/${env.REGION}/${env.PREFIX}-bam-pipeline.metadata.json", "log/bam-pipeline.metadata.json")

    withCredentials([[$class: 'UsernamePasswordMultiBinding',
                            credentialsId: "svc_aws_${env.ACCOUNT_ID}",
                            usernameVariable: 'AWS_ACCESS_KEY_ID',
                            passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {

        sh "aws s3 cp ${env.WORKSPACE}/log s3://${env.ACCOUNTGROUP}-${env.ACCOUNT_ID}-metadata/${env.ACCOUNTGROUP}/${env.DEPLOYPREFIX}/${env.REGION}/bam-pipeline-${env.TIMESTAMP}-${env.UUID} --recursive"

    }

}

def loadPackageConfig() {

    def packageConfig = readJSON file: "package.json"
    env.PACKAGE_VERSION = packageConfig.version

}

def loadConfig() {

    def config = readJSON file: "${env.CONFIG_PATH}/conf/config.${env.INSTANCE}.json"
    env.ENV_CHOICES = config.envChoices
    env.PREFIX_CHOICES = config.prefixChoices

}

def loadRegions(account) {

   def config = readJSON file: "${env.CONFIG_PATH}/conf/config.${env.INSTANCE}.json"
   //env.REGION_CHOICES = config[account].regions.join('\n')
   env.REGION_CHOICES = "us-east-1"

}

def loadBranches() {

    def config = readJSON file: "${env.CONFIG_PATH}/conf/config.${env.INSTANCE}.json"
    env.BRANCH_CHOICES = config.branchChoices

}

def loadServerlessConfig() {

    def cloudSearch = readJSON file: "${env.CONFIG_PATH}/conf/cloudsearch/${env.ACCOUNTGROUP}.json"
    def cloudSearchEnv = cloudSearch[env.PREFIX][env.REGION]

    def cognito = readJSON file: "${env.CONFIG_PATH}/conf/cognito/${env.ACCOUNTGROUP}.json"
    def cognitoEnv = cognito[env.PREFIX][env.REGION]

    def rudi = readJSON file: "${env.CONFIG_PATH}/conf/rudi/${env.ACCOUNTGROUP}.json"
    def rudiEnv = rudi[env.PREFIX][env.REGION]

    withCredentials([[$class: 'UsernamePasswordMultiBinding',
                                credentialsId: "svc_aws_${env.ACCOUNT_ID}",
                                usernameVariable: 'AWS_ACCESS_KEY_ID',
                                passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {

            sh "aws dynamodbstreams list-streams --region ${env.REGION} --table-name fileUploads-${env.PREFIX} --limit 1 > fileUploads-${env.PREFIX}.json"
            sh "cat fileUploads-${env.PREFIX}.json"
            def fileUploadsJSON = readJSON file: "fileUploads-${env.PREFIX}.json"
            def fileUploads = fileUploadsJSON.Streams[0].StreamArn
            env.FILE_UPLOADS_STREAM_ARN = fileUploads

    }


    withCredentials([[$class: 'UsernamePasswordMultiBinding',
                                      credentialsId: "svc_${env.ACCOUNTGROUP}_idp_user",
                                      usernameVariable: 'USERNAME',
                                      passwordVariable: 'PASSWORD']]) {

        env.SERVERLESS_PARAMS = " --cognitopoolid '${cognitoEnv.cognitoPoolId}' --cognitopoolclientid '${cognitoEnv.cognitoPoolClientId}' --cognitoidp '${cognitoEnv.cognitoIdpUrl}' --globalsearch '${cloudSearchEnv.globalSearchUrl}' --filesearch '${cloudSearchEnv.fileSearchUrl}' --smsqueue 'arn:aws:kinesis:${env.REGION}:${env.ACCOUNT_ID}:stream/${PREFIX}-uba-sms-event-stream' --rudiendpoint '${rudiEnv.rudiUrl}' --username '${USERNAME}' --password '${PASSWORD}' --fileuploads '${env.FILE_UPLOADS_STREAM_ARN}'"
        env.SERVERLESS_KEY = "arn:aws:kms:us-east-1:335510014941:key/77d7cbfd-9173-48ca-a05f-23f82db4ca2f"

    }

}

def swapCFMOutputs(cfmArtifact) {

        withCredentials([[$class: 'UsernamePasswordMultiBinding',
                                credentialsId: "svc_aws_${env.ACCOUNT_ID}",
                                usernameVariable: 'AWS_ACCESS_KEY_ID',
                                passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
        sh "aws cloudformation describe-stacks --stack-name ${cfmArtifact}-${env.PREFIX} --output json --region ${env.REGION} > ${cfmArtifact}-d4-${env.PREFIX}.json"
        sh "cat ${cfmArtifact}-d4-${env.PREFIX}.json"
        def fileUploadLinesJSON = readJSON file: "${cfmArtifact}-d4-${env.PREFIX}.json"
        def fileUploads = fileUploadLinesJSON.Stacks.Outputs[0].OutputValue[0]
        echo "fileUploads:  ${fileUploads}"
        return "${fileUploads}"
        }

}

def rewriteCFMinFile(placeholder, cfmURL) {

    sh """
    sed -i -e 's|$placeholder|$cfmURL|g' ${env.WORKSPACE}/src/environments/environment.${env.PREFIX}.ts
    """

}

def deployUI(name) {

    sh 'npm install'
    validateEnv("${env.ACCOUNTGROUP}")

    env.CFM_COMMUNICATION = swapCFMOutputs("uba-ms-communication")
    rewriteCFMinFile("cfm_uba-ms-communication.ServiceEndpoint", "${env.CFM_COMMUNICATION}")

    env.CFM_CONFIG = swapCFMOutputs("uba-ms-config")
    rewriteCFMinFile("cfm_uba-ms-config.ServiceEndpoint", "${env.CFM_CONFIG}")

    env.CFM_PROFILE = swapCFMOutputs("uba-ms-profile")
    rewriteCFMinFile("cfm_uba-ms-profile.ServiceEndpoint", "${env.CFM_PROFILE}")

    env.CFM_PROFILECONFIG = swapCFMOutputs("uba-ms-profileConfig")
    rewriteCFMinFile("cfm_uba-ms-profileConfig.ServiceEndpoint", "${env.CFM_PROFILECONFIG}")

    env.CFM_ACCOUNT = swapCFMOutputs("uba-ms-account")
    rewriteCFMinFile("cfm_uba-ms-account.ServiceEndpoint", "${env.CFM_ACCOUNT}")

    env.CFM_REQUEST = swapCFMOutputs("uba-ms-request")
    rewriteCFMinFile("cfm_uba-ms-request.ServiceEndpoint", "${env.CFM_REQUEST}")

    env.CFM_CARD = swapCFMOutputs("uba-ms-card")
    rewriteCFMinFile("cfm_uba-ms-card.ServiceEndpoint", "${env.CFM_CARD}")

    env.CFM_LOOKUP = swapCFMOutputs("lookup")
    rewriteCFMinFile("cfm_lookup.ServiceEndpoint", "${env.CFM_LOOKUP}")

    env.CFM_FILE = swapCFMOutputs("uba-ms-file")
    rewriteCFMinFile("cfm_uba-ms-file.ServiceEndpoint", "${env.CFM_FILE}")

    env.CFM_SECURITY = swapCFMOutputs("uba-ms-security")
    rewriteCFMinFile("cfm_uba-ms-security.ServiceEndpoint", "${env.CFM_SECURITY}")


    sh "cat ${WORKSPACE}/src/environments/environment.${env.PREFIX}.ts"


    withCredentials([[$class: 'UsernamePasswordMultiBinding',
                            credentialsId: "svc_aws_${env.ACCOUNT_ID}",
                            usernameVariable: 'AWS_ACCESS_KEY_ID',
                            passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {

        sh "cp ${env.CONFIG_PATH}/conf/metadata.template.json ${env.PREFIX}-${name}.metadata.json"

        s3Get("${env.ACCOUNTGROUP}-${env.ACCOUNT_ID}-metadata", "${env.ACCOUNTGROUP}/${env.DEPLOYPREFIX}/${env.REGION}/${env.PREFIX}-${name}.metadata.json", "${env.PREFIX}-${name}.metadata.json")

        def metadata = readJSON file: "${env.PREFIX}-${name}.metadata.json"

             metadata.uuid = env.UUID
             metadata.timestamp = env.TIMESTAMP
             metadata.accountId = env.ACCOUNT_ID
             metadata.userId = env.BUILD_USER_ID
             metadata.classification = env.ACCOUNTGROUP
             metadata.prefix = env.PREFIX

            metadata.branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true)
            headCommit = sh(script: "git log -1 --format=format:%H", returnStdout: true)

            if(headCommit != metadata.commit) {

                metadata.commit = headCommit

                    sh """
                    npm run build
                    """

                    sh """
                    aws s3 rm s3://${env.PREFIX}-uba-${name} --recursive
                    aws s3 cp ./dist/tasc/ s3://${env.PREFIX}-uba-${name} --recursive --acl public-read
                    """

            } else {

                echo "Skipping ${name} - Commit head unchanged"

            }

            metadata.checksum = checksum("${metadata.uuid}${metadata.timestamp}${metadata.accountId}${metadata.userId}${metadata.classification}${metadata.version}${metadata.branch}${metadata.commit}")

            writeJSON file: "${env.WORKSPACE}/log/${env.PREFIX}-${name}.metadata.json", json: metadata, pretty: 4
            s3Put("${env.ACCOUNTGROUP}-${env.ACCOUNT_ID}-metadata", "${env.ACCOUNTGROUP}/${env.DEPLOYPREFIX}/${env.REGION}/${env.PREFIX}-${name}.metadata.json", "${env.WORKSPACE}/log/${env.PREFIX}-${name}.metadata.json")

    }

}

def validateEnv(account) {

    def config = readJSON file: "${env.CONFIG_PATH}/conf/config.${env.INSTANCE}.json"
    def accountId = config[account].accounts[0]

    env.ACCOUNT_ID = accountId

    withCredentials([[$class: 'UsernamePasswordMultiBinding',
                            credentialsId: "svc_aws_${accountId}",
                            usernameVariable: 'AWS_ACCESS_KEY_ID',
                            passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {


            sh "aws s3api create-bucket --bucket ${account}-${accountId}-metadata --region ${env.REGION} || echo 'Metadata bucket create failure.' > ${env.WORKSPACE}/log/config-bucket.log"

            def metadata = readJSON file: "${env.CONFIG_PATH}/conf/metadata.template.json"

            def uuid = UUID.randomUUID().toString()
            def now = new Date()

            metadata.uuid = uuid
            metadata.timestamp = now.format("yyyyMMdd-HH:mm:ss.SSS", TimeZone.getTimeZone('UTC'))
            metadata.accountId = accountId
            metadata.userId = env.BUILD_USER_ID
            metadata.classification = env.ACCOUNTGROUP
            metadata.version = env.PACKAGE_VERSION
            metadata.branch = env.GIT_BRANCH
            metadata.commit = env.GIT_COMMIT

            env.UUID = uuid
            env.TIMESTAMP = metadata.timestamp

            metadata.checksum = checksum("${metadata.uuid}${metadata.timestamp}${metadata.accountId}${metadata.userId}${metadata.classification}${metadata.version}${metadata.branch}${metadata.commit}")

            writeJSON file: "log/bam-pipeline.metadata.json", json: metadata, pretty: 4

    }

}

def validateNamespace() {

   env.ACCOUNTGROUPABBR = env.ACCOUNTGROUP.take(1)
   env.PREFIX = "${env.ACCOUNTGROUPABBR}${env.DEPLOYPREFIX}"

}


    def runUnitTests() {
        ansiColor('xterm'){
            sh 'npm test -- --browsers ChromeHeadless --reporters junit,spec --watch=false --codeCoverage'
        }
        junit allowEmptyResults: true, testResults: 'test-results/unit/tests.xml'
        cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'test-results/unit/cobertura-coverage.xml', conditionalCoverageTargets: '10, 0, 0', failNoReports: false, failUnhealthy: false, failUnstable: false, lineCoverageTargets: '10, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '10, 0, 0', onlyStable: false, packageCoverageTargets: '10, 0, 0', sourceEncoding: 'ASCII', zoomCoverageChart: false
    }

    def runCodeAnalysis() {
        ansiColor('xterm'){
            sh 'tslint --project ./tsconfig.json -c tslint.sonar.json "src/**/*.{ts,tsx}" -o pmd.xml -t pmd --force'
        }

        step([$class: 'PmdPublisher', pattern: '**/pmd.xml', unstableTotalAll:'500'])

        withCredentials([[$class: 'UsernamePasswordMultiBinding',
            credentialsId: 'sonar_svc_jenkins',
            usernameVariable: 'SONAR_USERNAME',
            passwordVariable: 'SONAR_PASSWORD']]) {

            sh "./node_modules/.bin/sonar-scanner -Dsonar.host.url=${env.SONAR_URI} -Dsonar.login=$SONAR_USERNAME -Dsonar.password=$SONAR_PASSWORD -Dsonar.projectKey=${env.SONAR_PROJECTKEY} -Dsonar.projectName=${env.SONAR_PROJECTNAME} -Dsonar.projectVersion=${env.BUILD_NUMBER}"
        }
    }

def notify(state) {

   node('') {

        if(state == "success") {
            slackSend channel: '#operations', color: 'good', message: "Success: ${env.JOB_NAME.toLowerCase()} #${env.BUILD_NUMBER} ${env.BUILD_URL} ${env.PREFIX}"
        } else {
            slackSend channel: '#bamdev', color: '#CC0000', message: "Failed: ${env.JOB_NAME.toLowerCase()} #${env.BUILD_NUMBER} ${env.BUILD_URL} ${env.PREFIX}"
        }
   }
}
