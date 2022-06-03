const livrariasModel = require("../model/estabelecimentos.json")

const findAllLibrary = (req, res) => {
    const {
        nome = null, endereco = null, site = null
    } = req.query

    try {

        let filterLibrary = livrariasModel.slice()

        if (filterLibrary.length === 0) {
            return res.status(200).json({
                message: "Essa Livraria ainda não está cadastrada em nosso banco de dados."
            })
        }

        if (nome) {
            filterLibrary = filterLibrary.filter(currentLibrary => currentLibrary.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase()))
        }

        if (endereco) {
            filterLibrary = filterLibrary.filter(currentLibrary => currentLibrary.endereco.toLocaleLowerCase().includes(endereco.toLocaleLowerCase()))
        }

        if (site) {
            filterLibrary = filterLibrary.filter(currentLibrary => currentLibrary.site.toLocaleLowerCase().includes(site.toLocaleLowerCase()))
        }

        if (filterLibrary.length === 0) {
            throw new Error("Não foi possível encontrar nenhum resultado para sua busca")
        }

        res.status(200).json(filterLibrary)

    } catch (error) {
        console.error(error)

        res.status(404).json({
            "mensagem": "Não foi possível",
            details: error.message
        })
    }
}

const findLibraryById = (req, res) => {
    const id = req.params.id

    try {
        const findLibrary = livrariasModel.find(livrarias => livrarias.id == id)

        if (!findLibrary) throw new Error(`Desculpa não foi possível encontrar a livraria com o ID ${id}.`)

        res.status(200).json(findLibrary)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Ainda não possuímos essa Livraria no nosso cadastro.",
            details: error.message
        })
    }
}

const createLibrary = (req, res) => {
    const {
        nome,
        endereço,
        site
    } = req.body

    try {
        const id = livrariasModel.length

        if (nome === null || nome === undefined || nome.trim() === " ") {
            throw {
                statusCode: 400,
                message: "Não foi possível cadastrar, nome inválido !",
                details: `Não foi possível cadastrar o imóvel, ${nome} inválido.`
            }
        }

        const findLibraryBytitle = livrariasModel.find(ebook => ebook.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (findLibraryBytitle && findLibraryBytitle.endereço.toLocaleLowerCase() == endereço.toLocaleLowerCase()) {
            throw {
                statusCode: 409,
                message: "Já existe uma livraria com o mesmo nome e endereço.",
                details: "Já existe no sistema uma livraria com o mesmo nome e endereço."
            }
        }

        const newLibrary = {
            id,
            nome,
            endereço,
            site
        }

        console.log(newLibrary)

        livrariasModel.push(newLibrary)
        console.table(livrariasModel)

        res.status(201).json(newLibrary)


    } catch (error) {
        if (error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({
            "message": error.message
        })
    }
}

const updateLibraryAddress = (req, res) => {
    const {
        endereço
    } = req.query

    try {

        if (!endereço) throw new Error("Nenhuma livraria foi encontrada")

        let findLibrary = livrariasModel.filter(currentLibrary => currentLibrary.endereço.toLocaleLowerCase().includes(endereço.toLocaleLowerCase()))

        console.log(findLibrary)

        if (!findLibrary) throw new Error(`Não foi possível encontrar a livraria com o endereço ${endereço}.`)

        const newAddress = req.body.endereço
        livrariasModel.endereço = newAddress;
        console.log(newAddress)


        res.status(200).json([{
            "mensagem": "Endereço atualizado com sucesso",
            "Endereço-atualizado": newAddress,
            livrariasModel
        }])

    } catch (error) {

        res.status(500).json({
            message: error.message,
        })

    }
}

module.exports = {
    findAllLibrary,
    findLibraryById,
    createLibrary,
    updateLibraryAddress
}