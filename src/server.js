const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher- chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:7c7aeb0c-2e19-4c35-878c-9281d9a3caa1',
    key:'3ed0f760-fc0a-4f2b-bbc2-1da12a48439c:u1CxCyYVpfW1yQ5erGIzAMyzoW8s0IMCzvFGQ+zCpnA='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { username } = req.body 

    chatkit
    .creatUser({
        name: username,
        id: username
    })

    .then(() => res.sendStatus(201))
    .catch(error => {
        if (error.error_type === 'services/chatkit/user_already_exists') {
            res.sendStatus(200)
         } else {
             res.status(error.stateCode).json(error)

            }
    })
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})