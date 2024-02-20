import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf-viewer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
  },
});

const Invoice = ({ invoiceData }) => (
  <PDFViewer width="100%" height="500px">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Invoice</Text>
          <Text>Cliente: {invoiceData.clientName}</Text>

          {/* Tabela */}
          <View style={styles.table}>
            {/* Cabeçalho da tabela */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>Item</Text></View>
              <View style={styles.tableCell}><Text>Descrição</Text></View>
              <View style={styles.tableCell}><Text>Quantidade</Text></View>
              <View style={styles.tableCell}><Text>Preço Unitário</Text></View>
              <View style={styles.tableCell}><Text>Total</Text></View>
            </View>

            {/* Linhas da tabela com dados da fatura */}
            {invoiceData.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCell}><Text>{item.itemNumber}</Text></View>
                <View style={styles.tableCell}><Text>{item.description}</Text></View>
                <View style={styles.tableCell}><Text>{item.quantity}</Text></View>
                <View style={styles.tableCell}><Text>{item.unitPrice}</Text></View>
                <View style={styles.tableCell}><Text>{item.total}</Text></View>
              </View>
            ))}
          </View>

          <Text>Total da Fatura: {invoiceData.totalAmount}</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default Invoice;
