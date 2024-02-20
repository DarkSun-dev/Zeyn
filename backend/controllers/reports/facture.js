const stream = require('./stream')
var PdfPrinter = require('pdfmake')
const path = require('path')

exports.facture = async (data) => {
    var fonts = {
        Courier: {
            normal: 'Courier',
            bold: 'Courier-Bold',
            italics: 'Courier-Oblique',
            bolditalics: 'Courier-BoldOblique'
        },
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        },
        Times: {
            normal: 'Times-Roman',
            bold: 'Times-Bold',
            italics: 'Times-Italic',
            bolditalics: 'Times-BoldItalic'
        },
        Symbol: {
            normal: 'Symbol'
        },
        ZapfDingbats: {
            normal: 'ZapfDingbats'
        }
    }

    var printer = new PdfPrinter(fonts);
    var docDefinition = {
        pageSize: 'A4',
        content: [
            {
                columns: [
                    {
                        table:
                        {
                            headerRows: 1,
                            widths: [30, 300, 70, 70],
                            body: [
                                [
                                    { text: 'Qty', style: 'tableHeader', bold: true },
                                    { text: 'Item description', style: 'tableHeader', bold: true  },
                                    { text: 'Unit Price', style: 'tableHeader', bold: true  },
                                    { text: 'Total', style: 'tableHeader', bold: true  }
                                ],
                                [
                                    { text: '12' },
                                    { text: 'Alinhamento de direcao' },
                                    { text: '2500' },
                                    { text: '2500' }
                                ],
                                [
                                    { text: 'a' },
                                    { text: 'table' },
                                    { text: 'table' },
                                    { text: '.' }
                                ]
                            ]
                        }
                    }
                ]
            }
        ],
        styles: {
            notesTitle: {
                fontSize: 10,
                bold: true,
                margin: [0, 50, 0, 3],
            },
            notesText: {
                fontSize: 10,
            },
            header:{
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 10],
                alignment: 'center'
            },
            tableHeader: 
      {
      	border: true
      }
        },
        defaultStyle: {
            columnGap: 20,
            font: 'Courier'
        },
    }


    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    let writeStream = new stream.WritableBufferStream();
    pdfDoc.pipe(writeStream);

    pdfDoc.end()
    return new Promise((resolve, reject) => {
        const callback = () => {
            resolve(writeStream.toBuffer())
        }
        writeStream.on('finish', callback)
        //writeStream.end(callback)
    }
    )
}

