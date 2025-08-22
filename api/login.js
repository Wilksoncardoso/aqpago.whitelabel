var bodyParser = require("body-parser");
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const port = 3000;


var allowlist = ['http://192.168.0.108', 'https://aqpago.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.use(cors(allowedOrigins));

app.post("/login-pj", cors(corsOptionsDelegate), async (req, res) => {
  const dadosLogin = req.body;

  try {
    // Aqui vamos fazer uma requisição para a API externa que processa o pagamento
    const response = await axios.post(
      "https://apiaqpago.aqbank.com.br/auth/login_pj",
      dadosLogin
    );
    if (response.status === 200) {
      return res
        .status(200)
        .json({
          mensagem: "Tudo certo !",
          id_result: response.data.autorization,
        });
    }
  } catch (error) {
    if (error.response.status === 401) {
      return  res.status(401).json({ mensagem: error.response.data.error });
    }else if (error.response.status === 500) {
      return res.status(500).json({ mensagem: error.response.data.error });
    }else{
      return res.status(405).json({ mensagem: error.response.data.error });
    }
  }
});

app.post("/login-pf", cors(corsOptionsDelegate), async (req, res) => {
  const dadosLogin = req.body;
  try {
    // Aqui vamos fazer uma requisição para a API externa que processa o pagamento
    const response = await axios.post(
      "https://apiaqpago.aqbank.com.br/auth/login_pf",
      dadosLogin
    );

    if (response.status === 200) {
      res
        .status(200)
        .json({
          mensagem: "Tudo certo !",
          id_result: response.data.autorization,
        });
    }
  } catch (error) {
    if (error.response.status === 401) {
      res.status(401).json({ mensagem: error.response.data.error });
    }
    else if (error.response.status === 500) {
      res.status(500).json({ mensagem: error.response.data.error });
    }else{
      return res.status(405).json({ mensagem: error.response.data.error });
    }
  }
});

module.exports = app;

// app.listen(port, () => {
//   console.log(`Servidor Express.js está sendo executado na porta ${port}`);
// });
