const { v4: uuidv4 } = require('uuid')
const modelUser = require('../models/users')
const { writeFile } = require("fs/promises")
const { resolve } = require("path")
const Sharp = require('sharp')
const common = require('../helper/common')

const controllersUser = {
    getUser: async (req, res, next) => {
        try {
            modelUser.selectAll()
                .then((data) => {
                    common.response(res, data.rows, "updated success", 200 )
                })
        } catch (error) {
            console.log(error)
        }
    },
    getById : async(req, res, next) =>{
        try {
            const id = req.params.id
            const { rows } = await modelUser.selectById(id)
            console.log(rows)
            common.response(res, rows[0], "Get data By id success", 200)
        } catch (error) {
            console.log(error)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const {name, mobile, usia, tanggal_lahir, address, education  } = req.body;
            const fileImg = req.files.image[0].path
            const filename = `watermarked-${Date.now()}.jpg`
            if(fileImg){
                Sharp(fileImg)
                    .rotate()
                    .resize({
                        width: 500
                    })
                    .jpeg({ mozjpeg: true })
                    .toBuffer()
                    .then(async (data) => {
                        await writeFile(resolve(`./src/uploads/${filename}`), data)
                    })
                    .catch(err => { console.log(err) })
            }
            const data = {
                id: uuidv4(),
                name, mobile, usia, tanggal_lahir, address, education,
                image: fileImg ? `${process.env.API_BACKEND}img/${filename}` : null
            }
            modelUser.create(data)
            common.response(res, data, "created success", 201 )

        } catch (error) {
            console.log("hallo", error)
        }
    },
    update: async(req, res, next) =>{
        try {
            const id = req.params.id
            console.log(id)
            const { rows: [data]} = await modelUser.selectById(id)
            console.log(data)
            if(!data){
                common.response(res, null, "ID Not Found", 403 )

            }
            const { name, mobile, usia, tanggal_lahir, address, education } = req.body;
            const fileImg = req.files.image[0].path
            const filename = `watermarked-${Date.now()}.jpg`
            if(fileImg){
                Sharp(fileImg)
                    .rotate()
                    .resize({
                        width: 1000
                    })
                    .jpeg({ mozjpeg: true })
                    .toBuffer()
                    .then(async (data) => {
                        await writeFile(resolve(`./src/uploads/${filename}`), data)
                    })
                    .catch(err => { console.log(err) })
            }
            const datas = {
                id,
                name, mobile, usia, tanggal_lahir, address, education,
                image: fileImg ? `${process.env.API_BACKEND}img/${filename}` : null
            }
            modelUser.update(datas)
            common.response(res, datas, "updated success", 200 )
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = controllersUser