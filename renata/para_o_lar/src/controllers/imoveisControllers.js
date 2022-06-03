const imoveisModel = require("../model/imoveisModel.json")

const allImoveis = (req, res) => {

    const {titulo = null , endereco = null, metragem = null, valor = null } = req.query

    try {

        let filterImoveis = imoveisModel.slice()

        if(filterImoveis.length === 0 ) {
            return res.status(200).json({
                message: "Ok. Ainda não possuímos um imóvel com essas características em nosso banco de dados."
            })
        }

        if(titulo){
            filterImoveis = filterImoveis.filter(currentImoveis => currentImoveis.titulo.toLowerCase().includes(titulo.toLowerCase()))
        }

        if(endereco){
            filterImoveis = filterImoveis.filter(currentImoveis => currentImoveis.endereco.toLowerCase().includes(endereco.toLowerCase()))

        }

        if(metragem) {
            filterImoveis = filterImoveis.filter(currentImoveis => currentImoveis.metragem == metragem)
        }

        if(valor) {
            filterImoveis = filterImoveis.filter(currentImoveis => currentImoveis.valor == valor)
        }

        if(filterImoveis.length === 0) {
            throw new Error("Sorry, mas não foi possível encontrar nenhum resultado para sua busca, tente novamente.")
        }

        res.status(200).json(filterImoveis)
        
    } catch (error) {
        console.error(error)
        console.log("query:", req.query)

        res.status(404).json({
            "mensagem" : "Não foi possível encontrar.",
            details: error.message
        })
    }
}

const imoveisById = (req, res) => {
    const id = req.params.id

    try{

        const findImoveis = imoveisModel.find(imoveis => imoveis.id == id)

        if(!findImoveis) throw new Error(`Não foi possível encontrar o imóvel com o id ${id}.`)

        res.status(200).json(findImoveis)

    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: "O Imóvel não pode ser encontrado, tente novamente.",
            details: error.message
        })
    }
}




module.exports = {
    allImoveis,
    imoveisById,
  
}