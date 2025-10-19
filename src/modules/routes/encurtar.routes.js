import express from 'express';
import { criarUrl, redirecionar, listarUrls, excluirUrl } from '../controllers/encurta.controller.js';

const router = express.Router();

router.post('/encurtar', criarUrl);
router.get('/urls', listarUrls);
router.get('/:code', redirecionar);
router.delete('/:code', excluirUrl);

export default router;
