module.exports = {
    db: {
        production: "mongodb://quangle:admin123@ds135207.mlab.com:35207/minimum-prod",
        development: "mongodb://localhost/minimum-v2",
        test: "mongodb://localhost/minimum-v2-test"
    },
    port: 3000,
    mailer: {
        auth: {
            user: 'test@example.com',
            pass: 'secret',
        },
        defaultFromAddress: 'First Last <test@examle.com>'
    },
    googleClientID: '672674025045-ahrpo0151l2kkvrrscb5btdmrhmeihia.apps.googleusercontent.com',
    googleClientSecret: '96NMIjaiZA3SuBDDJw3qT2RZ' ,
    sendGridID: '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'
}