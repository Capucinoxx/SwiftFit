import React from 'react'
import { StyleSheet } from 'react-native'
import Camera from './components/camera'
import Login from './components/login'

export default function App() {
  return (
    <Login />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
