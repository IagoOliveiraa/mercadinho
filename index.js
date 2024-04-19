const express = require("express");
const exphbs = require('express-handlebars');
const mysql2 = require('mysql2');

//express
const app = express();

//cofiguração do middleware para verificar a solicitação com o tipo de conteudo 
app.use(
    express.urlencoded({
        extended: true
    })
)

//configura o middlaware para analisar solicitações com o tipo de conteudo
app.use(express.json());

//configurações dp handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");


//configurando a primeira rota 
app.get('/', (req, res) => {
    //.res.send('mandando info na tela');
    res.render('home')//renderizando a home
});

//listando produtos
app.get("/lista", (req, res) => {
    const sql = "SELECT * from produtos"
  
    conn.query(sql, function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
  
      const lista = data;
      //console.log(lista);
      res.render("listas", { lista })
    });
  });

//cadastrando
app.post("/listas/insertProdutos", (req, res) => {
    const produto = req.body.Produto;
    const preco = req.body.Preco;
    const descricao = req.body.Descricao;

    //query do sql para cadastro
    const sql = `INSERT INTO produtos(Produto, Preco, Descricao) values ('${produto}', ${preco},'${descricao}')`
  
  
})

//listando e buscando
app.get('/lista/:id', (req,res)=>{
    const produtoID = req.params.produtoID;
    const sql = `SELECT * FROM Produtos WHERE produtoID=${produtoID}`;
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
          
        }
        const Detalhes = data[0];
        res.render("detalhes", { Detalhes }) 
    })

});


//removendo itens
app.post('/lista/remove/:id', (res,req)=>{
    const produtoID = req.params.produtoID;
    
    const sql = `DELETE FROM Produtos WHERE produtoID=${produtoID}`;
    conn.query(sql ,function(err){
        if(err)(
            console.log(err)
        )
        res.redirect ('/lista')
    });

});


//conectando com banco de dados 
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Mercadinho'
});

//configurando banco de dados
conn.connect(function (err) {
    if (err) {
        console.log(err);
    }
});

//porta e executando o projeto 
console.log('conectou ao MySQL');

app.listen(3000);