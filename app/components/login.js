import React from 'react'
import { MotiView, MotiText, useDynamicAnimation } from 'moti'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Pressable } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetBackground,
} from '@gorhom/bottom-sheet'
import Constants from 'expo-constants'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import background from '../ressources/background.png'
import { UserContext } from '../context/context'



const SERVER_URL = 'http://192.168.0.198:5000'



const { width, height } = Dimensions.get('screen');

const _logoSize = Math.max(width * 0.14, 64);
const _spacing = 16;

export default ({ navigation }) => {
  const context = React.useContext(UserContext)
  const [email, setEmail] = React.useState('')
  const [pwd, setPwd] = React.useState('')

  const login = async (setID) => {
    const data = await fetch(`${SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email: email,
        password: pwd
      })
    })

    const { id } =  await data.json()
    id && setID(id)
  }

  const bottomSheetModalRef = React.useRef(null)

  const dynamicAnimation = useDynamicAnimation(() => ({
    opacity: 0,
    translateY: 40,
  }))

  const snapPoints = React.useMemo(() => ['60%'], []);

  const showModal = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
    setTimeout(
      () =>
        dynamicAnimation.animateTo((current) => ({
          ...current,
          opacity: 1,
          translateY: 0,
        })),
      200
    );
  }, []);

  const hideModal = React.useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
    dynamicAnimation.animateTo((current) => ({ ...current, opacity: 0, translateY: 40 }));
  }, []);

  const backgroundUri = Image.resolveAssetSource(background).uri

  return (
    <BottomSheetModalProvider>
      <View style={{ height, width, position: 'relative'}}>
        <Image 
        source={{
          uri: backgroundUri
        }}
          resizeMode="cover"
          style={[StyleSheet.absoluteFillObject, { opacity: 1 }]}
        />

        <Pressable onPress={showModal} style={{position: 'absolute',width: width-30, left: 15, bottom: 30}}>
          <View
            style={{
              paddingVertical: _spacing,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 32,
              position: 'relative'
            }}>
            
            <AntDesign name="lock1" size={35} color="#c4767e" />
          </View>
        </Pressable>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          snapPoints={snapPoints}
          handleComponent={() => {
            return (
              <Pressable onPress={hideModal}>
                <View
                  style={{
                    height: 64,
                    borderBottomWidth: 2,
                    borderBottomColor: '#c4767e',
                    backgroundColor: '#c4767e',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={50}
                    color="#ffffff"
                    style={{ transform: [{ scaleX: 1.4 }] }}
                  />
                </View>
              </Pressable>
            );
          }}>
          <View
            style={{
              paddingHorizontal: _spacing * 2,
              paddingVertical: _spacing * 3,
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <MotiText
              state={dynamicAnimation}
              style={[
                styles.regular,
                { fontSize: 32, color: '#000', marginBottom: _spacing * 2 },
              ]}>
              Welcome to SwiftFit.
              Let's sign you in.
            </MotiText>
            <MotiView state={dynamicAnimation} delay={300}>
              <BottomSheetTextInput
                placeholderTextColor="rgba(0,0,0,0.3)"
                shouldCancelWhenOutside
                placeholder="Email"
                onChangeText={setEmail}
                style={[
                  {
                    borderBottomWidth: 2,
                    borderBottomColor: 'rgba(0,0,0,0.1)',
                    height: 64,
                    fontSize: 24,
                    marginBottom: _spacing * 2,
                    paddingHorizontal: _spacing / 2,
                  },
                ]}
              />
              <BottomSheetTextInput
                placeholderTextColor="rgba(0,0,0,0.3)"
                placeholder="******"
                onChangeText={setPwd}
                secureTextEntry
                style={[
                  {
                    borderBottomWidth: 2,
                    borderBottomColor: 'rgba(0,0,0,0.1)',
                    height: 64,
                    fontSize: 24,
                    marginBottom: _spacing * 2,
                    paddingHorizontal: _spacing / 2,
                  },
                ]}
              />
            </MotiView>
            <MotiView
              state={dynamicAnimation}
              delay={500}
              style={{ justifyContent: 'center' }}>
              <Pressable style={{ marginBottom: _spacing }} onPress={async () => await login(context.setID)}>
                <View
                  style={{
                    backgroundColor: '#c4767e',
                    borderRadius: 16,
                    paddingVertical: _spacing,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[{ fontSize: 25, color: '#fff' }]}>
                    Sign in
                  </Text>
                </View>
              </Pressable>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <Text style={[{ fontSize: 16 }]}>
                  Don't have an account?
                </Text>
                <Pressable>
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: '#c4767e',
                        marginLeft: _spacing / 2,
                      },
                    ]}>
                    Sign up now
                  </Text>
                </Pressable>
              </View>
            </MotiView>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 46,
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    position: 'relative'
  },
  logo: {
    padding: _spacing,
    backgroundColor: '#fff',
    position: 'absolute',
    top: Constants.statusBarHeight,
    left: 0,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});