export const environment = {
    name: 'd6',
    timezone: 'America/Chicago',
    production: false,

    auth: {
        endpoint: 'https://d232bgk87b2sxs.cloudfront.net/',
        cognitoURI: 'https://d2-tasc-uba-admin-ui.auth.us-east-1.amazoncognito.com/',
        cognitoClientId: 'ntep169tetp0nlib7eq0f226m',
        clientId: '123AA'
    },

    logging: {
        apiKey: 'BGpwKRY2Hay7Ujb7zx0HgQ==',
        debugMode: true
    },

    services: {
        producerId: 'fd05b24c-0dd7-4af4-976e-844112dac9c3',
        idp: {
            endpoint: 'https://tlg5tv99le.execute-api.us-east-1.amazonaws.com/dev/auth/v1'
        },
        core: {
            endpoint: 'https://qmsbf5c548.execute-api.us-east-1.amazonaws.com/dev'
        },
        communication: {
            endpoint: 'cfm_uba-ms-communication.ServiceEndpoint'
        },
        configuration: {
            endpoint: 'cfm_uba-ms-config.ServiceEndpoint'
        },
        profile: {
            endpoint: 'cfm_uba-ms-profile.ServiceEndpoint'
        },
        profileConfiguration: {
            endpoint: 'cfm_uba-ms-profileConfig.ServiceEndpoint'
        },
        account: {
            endpoint: 'cfm_uba-ms-account.ServiceEndpoint'
        },
        request: {
            endpoint: 'cfm_uba-ms-request.ServiceEndpoint'
        },
        lookup: {
            endpoint: 'cfm_lookup.ServiceEndpoint'
        },
        card: {
            endpoint: 'cfm_uba-ms-card.ServiceEndpoint'
        },
        file: {
            endpoint: 'cfm_uba-ms-file.ServiceEndpoint'
        },
        security: {
            endpoint: 'cfm_uba-ms-security.ServiceEndpoint'
        },
    },
    aws: {
        UserPoolId : 'us-east-1_jwNCfjJxH',
        ClientId : 'ntep169tetp0nlib7eq0f226m'
    },
    awsRegion: 'us-east-1',
    phoneContryCode: '+1'
};
