import * as React from 'react'
import * as Notifications from 'expo-notifications'
import { Button, StyleSheet, TextInput, View } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

const NotificationsComponent = () => {
  const [expoPushToken, setExpoPushToken] = React.useState('')
  const [notification, setNotification] = React.useState(false)
  const notificationListener = React.useRef()
  const responseListener = React.useRef()
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')

  const registerForPushNotificationsAsync = async () => {
    let token

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
      console.log(token)
    } else {
      alert('Must use physical device for Push Notifications')
    }

    return token
  }

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title !== '' ? title : "You've got mail! 📬",
        body: body !== '' ? body : 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2, repeats: false },
    })
    setTitle('')
    setBody('')
  }

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        stlye={styles.input}
        placeholder='Notification title'
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        stlye={styles.input}
        placeholder='Notification body'
        value={body}
        onChangeText={(text) => setBody(text)}
      />
      <Button
        title='Press to schelude a notification!'
        onPress={scheduleNotification}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: '#000',
    borderBottomWidth: 5,
    backgroundColor: '#0009',
    marginVertical: 10,
  },
})

export default NotificationsComponent
