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
    }
}