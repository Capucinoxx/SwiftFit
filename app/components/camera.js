import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera } from 'expo-camera';


export default () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera = React.useRef(null)
  const takePicture = async() => {
    if (!camera) return

    const photo = await camera?.current?.takePictureAsync()
    console.log(photo)
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
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: '#fff'
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