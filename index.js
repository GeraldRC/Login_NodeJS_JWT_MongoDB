const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

require('dotenv').config();

const app = express();

//capturar Body

app.use(bodyparser.urlencoded({ extended :false}));
app.use(bodyparser.json());

//Conexion a Base de 
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.3h7ng.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri,option)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

//import routes
const authRoutes  = require('./routes/auth');
//routes middlewares

app.use('/api/user', authRoutes);

app.get('/',(req, res) =>{
    res.json({
        estado : true,
        mensaje :'funciona'
    })
});


//Iniciar Server

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en Puerto ${PORT}`);
})