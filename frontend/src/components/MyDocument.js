import React from 'react';
import { Page, Text, View, Image, Font, Document, StyleSheet } from '@react-pdf/renderer';

const MyDocument = ({ data }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.headerb} fixed>
        Justificativa
      </Text>
      <Text style={styles.header} fixed>
        Cliente: {data.client}{'\n'}
        Código: {data.orderID} {'\n'}
        Telefone: {data.client_telefone} {'\n'}
        Data de ordem: {data.date} {'\n'}
      </Text>
      <Text style={{ fontSize: 13}}>Assunto. {'\n'} </Text>
      <Text style={styles.bodyb}>
        {data.justification}
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
)

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  bodyb: {
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  headerb: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: 'center',
    color: 'black',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export default MyDocument