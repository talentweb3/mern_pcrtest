
import Apply from '../models/apply.js';
import User from '../models/user.js';
import moment from 'moment';
// import sendgridMail from '@sendgrid/mail';
// import nodemailer from 'nodemailer';
import { generatePdfLab1 } from '../utils/generatePdfLab1.js';
import { generatePdfLab2 } from '../utils/generatePdfLab2.js';
import { generatePdfLab3 } from '../utils/generatePdfLab3.js';
import { generatePdfLab4 } from '../utils/generatePdfLab4.js';

export const addNewInfo = async (req, res) => {
    const check = await isExist();
    const time = Date.now();
    var createtime = moment(time).format('YYYY-MM-DD HH:mm:ss');
    var time2 = moment(time).clone().add(1, 'days');
    var validtime = time2.format('YYYY-MM-DD HH:mm:ss');

    const proBody = Object.assign(req.body, {'createAt':createtime},{'validAt':validtime});
    if (!check) {
      // console.log(proBody);
      Apply.create(proBody, (err, row) => {
        if (err) return res.send('server err')
        res.send(row);
      })
    } else {
      Apply.findOneAndUpdate({passport: proBody.passport}, proBody, (err, row) => {
        if (err) return res.send('server err')
        res.send(row);
      })
    }
}

export const approved = (req, res) => {
    
    res.send('success');
}

export const getProposalList = async(req, res) => {
  const proposals = await Apply.find();
  res.send(proposals);  
}

export const updateProposal = async (req, res) => {
  // console.log("update:", req.body);
  const time = Date.now();
  var updatetime = moment(time).format('YYYY-MM-DD HH:mm:ss');
  const proBody = Object.assign(req.body, {'createAt':updatetime});
  const proposal = await Apply.findByIdAndUpdate(req.param('id'), proBody);
  if (proposal) {
    res.send(proposal);
  } else {
    res.send('server err');
  }
}

export const deleteProposal = async (req, res) => {
  // console.log("delete:", req.body);
  const proposal = await Apply.findByIdAndDelete(req.param('id'));
  if (proposal) {
    res.send(proposal);
  } else {
    res.send('server err');
  }
}

export const fetchPdf = (req, res) => {

}

const isExist = async (passport) => {
    const check = await Apply.findOne({ passport: passport });
    if (check) {
        return true;
    } else {
        return false;
    }
}

export const getApproved = async(req, res) => {
  const time = Date.now();
  var resulttime = moment(time).format('YYYY-MM-DD HH:mm:ss');
  const proposal = await Apply.findByIdAndUpdate(req.param('id'), {'resultAt':resulttime, state:1});
  switch (proposal.docType) {
    case 1:
      await generatePdfLab1(proposal, `/upload/${proposal._id}.pdf`, proposal.validAt);
      break;
    case 2:
      await generatePdfLab2(proposal, `/upload/${proposal._id}.pdf`, proposal.validAt);
      break;
    case 3:
      await generatePdfLab3(proposal, `/upload/${proposal._id}.pdf`, proposal.validAt);
      break;
    case 4:
      await generatePdfLab4(proposal, `/upload/${proposal._id}.pdf`, proposal.validAt);
      break;
    default:
      break;
  }
  
  await Apply.findByIdAndUpdate(req.param('id'), {pdfUrl: `/upload/${req.param('id')}.pdf`});
  res.send('success');
}

export const getDeclined = async (req, res) => {
  const proposal = await Apply.findByIdAndUpdate(req.param('id'), {state: 3});  
  res.send('success');
}

export const viewRequest = async (req, res) => {
  // console.log("view",req.body);
  // const proposal = await Apply.findByIdAndUpdate(req.body, {state: 1});
  // await generatePdfLab2(proposal, `public/upload/${proposal._id}.pdf`);
  // await Apply.findByIdAndUpdate(req.param('_id'), {pdfUrl: `/upload/${req.param('_id')}.pdf`});
  const proposal1 = await Apply.findById(req.body);  
  const url = proposal1.pdfUrl;
  // console.log(url);
  var veiwUrl = `http://www.dhmlabs.com${url}`;
  res.send(veiwUrl);
}

// sendgridMail.setApiKey("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");

export const sendMail = async (req, res) => {
  
  // console.log(req.body);
  const proposal = await Apply.findById(req.body); 
  const user = await User.findById(proposal.userId);
  let email = user.email;
  let urlinfo = proposal.pdfUrl;  
  let name = proposal.name;
  // console.log(email, urlinfo, name);
  
  var realUrl;
  if (process.env.NODE_ENV !== 'production')
    realUrl = `http://localhost:8000/${urlinfo}`;
  else
    realUrl = `http://${process.env.PRODUCTION_URL}${urlinfo}`;
  res.send(realUrl);
  try {
      await new SendpdfEmail(user, realUrl).sendUrl();
      console.log(">>>>>>>>>");
    
      res.status(200).json({
          status: 'success',
          message: 'Success'
      });
  } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error'
      })
  }
}