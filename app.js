'use strict'

const SwaggerRestify = require('swagger-restify-mw'),
    mongoose = require('mongoose'),
    restify = require('restify'),
    config = require('config'),
    app = restify.createServer()

const swaggerConfig = {
        appRoot: __dirname // required config
    },
    dbConfig = config.get('mongo'),
    apiConfig = config.get('api')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.db_name}`)

SwaggerRestify.create(swaggerConfig, (err, swaggerRestify) => {
    if (err) throw err

    app.use(restify.gzipResponse())
    swaggerRestify.register(app)

    app.listen(process.env.PORT || apiConfig.default_port)
})
