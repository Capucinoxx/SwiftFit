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

const { width, height } = Dimensions.get('screen');

const _logoSize = Math.max(width * 0.14, 64);
const _spacing = 16;

export default () => {
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

  return (
    <BottomSheetModalProvider>
      <View style={StyleSheet.container}>
        <Image 
          resizeMode="cover"
          style={[StyleSheet.absoluteFillObject, { opacity: 1 }]}
        />

        <Pressable onPress={showModal}>
          <View
            style={{
              paddingVertical: _spacing,
              paddingBottom: _spacing * 2,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 32,
            }}>
            <AntDesign name="lock1" size={32} color="#053eff" />
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
                    borderBottomColor: '#976272',
                    backgroundColor: '#c3767e56',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={36}
                    color="#6a565f"
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
              Connecte toi pour du panache
            </MotiText>
            <MotiView state={dynamicAnimation} delay={300}>
              <BottomSheetTextInput
                placeholderTextColor="rgba(0,0,0,0.3)"
                shouldCancelWhenOutside
                placeholder="Email"
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
              <Pressable style={{ marginBottom: _spacing }}>
                <View
                  style={{
                    backgroundColor: '#053eff',
                    borderRadius: 16,
                    paddingVertical: _spacing,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[{ fontSize: 16, color: '#fff' }]}>
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
                  You have no account?
                </Text>
                <Pressable>
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: '#053eff',
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