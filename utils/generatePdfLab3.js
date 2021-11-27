import fs from 'fs';
import PDFDocument from "pdfkit";
import { genQRcode } from './qrCode.js';
import moment from 'moment';

export const generatePdfLab3 = async (data, path, ret) => {
  let doc = new PDFDocument({ size: "A1", margin: 10 });
  const qrcode = await genQRcode(path);
  
  let qrresult = data.result==1?"POSITIVE":"NEGATIVE";
  let detect = data.result==1?"Detected":"Not Detected";
  const time = Date.now();
  var newYear = moment(time).format('YYYY');
  var birthYear = moment(data.birth).format('YYYY');
  var age = newYear-birthYear; 
  console.log(newYear, birthYear);
  doc
    .image('public/assets/img/lab3/background.png',0, 0) 

    .fillColor("#000")
    .fontSize(28)
    .text(data.name, 245, 280)
    .text("", 245, 330)
    .text("", 245, 380)
    .text(data.gender, 245, 435)
    .text(age+"Y   /"+data.birth, 245, 485)
    .text("ASTER TECOM", 245, 545)
    .text("", 245, 590)


    .text("2093058", 1230, 280)
    .text("041121ASTT0041", 1230, 330)
    .text("", 1230, 380)
    .text(data.passport, 1230, 435)
    .text("", 1230, 475)
    .text(data.createAt, 1230, 545)
    .text(ret, 1230, 590)
    
    .image(qrcode,1400, 40)

    .text(detect+" ("+qrresult+")",470, 765)


  doc.end();  
  return await doc.pipe(fs.createWriteStream(`public${path}`));

}

