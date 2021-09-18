import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { UserContext } from './context/context';
const Stack = createStackNavigator();
import Login from './components/login'
import Gallery from './components/gallery'
import Camera from './components/camera'





export default function App() {
  const contextUserinitialState = {
    id: undefined
  }

  const [user, setUser] = React.useState(contextUserinitialState)

  const setID = (id) => setUser({ ...user, id: id })
  
  return (
    <NavigationContainer>
      <UserContext.Provider value={{ ...user, ...{ setID } }}>
      <Stack.Navigator initialRouteName="history"  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="history" component={Gallery}/>
        <Stack.Screen name="camera" component={Camera}/>
        {/* <Stack.Screen name="closet" /> */}
      </Stack.Navigator>
    </UserContext.Provider>
    </NavigationContainer>
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
