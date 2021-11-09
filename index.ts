import Server from './classes/server';

import cors from 'cors';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

const server= new Server();

// Body parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

// FileUpload
server.app.use( fileUpload ({ useTempFiles: true }) );

//configurar CORS
server.app.use(cors({origin:true, credentials:true}));

server.app.use('/user',userRoutes);
server.app.use('/post',postRoutes);

// Conectar mongo DB
const mongoose = require('mongoose');
// colocamos la url de conexión local y el nombre de la base de datos
mongoose.connect('mongodb://localhost:27017/fomturist', {
  useNewUrlParser: true,
  useUnifiedTopology: true},(err:any) => {
    if(err) throw err;
    console.log('Base de datos ONLINE');
  });

// levantar server
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});