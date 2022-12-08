require('dotenv').config()
const express = require('express'); 
const app = express()
const Router = require('./src/routers/users')
const createError = require('http-errors')
const cors = require("cors")
const helmet = require('helmet')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors({
  origin: "*"
}))
app.use(helmet())
app.use("/", Router)
app.use("/img", express.static(`./src/uploads`))

app.all("*", (req, res, next) => {
    next(createError());
  });
  app.use((err, req, res, next) => {
    const statusCode = err.status;
    console.log(statusCode)
    if (res.status(statusCode)) {
      res.send(createError(statusCode, err));
    }
    next();
  });


app.listen(process.env.PORT, () =>{
    console.log(`server running on ${process.env.API_BACKEND}`)
})