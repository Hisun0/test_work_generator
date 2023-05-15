const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const run = require('./openai.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const makePdf = async () => {
  const text = await run();
  
  const docDefinition = {
    content: [
      { text: 'This is a header', style: 'header' },
      text,
      { text: 'Another text', style: 'anotherStyle' },
      { text: 'Multiple styles applied', style: [ 'header', 'anotherStyle' ] }
    ],
  
    styles: {
      header: {
        fontSize: 22,
        bold: true
      },
      anotherStyle: {
        italics: true,
        alignment: 'right'
      }
    }
  };
  await pdfMake.createPdf(docDefinition).download();
};

makePdf();
