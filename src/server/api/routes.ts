import { Router } from 'express';

const router = Router();

router.get('/get', (req, res) => {
  res.send('You got it.');
});
export default router;