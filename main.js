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
        if(error.code = 11000){
            console.log(`Erro: o CPF: ${cpfCli} já está cadastrado`)
         }else{
            console.log(error)
         }
    }
}

// listar clientes
//.sort({nomeCliente:1}) listar em ordem alfabetica
const listarClientes = async () =>{
    try {
        const clientes = await clienteModel.find().sort({nomeCliente:1})
        console.log(clientes)
    } catch (error) {
        console.log(error)
    }
}

// Função para buscar cliente pelo nome 
//find(
//{nomeCliente: new RegExp(nome, 'i')} ignora na busca letra minuscula ou maiuculas(i - case insensitive)
//)
const buscarNomeCliente = async (nome) => {
    try {
        const clienteNome = await clienteModel.find({nomeCliente: new RegExp(nome, 'i')})
        console.log(clienteNome)
    } catch (error) {
        console.log(error)
    }
}

// Função para buscar o cpf
const buscarCpfCliente = async (cpf) => {
    try {
        const clienteCpf = await clienteModel.find({cpfCliente: new RegExp(cpf)})
        console.log(clienteCpf)
    } catch (error) {
        console.log(error)
    }
}

// Função para editar os dados do cliente
//Atenção!! Usar o id do Cliente
const atualizarCliente = async (id, nomeCli, foneCli, cpfCli) => {
    try {
        const clienteEditado = await clienteModel.findByIdAndUpdate(id,{
            nomeCliente:nomeCli,foneCliente:foneCli,cpfCliente:cpfCli
        },{
            new:true,runValidators:true
        })
        console.log("dados do clientes alterados com sucesso")
    } catch (error) {
        if(error.code = 11000){
            console.log(`Erro: o CPF: ${cpfCli} já está cadastrado`)
         }else{
            console.log(error)
         }
    }
}
// Função para excluir cliente
const excluirCliente = async (id) => {
    try {
        const clienteDeletado = await clienteModel.findByIdAndDelete(id)
        console.log("Cliente Excluido com sucesso")
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
    //await salvarCliente("Enaldinho sequestrador de anão","89076553","81237890")
    
    //CRUD Read (Buscar cliente nome)
    //await buscarNomeCliente("anão")

    //CRUD Read (Buscar cliente cpf)
    //await buscarCpfCliente("846382626")
    
    //CRUD Read (Listar todos os clientes)
    //await listarClientes()

    //CRUD Update (atualiza os dados clientes)
    //await atualizarCliente("67d88165471dee1ec3192495","YE","(11)99123456" ,"539988761")

    //CRUD DELETE (apaga os dados do cliente)
    await excluirCliente("67d88165471dee1ec3192495")

    await desconectar()
}

iniciarSistema()