// routes/ai.js (Express route)
import express from 'express';
import { getGeminiResponse } from '../service/ai.service.js';

const router = express.Router();

router.post('/prompt', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await getGeminiResponse(prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'AI failed to respond' });
    console.log(error);
    
  }
});

export default router;
