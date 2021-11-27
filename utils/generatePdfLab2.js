import fs from 'fs';
import PDFDocument from "pdfkit";
import { genQRcode } from './qrCode.js';

export const generatePdfLab2 = async (data, path, ret) => {
  let doc = new PDFDocument({ size: "A1", margin: 10 });
  const qrcode = await genQRcode(path);
  
  let qrresult = data.result==1?"POSITIVE":"NEGATIVE";
  let detect = data.result==1?"Detected":"Not Detected";
  let arabic = data.result==1?'public/assets/img/lab2/Positive.png':'public/assets/img/lab2/Negative.png'
  doc
    .image('public/assets/img/lab2/background.png',0, 0) 
    .font('Helvetica-Bold')
    .fontSize(30)
    .text(": "+data.name, 260, 483)
    .fontSize(32)
    .text(": "+data.gender, 370, 527)
    .text(": "+data.passport, 370, 573)
    .text(": "+data.birth, 370, 623)

    .fontSize(30)
    .text(data.name+" :", 250, 483, {width:1140, align:'right'})
    .fontSize(32)
    .text(data.gender+" :", 370, 527,{width:900, align:'right'})
    .text(data.passport+" :", 370, 577,{width:900, align:'right'})
    .text(data.birth+" :", 370, 627,{width:900, align:'right'})
    
    .text(" 201635168877", 450, 1375,{width:780, align:'right'})
    .text(" 3711822070", 450, 1420,{width:780, align:'right'})
    .text(" "+data.createAt, 450, 1465,{width:780, align:'right'})
    .text(" "+ret, 450, 1512,{width:780, align:'right'})

    .text(" 201635168877", 450, 1375)
    .text(" 3711822070", 450, 1420)
    .text(" "+data.createAt, 450, 1465)
    .text(" "+ret, 450, 1512)
    
    .image(qrcode,1400, 100)

    .text(": "+qrresult, 450, 1255)
    .image(arabic,1050 , 1240) 
    // .text(qrresult+" :", 450, 1255,{width:790, align:'right'})



  doc.end();
  return await doc.pipe(fs.createWriteStream(`public${path}`));
}

// const generateHeader = (doc, back) => {
//   doc
//     .image(back, 10, 10, { width: 150 })
//     // .image(qrcode, 10, 10, { width: 150 })
//     .fillColor("#ff0000")
//     .fontSize(50)
//     .text("dfds", 110, 57)
//     .fontSize(10)
//     .text('sdfsd', 200, 50, { align: "right" })
//     .text("123 Main Street", 200, 65, { align: "right" })
//     .text("New York, NY, 10025", 200, 80, { align: "right" })
//     .moveDown();
// }

// // const generateCustomerInformation = (doc, invoice) => {
// //   doc
// //     .fillColor("#444444")
// //     .fontSize(20)
// //     .text("Invoice", 50, 160);

// //   generateHr(doc, 185);

// //   const customerInformationTop = 200;

// //   doc
// //     .fontSize(10)
// //     .text("Invoice Number:", 50, customerInformationTop)
// //     .font("Helvetica-Bold")
// //     .text(invoice.invoice_nr, 150, customerInformationTop)
// //     .font("Helvetica")
// //     .text("Invoice Date:", 50, customerInformationTop + 15)
// //     .text(formatDate(new Date()), 150, customerInformationTop + 15)
// //     .text("Balance Due:", 50, customerInformationTop + 30)
// //     .text(
// //       formatCurrency(invoice.subtotal - invoice.paid),
// //       150,
// //       customerInformationTop + 30
// //     )

// //     .font("Helvetica-Bold")
// //     .text(invoice.shipping.name, 300, customerInformationTop)
// //     .font("Helvetica")
// //     .text(invoice.shipping.address, 300, customerInformationTop + 15)
// //     .text(
// //       invoice.shipping.city +
// //       ", " +
// //       invoice.shipping.state +
// //       ", " +
// //       invoice.shipping.country,
// //       300,
// //       customerInformationTop + 30
// //     )
// //     .moveDown();

// //   generateHr(doc, 252);
// // }

// // const generateInvoiceTable = (doc, invoice) => {
// //   let i;
// //   const invoiceTableTop = 330;

// //   doc.font("Helvetica-Bold");
// //   generateTableRow(
// //     doc,
// //     invoiceTableTop,
// //     "Item",
// //     "Description",
// //     "Unit Cost",
// //     "Quantity",
// //     "Line Total"
// //   );
// //   generateHr(doc, invoiceTableTop + 20);
// //   doc.font("Helvetica");

// //   for (i = 0; i < invoice.items.length; i++) {
// //     const item = invoice.items[i];
// //     const position = invoiceTableTop + (i + 1) * 30;
// //     generateTableRow(
// //       doc,
// //       position,
// //       item.item,
// //       item.description,
// //       formatCurrency(item.amount / item.quantity),
// //       item.quantity,
// //       formatCurrency(item.amount)
// //     );

// //     generateHr(doc, position + 20);
// //   }

// //   const subtotalPosition = invoiceTableTop + (i + 1) * 30;
// //   generateTableRow(
// //     doc,
// //     subtotalPosition,
// //     "",
// //     "",
// //     "Subtotal",
// //     "",
// //     formatCurrency(invoice.subtotal)
// //   );

// //   const paidToDatePosition = subtotalPosition + 20;
// //   generateTableRow(
// //     doc,
// //     paidToDatePosition,
// //     "",
// //     "",
// //     "Paid To Date",
// //     "",
// //     formatCurrency(invoice.paid)
// //   );

// //   const duePosition = paidToDatePosition + 25;
// //   doc.font("Helvetica-Bold");
// //   generateTableRow(
// //     doc,
// //     duePosition,
// //     "",
// //     "",
// //     "Balance Due",
// //     "",
// //     formatCurrency(invoice.subtotal - invoice.paid)
// //   );
// //   doc.font("Helvetica");
// // }

// // const generateFooter = (doc) => {
// //   doc
// //     .fontSize(10)
// //     .text(
// //       "Payment is due within 15 days. Thank you for your business.",
// //       50,
// //       780,
// //       { align: "center", width: 500 }
// //     );
// // }

// // const generateTableRow = (
// //   doc,
// //   y,
// //   item,
// //   description,
// //   unitCost,
// //   quantity,
// //   lineTotal
// // ) => {
// //   doc
// //     .fontSize(10)
// //     .text(item, 50, y)
// //     .text(description, 150, y)
// //     .text(unitCost, 280, y, { width: 90, align: "right" })
// //     .text(quantity, 370, y, { width: 90, align: "right" })
// //     .text(lineTotal, 0, y, { align: "right" });
// // }

// // const generateHr = (doc, y) => {
// //   doc
// //     .strokeColor("#aaaaaa")
// //     .lineWidth(1)
// //     .moveTo(50, y)
// //     .lineTo(550, y)
// //     .stroke();
// // }

// // const formatCurrency = (cents) => {
// //   return "$" + (cents / 100).toFixed(2);
// // }

// // const formatDate = (date) => {
// //   const day = date.getDate();
// //   const month = date.getMonth() + 1;
// //   const year = date.getFullYear();

// //   return year + "/" + month + "/" + day;
// // }