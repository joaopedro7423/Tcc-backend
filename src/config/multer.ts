/*aqui que se faz a gestão na hora de salvar os arquivos. 
  multer é uma dependencia npm só procurar seu mongol

*/
import { diskStorage, Options } from "multer";
import { resolve } from "path"; //isso é do proprio node. serve para usar com mais precisão as rotas de arquivos por exempro a base __dirname
import { randomBytes } from "crypto";

const uploadsDest = resolve(__dirname, "..", "..", "uploads"); //destino seu mongol, aonde que os arquivos vai parar

const multerConfig: Options = {
  //isso significa que a constante mlterConfig é do tipo Options
  dest: uploadsDest,
  storage: diskStorage({
    //isso é para salvar aqui mesmo, no nosso projeto
    destination: (request, file, callback) => {
      callback(null, uploadsDest);
    },
    filename: (request, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename); // retorna o error e o nome do arquivo que deu error
        }
        const extension = file.mimetype.replace("image/", "");
        const filename = `${hash.toString("hex")}.${extension}`; //ou subistituir o extension por file.mimetype mas a info do tipo so ficaria aqui e não repassaria para outros
        callback(null, filename);
      });
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, //tamanho máximo do arquivo que vai ser permitido é de 5MB
  },
  fileFilter: (request, file, callback) => {
    //serve essa função para filtrar o tipo de arquivo que vai aceitar.
    const formats = ["image/jpeg", "image/png", "image/jpg"];

    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Format not accepted"));
    }
  },
};

export default multerConfig;

/* ANOTAÇÕES GERAIS
resolve(__dirname, '..', '')  
        __dirname: pasta onde está;
        '..': quantidade que vai voltar/ geralmente fora do src;
        'algum nome de pasta': auto explicativo      
        
        
        file.mimetype: tipo de arquivo
*/
