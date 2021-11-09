"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var uniqid_1 = __importDefault(require("uniqid"));
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    FileSystem.prototype.guardarImagenTemporal = function (file, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //crear carpeta
            var path = _this.crearCarpetaUsuario(userId);
            //nombre archivo
            var nombreArchivo = _this.generarNombreUnico(file.name);
            //mover el archivo del temp a nuestra carpeta
            file.mv(path + "/" + nombreArchivo, function (err) {
                if (err) {
                    //no se puede mover
                    reject(err);
                }
                else {
                    //todo salio bien
                    resolve();
                }
            });
        });
    };
    FileSystem.prototype.generarNombreUnico = function (nombreOriginal) {
        //7.jpg
        var nombreArr = nombreOriginal.split('.');
        var extension = nombreArr[nombreArr.length - 1];
        var idUnico = (0, uniqid_1.default)();
        return idUnico + "." + extension;
    };
    FileSystem.prototype.crearCarpetaUsuario = function (userId) {
        var patUser = path_1.default.resolve(__dirname, '../uploads/', userId);
        var patUserTemp = patUser + '/temp';
        // console.log(patUser);
        var existe = fs_1.default.existsSync(patUser);
        if (!existe) {
            fs_1.default.mkdirSync(patUser);
            fs_1.default.mkdirSync(patUserTemp);
        }
        return patUserTemp;
    };
    FileSystem.prototype.imagenesDeTempHaciaPost = function (userId) {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        var pathPost = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        var imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(function (imagen) {
            fs_1.default.renameSync(pathTemp + "/" + imagen, pathPost + "/" + imagen);
        });
        return imagenesTemp;
    };
    FileSystem.prototype.obtenerImagenesEnTemp = function (userId) {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    };
    FileSystem.prototype.getFotoUrl = function (userId, img) {
        //Path POST
        var pathFoto = path_1.default.resolve(__dirname, '../uploads', userId, 'posts', img);
        //Si la imagen existe
        var existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathFoto;
    };
    return FileSystem;
}());
exports.default = FileSystem;
