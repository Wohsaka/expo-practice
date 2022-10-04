import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import Camera from './src/Camera'
import LocationPermissions from './src/LocationPermissions'
import Notifications from './src/Notifications'

export default function App() {
  return (
    <View style={styles.container}>
      <LocationPermissions />
      <Camera />
      <Notifications />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
})
