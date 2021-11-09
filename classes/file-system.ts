import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem{

  constructor(){}

  guardarImagenTemporal(file: FileUpload, userId:string){

    return new Promise((resolve:any, reject)=>{

      //crear carpeta
      const path = this.crearCarpetaUsuario(userId);

      //nombre archivo
      const nombreArchivo = this.generarNombreUnico(file.name);

      //mover el archivo del temp a nuestra carpeta

      file.mv(`${path}/${nombreArchivo}`, (err:any) => {

        if (err){
          //no se puede mover
          reject(err);
        }else{
          //todo salio bien
          resolve();
        }

      });

    });





  }
  private generarNombreUnico( nombreOriginal:string ){
    //7.jpg
    const nombreArr = nombreOriginal.split( '.' );
    const extension = nombreArr[ nombreArr.length - 1 ];

    const idUnico = uniqid();

    return `${idUnico}.${extension}`;

  }

  private crearCarpetaUsuario(userId:string){
    const patUser= path.resolve(__dirname, '../uploads/', userId);
    const patUserTemp= patUser + '/temp';
    // console.log(patUser);

    const existe = fs.existsSync(patUser);
    if(!existe){
      fs.mkdirSync(patUser);
      fs.mkdirSync(patUserTemp);
    }

    return patUserTemp;

  }

  imagenesDeTempHaciaPost( userId: string ) {

      const pathTemp = path.resolve(  __dirname, '../uploads/', userId, 'temp' );
      const pathPost = path.resolve(  __dirname, '../uploads/', userId, 'posts' );

      if ( !fs.existsSync( pathTemp ) ) {
          return [];
      }

      if ( !fs.existsSync( pathPost ) ) {
          fs.mkdirSync( pathPost );
      }

      const imagenesTemp = this.obtenerImagenesEnTemp( userId );

      imagenesTemp.forEach( imagen => {
          fs.renameSync( `${ pathTemp }/${ imagen }`, `${ pathPost }/${ imagen }` );
      });

      return imagenesTemp;

  }

  private obtenerImagenesEnTemp( userId: string ) {

      const pathTemp = path.resolve(  __dirname, '../uploads/', userId, 'temp' );

      return fs.readdirSync( pathTemp ) || [];

  }

  getFotoUrl(userId:string, img:string){
    //Path POST
    const pathFoto = path.resolve(__dirname, '../uploads', userId, 'posts', img);
    //Si la imagen existe
    const existe = fs.existsSync(pathFoto);
    if(!existe){
      return path.resolve(__dirname, '../assets/400x250.jpg');
    }
    return pathFoto;
  }

}