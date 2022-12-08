const express = require('express'); 
const app = express()
const Router = require('./src/routers/users')


app.use(express.urlencoded({ extended: true}))

app.use("/", Router)
app.use("/img", express.static(`./src/uploads`))
app.all("*", (req, res, next) =>{
    res.json({
        message: "error"
    })
})
app.use((err, req, res, next) =>{
    res.json({
        message: "error"
    })
})


app.listen(5000, () =>{
    console.log(`server running on http://localhost:${5000}`)
})