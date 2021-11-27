import fs from 'fs';
import PDFDocument from "pdfkit";
import { genQRcode } from './qrCode.js';
import moment from 'moment';

export const generatePdfLab4 = async (data, path, ret) => {
  let doc = new PDFDocument({ size: "A1", margin: 10 });
  const qrcode = await genQRcode(path);
  
  let qrresult = data.result==1?"POSITIVE":"NEGATIVE";
  let detect = data.result==1?"Detected":"Not Detected";
  const time = Date.now();
  var newYear = moment(time).format('YYYY');
  var birthYear = moment(data.birth).format('YYYY');
  var age = newYear-birthYear;
  doc
    .image('public/assets/img/lab4/background.png',0, 0) 
    .fontSize(40)
    .text(data.name, 50, 330, {width: 590, align: "center"})
    .text(data.passport, 50, 380, {width: 590, align: "center"})
    .fontSize(30)
    
    .text("", 50, 470, {width: 280, align: "center"})
    .text(age+" Year", 350, 470, {width: 150, align: "center"})
    .text(data.gender, 510, 470, {width: 140, align: "center"})
    .fontSize(25)
    .text(data.createAt, 860, 295, {width: 290, align: "left"})
    .text(ret, 860, 360, {width: 290, align: "left"})
    .text(data.createAt, 1280, 295, {width: 290, align: "left"})
    .text("", 1280, 360, {width: 290, align: "left"})
    
    
    .image(qrcode,150, 1910)
    .fontSize(25)
    .text(": "+qrresult, 540, 700)

  doc.end();
  return await doc.pipe(fs.createWriteStream(`public${path}`));
}

