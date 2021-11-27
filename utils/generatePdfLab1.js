import fs from 'fs';
import PDFDocument from "pdfkit";
import { genQRcode } from './qrCode.js';


export const generatePdfLab1 = async (data, path,ret) => {
  let doc = new PDFDocument({ size: "A1", margin: 10 });
  const qrcode = await genQRcode(path);
  
  let qrresult = data.result==1?"POSITIVE":"NEGATIVE";
  let detect = data.result==1?"Detected":"Not Detected";
  doc
    .image('public/assets/img/lab1/background.png',0, 0) 
    .fillColor("#1e90ff")
    .fontSize(32)
    .font('Helvetica-Bold')
    .text("Name", 55, 279)
    .text("SEX", 55, 316)
    .text("Date Of Birth", 55, 353)
    .text("Referred by", 55, 390)
    .text("Receiving Date", 55, 440)
    .text("Insurance",55,490)
    .text("Company",55,527)
    .text("indication", 55, 564)

    .text("Clinic File  No.", 800, 279)
    .text("Lab File  No.", 800, 316)
    .text("Lab. Case  No.", 800, 353)
    .text("Clinic  Name", 800, 390)
    .text("Reporting", 800, 427)
    .text("Date",800, 464 )
    .text("Insurance No.",800, 526 )
    .text("ID No",800, 564 )

    .fillColor("#000")
    .fontSize(32)
    .text(": "+data.name, 320, 279)
    .text(": "+data.gender, 320, 316)
    .text(": "+data.birth, 320, 353)
    .text(": SELF", 320, 390)
    .text(": "+data.createAt, 320, 440)
    .text(": ", 320, 527)

    .text(": ", 1070, 279)
    .text(": 201632908464", 1070, 316)
    .text(": DAH201632908464", 1070, 353)
    .text(": Dar Alhekma", 1070, 390)
    .text(": "+ret, 1070, 445)
    .text(": "+data.passport,1070, 545)
    
    .image(qrcode,500, 2000)

    .text( detect,570, 750)
    .text( "("+qrresult+")", 570, 790)

  doc.end();
  return await doc.pipe(fs.createWriteStream(`public${path}`));
}
