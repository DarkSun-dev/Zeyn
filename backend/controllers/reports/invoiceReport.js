const stream = require('./stream')
var PdfPrinter = require('pdfmake')
const path = require('path')

exports.invoiceReport = async (data) => {
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
    };

    var printer = new PdfPrinter(fonts);

    var docDefinition = {
        pageSize: 'A4',
        content: [
            {
                columns: [
                    {
                        image: path.join(__dirname, 'img/logo.jpg'),
                        width: 150,
                        margin: [-20, -40] 
                    },
                    [
                        {
                            text: 'Factura',
                            color: '#333333',
                            width: '*',
                            fontSize: 28,
                            bold: true,
                            alignment: 'right',
                            margin: [0, 0, 0, 15],
                        },
                        {
                            stack: [
                                {
                                    columns: [
                                        {
                                            text: 'Inv. no.',
                                            color: '#aaaaab',
                                            bold: true,
                                            width: '*',
                                            fontSize: 12,
                                            alignment: 'right',
                                        },
                                        {
                                            text: '00001',
                                            bold: true,
                                            color: '#333333',
                                            fontSize: 12,
                                            alignment: 'right',
                                            width: 100,
                                        },
                                    ],
                                },
                                {
                                    columns: [
                                        {
                                            text: 'Data de emissão',
                                            color: '#aaaaab',
                                            bold: true,
                                            width: '*',
                                            fontSize: 12,
                                            alignment: 'right',
                                        },
                                        {
                                            text: new Date().toLocaleDateString('pt-PT'),
                                            bold: true,
                                            color: '#333333',
                                            fontSize: 12,
                                            alignment: 'right',
                                            width: 100,
                                        },
                                    ],
                                }
                            ],
                        },
                    ],
                ],
            },
            {
                columns: [
                    {
                        text: 'From',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 14,
                        alignment: 'left',
                        margin: [0, 20, 0, 5],
                    },
                    {
                        text: 'Cliente',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 14,
                        alignment: 'left',
                        margin: [0, 20, 0, 5],
                    },
                ],
            },
            {
                columns: [
                    {
                        text: 'Nuit: 401287817\n Tetelefone: (+258) 871010109\n Email: info@groupzeyn.com',
                        color: '#333333',
                        alignment: 'left',
                    },
                    {
                        text: `${data.client} \nCódigo de ordem: ${data.orderID}`,
                        bold: true,
                        color: '#333333',
                        alignment: 'left',
                    },
                ],
            },
            {
                columns: [
                    {
                        text: 'Endereço',
                        color: '#aaaaab',
                        bold: true,
                        margin: [0, 7, 0, 3],
                    }
                ],
            },
            {
                columns: [
                    {
                        text: 'Bairro Francisco Manyanga \n TETE',
                        style: 'invoiceBillingAddress',
                    }
                ],
            },
            '\n\n\n',
            {
                layout: {
                    defaultBorder: false,
                    hLineWidth: function (i, node) {
                        return 1;
                    },
                    vLineWidth: function (i, node) {
                        return 1;
                    },
                    hLineColor: function (i, node) {
                        if (i === 1 || i === 0) {
                            return '#bfdde8';
                        }
                        return '#eaeaea';
                    },
                    vLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    hLineStyle: function (i, node) {
                        // if (i === 0 || i === node.table.body.length) {
                        return null;
                        //}
                    },
                    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                    paddingLeft: function (i, node) {
                        return 10;
                    },
                    paddingRight: function (i, node) {
                        return 10;
                    },
                    paddingTop: function (i, node) {
                        return 2;
                    },
                    paddingBottom: function (i, node) {
                        return 2;
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        return '#fff';
                    },
                },
                table: {
                    headerRows: 1,
                    widths: ['*', 80],
                    body: data.rows
/*
                        [
                            {
                                text: 'Item 1',
                                border: [false, false, false, true],
                                margin: [0, 5, 0, 5],
                                alignment: 'left',
                            },
                            {
                                border: [false, false, false, true],
                                text: '$999.99',
                                fillColor: '#f5f5f5',
                                alignment: 'right',
                                margin: [0, 5, 0, 5],
                            },
                        ],
                        [
                            {
                                text: 'Item 2',
                                border: [false, false, false, true],
                                margin: [0, 5, 0, 5],
                                alignment: 'left',
                            },
                            {
                                text: '$999.99',
                                border: [false, false, false, true],
                                fillColor: '#f5f5f5',
                                alignment: 'right',
                                margin: [0, 5, 0, 5],
                            },
                        ],
*/
                },
            },
            '\n',
            '\n\n',
            {
                layout: {
                    defaultBorder: false,
                    hLineWidth: function (i, node) {
                        return 1;
                    },
                    vLineWidth: function (i, node) {
                        return 1;
                    },
                    hLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    vLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    hLineStyle: function (i, node) {
                        // if (i === 0 || i === node.table.body.length) {
                        return null;
                        //}
                    },
                    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                    paddingLeft: function (i, node) {
                        return 10;
                    },
                    paddingRight: function (i, node) {
                        return 10;
                    },
                    paddingTop: function (i, node) {
                        return 3;
                    },
                    paddingBottom: function (i, node) {
                        return 3;
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        return '#fff';
                    },
                },
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto'],
                    body: [
                        [
                            {
                                text: 'Subtotal',
                                border: [false, true, false, true],
                                alignment: 'right',
                                margin: [0, 5, 0, 5],
                            },
                            {
                                border: [false, true, false, true],
                                text: `${data.total}`,
                                alignment: 'right',
                                fillColor: '#f5f5f5',
                                margin: [0, 5, 0, 5],
                            },
                        ],
                        [
                            {
                                text: 'Total',
                                border: [false, true, false, true],
                                alignment: 'right',
                                margin: [0, 5, 0, 5],
                            },
                            {
                                border: [false, true, false, true],
                                text: `${data.total} (Mzn)`,
                                bold: true,
                                alignment: 'right',
                                fillColor: '#f5f5f5',
                                margin: [0, 5, 0, 5],
                            },
                        ]
                    ],
                },
            },
            '\n\n',
            {
                text: 'Processado por\n Zeyn, Orders system',
                style: 'notesText',
            },
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

async function produceRef(bi) {
    const b = bi
    const d = b.charAt(0)
    const d1 = b.charAt(9)
    const d2 = b.charAt(10)
    const d3 = b.charAt(11)
    const d4 = b.charAt(12)
    const codigo = 'ref00' + d1 + d2 + d3 + d4 + d + '@2kdomwriter'
    return new Promise((resolve, reject) => {
        resolve(codigo)
    })
}
