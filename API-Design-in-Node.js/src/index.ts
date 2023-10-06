import * as dotebnv from 'dotenv'
dotebnv.config()

import config from './config'

import app from "./server"

app.listen(config.port, () => {
    console.log(`Server listening on http://localhost:${config.port}`)
})