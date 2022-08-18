const express = require('express');
const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "jornada-fullstack-agosto-22";

async function main(){


  console.log("Conectando com o banco de dados...")
  // const client = await MongoClient.connect(url);
  // const db = client.db(dbName);
  // const collection = db.collection("pontuacoes");

  console.log("Banco de dados conectado com sucesso")
  const app = express();

  app.use(express.json());

  app.get('/', function (req, res) {
    res.send('Hello, World!');
  })

  app.get('/oi', function (req, res){
      res.send('Olá, Mundo!');
  })

  // const lista = [
  //   {
  //     id: 1,
  //     nome: "Paulo",
  //     pontos: 90,
  //   },
  //   {
  //     id: 1,
  //     nome: "Romulo",
  //     pontos: 90,
  //   },
  //   {
  //     id: 1,
  //     nome: "Daniel",
  //     pontos: 90,
  //   },
  // ];

  app.get("/pontuacoes", async function(req, res) {
    const itens = await collection
    .find()
    .sort({ pontos: -1 }) // decrescente. Se quiser crescente, 1. Por nome, digitar nome no lugar de pontos e usar os números para ordenar (-1 ou 1)
    .limit(2)
    .toArray();
    
    res.send(itens);
  });

  app.post("/pontuacoes", async function(req, res) {
    const item = req.body;
    // console.log(item);

    // Adicionar o item à lista:
    // lista.push({
    //   id: lista.length + 1,
    //   nome: item.nome,
    //   pontos: item.pontos,
    // })
    await collection.insertOne(item)

    res.send(item);
  });

  app.listen(process.env.PORT || 3000)
}


main();