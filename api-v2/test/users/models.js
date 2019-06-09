const utils = require('../utils')
const should = require('should')

const User = require('../../models/User')
const UserToken = req

describe('Users: models', function() {
    describe('#create()', function() {
        it('shoud create a new User', function(done) {
            let u = {
                name: 'Quang Le',
                email: 'quang@gmail.com',
                password: '123456',
            }

            User.create(u, function(err, createdUser) {
                should.not.exist(err)

                createdUser.name.should.equal('Quang Le')
                createdUser.email.should.equal('quang@gmail.com')
                createdUser.password.should.equal('123456')

                done()
            })
        })
    })
})