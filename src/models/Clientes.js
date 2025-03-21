/**
 * Modelo de dados para construção das coleções("tabelas")
 * Clientes
 */

//importação dos recursos do framework mongoose
const {model , Schema} = require('mongoose')
const { type } = require('os')

// criação da estrutura da coleção clientes
const clienteSchema = new Schema({
    nomeCliente: {type:String},
    foneCliente: {type:String},
    cpfCliente: {type:String, unique:true, index:true},
    dataCadastro: {type:Date,default:Date.now}

},//não versiona os dados armazenado
{versionKey:false})

// exporta para o main o modelo de dados
//Obs: Clientes será o nome da coleção
module.exports = model('Clientes',clienteSchema)