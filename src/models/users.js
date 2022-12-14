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

const create = ({id, name, usia, tanggal_lahir, image1, image2, mobile, address, education}) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO users(id, name, usia, tanggal_lahir, image1, image2, mobile, asal_kota, education) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,[id, name, usia, tanggal_lahir, image1, image2, mobile, address, education], (err, result) =>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
            }
        })
    })
}

const update = ({id, name, usia, tanggal_lahir, image1, image2, mobile, address, education}) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE users SET name= $1, usia= $2, tanggal_lahir= $3, image1=$4, mobile=$5, asal_kota=$6, education=$7, image2=$8 WHERE id=$9` ,[ name, usia, tanggal_lahir, image1, mobile, address, education, image2, id], (err, result) =>{
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