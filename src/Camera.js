import * as React from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Camera, CameraType } from 'expo-camera'

const CameraComponent = () => {
  const [visible, setVisible] = React.useState(false)
  const [hassPermission, setHasPermission] = React.useState(false)
  const [type, setType] = React.useState(CameraType.back)
  const [photoUri, setPhotoUri] = React.useState('')
  let cameraRef = React.useRef()

  const takePhoto = async () => {
    try {
      const { uri } = await cameraRef.current.takePictureAsync()
      setPhotoUri(uri)
    } catch (error) {
      console.log(error)
    }
  }
  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  React.useEffect(() => {
    requestPermission()
  }, [])

  /* if (hassPermission === null) {
    return (
      <View>
        <Text>Camera permissions not set properly!</Text>
      </View>
    )
  } else if (hassPermission === false) {
    return (
      <View>
        <Text>Camera permission not allowed!</Text>
      </View>
    )
  }*/

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={false}
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
      >
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            >
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={takePhoto}
            >
              <Text style={styles.text}>Take</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setVisible(!visible)}
            >
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </Modal>
      {photoUri !== '' && (
        <Image style={styles.photo} source={{ uri: photoUri }} />
      )}
      <Button title='Open Camera' onPress={() => setVisible(!visible)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginHorizontal: 55,
  },
  text: {
    color: '#ffff',
  },
  photo: {
    width: 200,
    height: 200,
  },
})

export default CameraComponent
