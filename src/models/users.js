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

const create = ({id, name, age, date_of_birth, image, noWhatsapp, address, education}) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO users(id, nama, umur, tanggal_lahir, photo, no_whatsapp, asal_kota, pendidikan_terakir) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,[id, name, age, date_of_birth, image, noWhatsapp, address, education], (err, result) =>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
            }
        })
    })
}

const update = ({id, name, age, date_of_birth, image, noWhatsapp, address, education}) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE users SET nama = $1, umur= $2, tanggal_lahir= $3, photo=$4, no_whatsapp=$5, asal_kota=$6, pendidikan_terakir=$7 WHERE id=$8` ,[ name, age, date_of_birth, image, noWhatsapp, address, education, id], (err, result) =>{
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