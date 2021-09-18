import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera } from 'expo-camera'

const SERVER_URL = ''

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

export default () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera = React.useRef(null)
  const takePicture = async() => {
    if (!camera) return

    const photo = await camera?.current?.takePictureAsync()
    const base64 = await toDataURL(photo.uri)

    const data = JSON.stringify({
      uid: 1,
      height: photo.height,
      width: photo.width,
      image: base64
    })
    console.log(data)

    fetch(`${SERVER_URL}/image/new`, {
      method: 'POST',
      body: data
    })
    console.log(photo, JSON.stringify(base64, null, 4))
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          padding: 20,
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            alignSelf: 'center',
            flex: 1,
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={takePicture}
            style={{
              width: 90,
              height: 90,
              bottom: 30,
              borderRadius: 50,
              borderWidth: 9,
              borderColor: '#ffffffB6'
            }}
            />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  }
});