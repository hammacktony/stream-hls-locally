const express = require('express')
const cors = require('cors')
const app = express()

const pid = process.pid
const port = process.env.PORT || 8080
const uiDir = process.env.UI_DIRECTORY || './dist/angular-client'
const dataDir = process.env.DATA_DIRECTORY || '../data/output'

app.use('*', cors())
app.use('/', express.static(uiDir))
app.use('/stream', express.static(dataDir))


console.info(`[${pid}] HLS Streaming server @ http://localhost:${port}`)
console.debug(`[${pid}] UI Directory @ ${uiDir}`)
console.debug(`[${pid}] Data Directory @ ${dataDir}`)


app.listen(port)