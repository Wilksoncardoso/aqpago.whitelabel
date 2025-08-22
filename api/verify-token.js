var bodyParser = require('body-parser')
const express = require('express')
const app = express()
const axios = require('axios')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/login-verify-token-pj', async (req, res) => {
  const autorization = req.body.session_token
  const token_access = { token_access : req.body.token_access}


  try {
    // Aqui vamos fazer uma requisição para a API externa que processa o pagamento
    const response = await axios.post('https://apiaqpago.aqbank.com.br/auth/login_pj/'+ autorization, token_access)
      if (response.status === 200) {
        res.status(200).json({ result: response.data })
      }
      
   } 
   catch (error) {
   
    if(error.response.status === 401){
      res.status(401).json({ mensagem: error.response.data.error });
    }
    if(error.response.status === 500){
      res.status(500).json({ mensagem: error.response.data.error });
    }
   }
})
app.post('/login-verify-token-pf', async (req, res) => {
  const autorizationpf = req.body.session_token
  const token_accesspf = { token_access : req.body.token_access}

  try {
    // Aqui vamos fazer uma requisição para a API externa que processa o pagamento
    const response = await axios.post('https://apiaqpago.aqbank.com.br/auth/login_pf/'  + autorizationpf, token_accesspf)
    if (response.status === 200) {
      res.status(200).json({ result: response.data })
    }
   } 
   catch (error) {
   
    if(error.response.status === 401){
      res.status(401).json({ mensagem: error.response.data.error });
    }
    if(error.response.status === 500){
      res.status(500).json({ mensagem: error.response.data.error });
    }
   }
})
module.exports = app