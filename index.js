const express = require("express");
const exphbs = require('express-handlebars');
const mysql2 = require('mysql2');

//express
const app = express();

//configura o middlaware para analisar solicitações com o tipo de conteudo
app.use(express.json());

//configurações dp handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");


//configurando a primeira rota 
app.get('/', (req, res)=>{
    //.res.send('mandando info na tela');
    res.render('home')//renderizando a home
});

//listando os produtos 
app.get('/lista', (req, res)=>{
    const sql = 'SELECT * FROM Produtos';
//função de conexao MySQL
    conn.query(sql, function(err, data){
        if(err) {
            console.log(err);
            return;
        }

        const lista = data;
        res.render('listas', { lista })


    })

});

//conectando com banco de dados 
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'Mercadinho'  
});

//configurando banco de dados
    conn.connect(function (err){
        if(err){
            console.log(err);
        }
    });

//porta e executando o projeto 
console.log('conectou ao MySQL'); 

app.listen(3000);