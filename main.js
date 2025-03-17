/**
 * Processo Principal
 * Estudo do banco de dados MongoDB(CRUD)
 * @author Ryan Rodrigues Andrade
 */

//importação do modulo de conexão
const {conectar, desconectar} = require('./database.js')
//impotação do modelo de dados
const clienteModel = require('./src/models/Clientes.js')

//função para cadastrar um novo cliente
// Atenção!! para trabalhar com banco de dados usar sempre
// try catch
const salvarCliente = async (nomeCli,foneCli,cpfCli) => {
    try {
        //setar a estrutura de dados com os valores
        //obs:usar os mesmo nomes
        const novoCliente = new clienteModel({
            nomeCliente:nomeCli,
            foneCliente:foneCli,
            cpfCliente:cpfCli
        })
        //A linha abaixo salva os dados no banco de dados
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso")
    } catch (error) {
        console.log(error)
    }
}

//=============================================================================
const iniciarSistema = async ()  => {
    console.clear
    console.log("Estudo do MongoDB")
    console.log("-----------------------------------------")
    await conectar()
    //CRUD Create (inserção no banco de dados)
    await salvarCliente("kanye west","9667883324","539988761")
    await desconectar()
}

iniciarSistema()