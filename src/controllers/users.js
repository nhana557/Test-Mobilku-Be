const { v4: uuidv4 } = require('uuid')
const modelUser = require('../models/users')
const { writeFile } = require("fs/promises")
const { resolve } = require("path")
const Sharp = require('sharp')
const common = require('../helper/common')
const cloudinary = require('../middlewares/caludinary')

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
            const fileImg1 = req.files.image[0].path
            const fileImg2 = req.files.image[1] ? req.files.image[1].path : undefined;
            const filename = `watermarked-${Date.now()}.jpg`
            let datas = {
                id: uuidv4(),
                name, mobile, usia, tanggal_lahir, address, education,
            }
            if(fileImg1){
                await Sharp(fileImg1)
                    .rotate()
                    .resize({
                        width: 500,
                        height: 500,
                    })
                    .jpeg({ mozjpeg: true })
                    .toBuffer()
                    .then(async (data) => {
                        await writeFile(resolve(`./src/uploads/${filename}`), data)
                        const result = await cloudinary.uploader.upload(`./src/uploads/${filename}`)
                        console.log(result.secure_url)
                        datas = {
                            ...datas,
                            image1: fileImg1 ? result.secure_url : null
                        }
                        console.log(datas)
                    })
                    .catch(err => { console.log(err) })
                }
                if(fileImg2){
                await Sharp(fileImg2)
                    .rotate()
                    .resize({
                        width: 1000,
                        height: 1000,
                    })
                    .jpeg({ mozjpeg: true })
                    .toBuffer()
                    .then(async (data) => {
                        await writeFile(resolve(`./src/uploads/${filename}`), data)
                        const result = await cloudinary.uploader.upload(`./src/uploads/${filename}`)
                        console.log(result.secure_url)
                        datas = {
                            ...datas,
                            image2: fileImg2 ? result.secure_url : null
                        }
                        console.log(datas)
                    })
                    .catch(err => { console.log(err) })
                }
                console.log(datas)
                await modelUser.create(datas)
                common.response(res, datas, "created success", 201 )
        } catch (error) {
            console.log( error)
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
                return;
            }
            const { name, mobile, usia, tanggal_lahir, address, education } = req.body;
            const fileImg1 = req.files.image[0].path
            const fileImg2 = req.files.image[1] ? req.files.image[1].path : undefined;
            const filename = `watermarked-${Date.now()}.jpg`
            let datas = {
                id,
                name, mobile, usia, tanggal_lahir, address, education,
            }
            if(fileImg1){
                await Sharp(fileImg1)
                    .rotate()
                    .resize({
                        width: 500,
                        height: 500,
                    })
                    .jpeg({ mozjpeg: true })
                    .toBuffer()
                    .then(async (data) => {
                        await writeFile(resolve(`./src/uploads/${filename}`), data)
                        const result = await cloudinary.uploader.upload(`./src/uploads/${filename}`)
                        console.log(result.secure_url)
                        datas = {
                            ...datas,
                            image1: fileImg1 ? result.secure_url : null
                        }
                        console.log(datas)
                    })
                    .catch(err => { console.log(err) })
                }
                if(fileImg2){
                await Sharp(fileImg2)
                    .rotate()
                    .resize({
                        width: 1000,
                        height: 1000,
                    })
                    .jpeg({ mozjpeg: true })
                    .toBuffer()
                    .then(async (data) => {
                        await writeFile(resolve(`./src/uploads/${filename}`), data)
                        const result = await cloudinary.uploader.upload(`./src/uploads/${filename}`)
                        console.log(result.secure_url)
                        datas = {
                            ...datas,
                            image2: fileImg2 ? result.secure_url : null
                        }
                        console.log(datas)
                    })
                    .catch(err => { console.log(err) })
                }
                console.log(datas)
                await modelUser.update(datas)
                common.response(res, datas, "updated success", 201 )
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = controllersUser