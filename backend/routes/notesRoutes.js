// notesRoutes.js

import express from 'express';
import {
    getAllNotesController,
    getNoteByIdController,
    addNoteController,
    updateNoteController,
    deleteNoteController
} from '../controllers/notesController.js';

const router = express.Router();

router.get('/notes', getAllNotesController);
router.get('/notes/:id', getNoteByIdController);
router.post('/notes', addNoteController);
router.put('/notes/:id', updateNoteController);
router.delete('/notes/:id', deleteNoteController);

export default router;
