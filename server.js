//express para criar e configurar o servidor
const express = require('express')
const server = express()

const db = require("./db")

//const ideas = [
//    {
//        img: 'https://image.flaticon.com/icons/svg/2729/2729007.svg',
//        title: 'Cursos de Programação',
//        category:'Estudo',
//        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint dignissimos aliquam! Dicta quod praesentium ',
//       url:'https://rocketseat.com.br'

//    },
//    {
//        img:'https://image.flaticon.com/icons/svg/2729/2729044.svg',
//        title:'Dicas de Self Care',
//        category:'Saúde',
//        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint dignissimos aliquam! Dicta quod praesentium ',
//        url:'https://rocketseat.com.br'

//    },
 //   {
 //       img:'https://image.flaticon.com/icons/svg/2729/2729013.svg',
 //       title:'Receitas Divertidas',
 //       category:'Alimentação',
 //       description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint dignissimos aliquam! Dicta quod praesentium ',
 //       url:'https://rocketseat.com.br'

  //  },
  //  {
  //      img:'https://image.flaticon.com/icons/svg/2729/2729021.svg',
  //      title:'Jogos',
  //      category:'Lazer',
   //     description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint dignissimos aliquam! Dicta quod praesentium ',
   //     url:'https://rocketseat.com.br'

   // },
//]

//configurar arquivos estáticos (css, html, ..)
server.use(express.static('public'))

//habilitar uso do require.body:
server.use(express.urlencoded({extended: true}))

//configuração do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    express: server,  
    noCache: true,
})

//criar uma rota
//e capturar o pedido do cliente para responder
server.get('/', function(require, response) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return response.send("Erro no banco de dados")
       }
   
        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for  (let idea of reversedIdeas) {
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea)
    
            }
        }
    
        return response.render('index.html', {ideas: lastIdeas})
       })     

    //const = variável que não varia (constante)
    //let = variável que varia
    

})

server.get('/ideias', function(require, response) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
             console.log(err)
             return response.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse()

        return response.render('ideias.html', {ideas: reversedIdeas})

    })   
})

server.post("/", function(response, require) {
    
    //Inserir dados na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
        ) VALUES(?,?,?,?,?);
        `

const values = [
    require.body.image,
    require.body.title,
    require.body.category,
    require.body.description,
    require.body.link,
]

db.run(query, values, function(err) {
    if (err) {
        console.log(err)
        return response.send("Erro no banco de dados")
   }

   return response.redirect("/ideias")
})

})

//servidor ligado na porta 3000
server.listen(3000)