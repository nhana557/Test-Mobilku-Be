const { resolve } = require('path')
const db = require('../config/db')

const selectAll = () =>{
    return new Promise((resolve, reject) =>{
        db.query("select * from users", (err, result) =>{
            if(!err) {
                resolve(result)
            }else{
                reject(err)
            }
        })
    })
}
const selectById = (id) =>{
    return new Promise((resolve, reject) =>{
        db.query(`select * from users where id= $1`, [id], (err, result) =>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
            }
        })
    })
}

const create = ({id, name, usia, tanggal_lahir, image, mobile, address, education}) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO users(id, nama, usia, tanggal_lahir, photo, mobile, asal_kota, education) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,[id, name, usia, tanggal_lahir, image, mobile, address, education], (err, result) =>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
            }
        })
    })
}

const update = ({id, name, usia, tanggal_lahir, image, mobile, address, education}) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE users SET nama = $1, usia= $2, tanggal_lahir= $3, photo=$4, mobile=$5, asal_kota=$6, education=$7 WHERE id=$8` ,[ name, usia, tanggal_lahir, image, mobile, address, education, id], (err, result) =>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
            }
        } )
    })
}

module.exports = {
    selectAll,
    create,
    update,
    selectById
}