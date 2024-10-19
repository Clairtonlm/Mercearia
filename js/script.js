const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mercearia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Cliente = mongoose.model('Cliente', {
  nome: String,
  endereco: String,
  cpf: String,
  telefone: String,
  whatsapp: String
});

const Pedido = mongoose.model('Pedido', {
  nomeProduto: String,
  quantidade: Number,
  valor: Number,
  status: String
});

app.use(express.json());

app.post('/cadastro-cliente', (req, res) => {
  const cliente = new Cliente(req.body);
  cliente.save((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/cadastro-pedido', (req, res) => {
  const pedido = new Pedido(req.body);
  pedido.save((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.put('/atualizar-status-pedido/:id', (req, res) => {
  Pedido.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  }, { new: true }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
