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
        db.query(`INSERT INTO users(id, name, age, date_of_birth, image, no_whatsapp, address, education) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,[id, name, age, date_of_birth, image, noWhatsapp, address, education], (err, result) =>{
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
        db.query(`UPDATE users SET name = $1, age= $2, date_of_birth= $3, image=$4, no_whatsapp=$5, address=$6, education=$7 WHERE id=$8` ,[ name, age, date_of_birth, image, noWhatsapp, address, education, id], (err, result) =>{
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