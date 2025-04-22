import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to My App</Text>
      {children || <Text>No content available</Text>}  {/* Fallback if no children */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Layout;
