import express from 'express'
import path from 'path'

const APP_PORT = 3000

let app = express()

app.use('/', express.static(path.resolve(__dirname, '..', 'public')))
app.listen(APP_PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`App is running at http://localhost:${APP_PORT}`)
    }
})