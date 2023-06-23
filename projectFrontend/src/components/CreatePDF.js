import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    marginBottom: 2,
  },
});

const MyDocument = ({ offer }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Receipt</Text>
        <Text style={styles.content}>Receipt ID: {offer.id}</Text>
        <Text style={styles.content}>Name: {offer.customer.firstname} {offer.customer.lastname}</Text>
        <Text style={styles.content}>Email: {offer.customer.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Property Details</Text>
        <Text style={styles.content}>Property Name: {offer.property.name}</Text>
        <Text style={styles.content}>Address: {offer.property.address.street}, {offer.property.address.city}, {offer.property.address.state}, {offer.property.address.zipcode}</Text>
        <Text style={styles.content}>Square Feet: {offer.property.sqft}</Text>
        <Text style={styles.content}>Bedrooms: {offer.property.bedNo}</Text>
        <Text style={styles.content}>Bathrooms: {offer.property.bathNo}</Text>
        <Text style={styles.content}>Garage: {offer.property.garageNo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Transaction Details</Text>
        <Text style={styles.content}>Price: ${offer.property.price}</Text>
        <Text style={styles.content}>Status: {offer.status}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
