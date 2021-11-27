import express from 'express';
import { approved, addNewInfo, getProposalList, updateProposal, deleteProposal, getApproved, getDeclined, viewRequest, sendMail } from '../controllers/applyController.js';


const router = express.Router();

router.get('/getProposals', getProposalList);
// router.get('/fetch-pdf', apply.fetchPdf);
router.post('/addNewInfo', addNewInfo);
router.post('/create-pdf', approved);
router.put('/updateProposal/:id', updateProposal);
router.put('/approved/:id', getApproved);
router.put('/declined/:id', getDeclined);
router.delete('/deleteProposal/:id', deleteProposal)
router.post('/viewRequest', viewRequest);
router.post('/sendMail', sendMail);

export default router;