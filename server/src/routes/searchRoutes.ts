import { Router } from 'express';
import { getSearch } from '../controllers/searchController';

const router = Router();

router.get('/', getSearch);

export default router;
