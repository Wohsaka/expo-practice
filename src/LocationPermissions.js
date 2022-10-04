import * as React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location'

const LocationPermissions = () => {
  const [hassPermission, setHasPermission] = React.useState(null)
  const [location, setLocation] = React.useState('waiting...')
  let errorMsg = 'Permission to access location not set!'

  const requestPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      setHasPermission(status === 'granted')
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({})
        setLocation(coords)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (hassPermission) {
    errorMsg = 'Permission granted!!'
  } else if (!hassPermission) {
    errorMsg = 'Permission to access location was denied!!!'
  }

  return (
    <View style={stlyes.container}>
      <View>
        <Text>{errorMsg}</Text>
        {hassPermission === true && (
          <Text>
            Your current location is:{' '}
            {`latitude: ${location.latitude} longitude:
            ${location.longitude}`}
          </Text>
        )}
        <Button
          title='ask for location permission'
          onPress={requestPermissions}
        />
      </View>
    </View>
  )
}

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LocationPermissions
