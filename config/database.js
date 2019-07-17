if (process.env.NODE_ENV === 'production') {
    module.exports = require('./praod-database')
} else {
    module.exports = require('./dev-database')
}