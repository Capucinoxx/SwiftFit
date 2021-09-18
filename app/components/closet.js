import React from 'react'
import { FlatList, TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import background from '../ressources/background_closet.png'

const API_KEY = '563492ad6f917000010000011ce76314e86a4f05abf1138ca17632ef'
const THUMB_SIZE = 80
const { width, height } = Dimensions.get('screen');


const fetchPexelsDotCom = async () => {
  const data = await fetch(
    'https://api.pexels.com/v1/search?query=clothes&orientation=portrait&size=small&per_page=20',
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  )

  const { photos } = await data.json()

  return photos
}

const Category = (props) => {


  console.log(props.photos)
  return (

    <View style={{flex: 1, flexBasis: 115 }}>
      
      <Text style={{ fontSize: 22 }}>{ props.title }</Text>
      <FlatList
        data={props.photos}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ position: 'absolute', top: 35 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
    
            >
              <Image
                source={{ uri: item.src.tiny }}
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  marginRight: 10,
                  borderRadius: 12,
                  borderWidth: 2,
                }}
              >
                
              </Image>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default () => {
  const [photos, setPhotos] = React.useState(null)

  React.useEffect(() => {
    const getPhotos = async () => {
      const photos = await fetchPexelsDotCom()
      setPhotos(photos)
    }
    getPhotos()
  }, [])

  const backgroundUri = Image.resolveAssetSource(background).uri
  return (
    <View style={{ width, height, flex: 1, backgroundColor: "#fff" }}>
      <Image 
        source={{
          uri: backgroundUri
        }}
        resizeMode="cover"
        style={[StyleSheet.absoluteFillObject, { opacity: 1 }]}
      />
      <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 40}}>
      <Text>{"Choose an"}</Text>
      <View style={{  flex:1, flexDirection: 'column' }}>
        <Category title={"Pantalons"} photos={photos}/>
        <Category title={"Shirt"} photos={photos}/>
        <Category title={"Chandaille manche courte"} photos={photos}/>
        <Category title={"Souliers"} photos={photos}/>
    </View>
    </View>
    </View>
  )
}


