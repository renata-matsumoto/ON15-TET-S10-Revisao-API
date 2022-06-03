const livrosModel = require("../models/livrosModels.json")

const findAllEbooks = (req, res) => {


    const {title = null, page = null, autor = null } = req.query

    try {

        let filterEbooks = livrosModel.slice()

        if(filterEbooks.length === 0 ) {
            return res.status(200).json ({
                message: "Ainda não possuímos livros cadastrados em nossa biblioteca!"
            })
        }

        if(autor) {
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook.autor.toLocaleLowerCase().includes(autor.toLocaleLowerCase())) 
        }
        
        if(title) {
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook.titulo.toLocaleLowerCase().includes(title.toLocaleLowerCase())) 
        }

           
        if(page) {
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook.paginas == page) 
        }
        
        if(filterEbooks.length === 0) { 

            throw new Error(" Desculpa, mas não foi possível encontrar nenhum resultado para sua busca")
        }

        res.status(200).json(filterEbooks)


    } catch (error) {
        console.error(error)
        console.log("query: ", req.query)

        res.status(404).json({
            "mensagem" : "Não foi possível",
            details: error.message
        })
    }

}

//res.send() - envia string - qualquer coisa
//res.render() - envia o view - htlm
//res.json() - coleção de dados []  ou recurso unico {}

const findById = (req, res) => {
    const id = req.params.id

    try {

        const findEbook = livrosModel.find(ebook => ebook.id == id)

        if (!findEbook) throw new Error(`Desculpa, não foi possível encontrar o livro com o id ${id}`)

        res.status(200).json(findEbook)

    } catch (error) {
        console.error(error)    
        res.status(404).json({
            message: "Poxa, desculpa, foi mal, ainda não possuimos esse livro no nosso catálogo.",
            details: error.message
        })
    }

    //proximo passo: verifica se o livro existe 
}

const findOneEbookByTitle = (req, res) => {
    //const req.query.authorName
    //autohorRequest

    const {title} = req.query 

    try {
        
        if(!title) throw new Error("Nenhum parâmetro inserido para realizar a busca")

        const findEbook = livrosModel.find(currentEbook => currentEbook.titulo.toLocaleLowerCase() == title.toLocaleLowerCase())
        if(!findEbook) throw new Error(`Desculpa, não foi possível encontrar o livro com nome ${title}`)

        res.status(200).json(findEbook)

    } catch (error) {

        console.error(error) 
        res.status(404).json({
            "message":"Desculpa, ainda não possuímos livros com esse título.",
            details: error.message
        })


    }
    
}

const createEbook = (req, res) => {
    const { titulo, paginas, autor } = req.body

    try {

        const id = livrosModel.length

        //.trim() - ele remove todos os espaços em branco caso o  usuário tente colocar espaços vazios

        if(titulo === null || titulo === undefined || titulo.trim() === "") {
            throw {
                statusCode: 400,
                message: "Não foi possível criar, título inválido!",
                details: `Não foi possível cadastrar o título, altere a informação ${titulo}.`
            }
        }

        const findEbookByTitle = livrosModel.find(ebook => ebook.titulo.toLocaleLowerCase() == titulo.toLocaleLowerCase())

        if(findEbookByTitle && findEbookByTitle.autor.toLocaleLowerCase() == autor.toLocaleLowerCase())
        {
            throw {
                statusCode: 409,
                message: "Já existe um livro com o mesmo título e autor.",
                details: "Já existe no sistema um livro com o mesmo título e autor."
            }    
        }

        const newEbook = {
            id, titulo, paginas, autor
        }

        console.log(newEbook)

        livrosModel.push(newEbook)
        console.table(livrosModel)

        res.status(201).json(newEbook)

    } catch (error){
        if(error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({"message": error.message})       
    }

}

module.exports = {
    // allEbooks: findAllebooks,
    findAllEbooks,
    findById,
    findOneEbookByTitle,
    createEbook
}