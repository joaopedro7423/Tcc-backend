import { Router } from 'express';
import ProposalsController from '../controller/ProposalsController';
import { authenticate } from '../middleware/auth';
import { authRole } from '../middleware/authRole';

const proposalRoutes = Router();

const proposalController = new ProposalsController();

proposalRoutes.use(authenticate);

proposalRoutes.get('/', proposalController.index);

proposalRoutes.get(
  '/listByRoleAndCourse',
  proposalController.listProposalByRoleAndCourse,
);

//proposalRoutes.get("/", authenticate, proposalController.index); // assim se autentica individualmente

proposalRoutes.post('/', proposalController.create);

//proposalRoutes.put('/:id/upload', proposalController.uploadLogo);

proposalRoutes.put('/:id', proposalController.update);

proposalRoutes.get('/:id', proposalController.show);

proposalRoutes.patch('/:id', proposalController.chengeStatus); //patch é recomendado para alterar apenas 1 campo como nesse caso

proposalRoutes.delete('/:id', proposalController.destroy);

export default proposalRoutes;

/*
single('logo'): 'logo' fild name que vai ser passado no post no react no front carai

*/
