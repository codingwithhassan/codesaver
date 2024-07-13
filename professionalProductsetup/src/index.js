
import connection from './db/index.js'
import dotenv from "dotenv"
import { app } from './app.js'
dotenv.config({
    path: './.env'
})


connection().then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server running on port ${process.env.PORT || 8080}`)
    })

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
})