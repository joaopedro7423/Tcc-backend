import { Router } from 'express';
import CampusController from '../controller/CoursesController';
import { authenticate } from '../middleware/auth';
import { authRole } from '../middleware/authRole';

const coursesRoutes = Router();

const campusController = new CampusController();

//coursesRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação


//coursesRoutes.use(authRole(["professor", "adm"])); 
//coursesRoutes.use(onlyProfessor); //para um grupo específico ter acesso a rotas
//coursesRoutes.use(); //para um grupo específico ter acesso a rotas

coursesRoutes.post('/',campusController.create);

//coursesRoutes.get("/", authenticate, campusController.index); // assim se autentica individualmente

coursesRoutes.get('/', campusController.index);

coursesRoutes.get('/:id', campusController.show);
 // listar todos os cursos

 //listar todos os cursos dependentes do campo id
//coursesRoutes.get('/campus_id/:id', campusController.show); // listar todos os campus

coursesRoutes.put('/:id', campusController.update);

coursesRoutes.delete('/:id', campusController.destroy);

export default coursesRoutes;
