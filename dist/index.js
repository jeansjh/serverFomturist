"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var usuario_1 = __importDefault(require("./routes/usuario"));
var post_1 = __importDefault(require("./routes/post"));
var server = new server_1.default();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
server.app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
//configurar CORS
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
server.app.use('/user', usuario_1.default);
server.app.use('/post', post_1.default);
// Conectar mongo DB
var mongoose = require('mongoose');
// colocamos la url de conexión local y el nombre de la base de datos
mongoose.connect('mongodb://localhost:27017/fomturist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// levantar server
server.start(function () {
    console.log("Servidor corriendo en el puerto " + server.port);
});
