import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera } from 'expo-camera'
import { UserContext } from '../context/context'
import {SafeAreaView} from 'react-native';
import { useAnimatedReaction } from 'react-native-reanimated'

const SERVER_URL = 'http://192.168.0.198:5000'

export default ({ navigation }) => {
  const context = React.useContext(UserContext)
  console.log(context)
  if (context.id === undefined) {
    navigation.push('login')
  }


  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera = React.useRef(null)
  
  const takePicture = async() => {
    if (!camera) return

    const photo = await camera?.current?.takePictureAsync()
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const savePhoto = () => {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];


    const formdata = new FormData()
    formdata.append('photo', { uri: localUri, name: `photo.${filename}`, type: `image/${fileType}` });
    formdata.append('uid', context.id)

    fetch(`${SERVER_URL}/image/new`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
    })
  }

  const retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    startCamera()
  }

  const startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    }
  }

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>{ "No access to camer" }</Text>;
  // }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
        { hasPermission ? (
          <View style={{ flex: 1, width: '100%' }}>
          { previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={savePhoto} retakePicture={retakePicture} />
          ) : (
            <Camera style={styles.camera} type={type} ref={camera}>
              <View style={{ flex: 1, width: '100%', backgroundColor: 'transparent', flexDirection: 'row' }}>
                <View style={{ position: 'absolute', bottom: 0,flexDirection: 'row',flex: 1, width: '100%', padding: 20, justifyContent: 'space-between' }}>
                  <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center' }}>
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
            </Camera>            
          )}
        </View>
      
        ) : (
          <View />
        ) }
        
    </SafeAreaView>
  )
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