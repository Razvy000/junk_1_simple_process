var config = {};

config.mail = {}
config.mail.user = process.env.MAIL_USER || 'username'
config.mail.pass = process.env.MAIL_PASS || 'password'

module.exports = config