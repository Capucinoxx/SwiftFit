import React from 'react'
import { FlatList, TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import background from '../ressources/background_closet.png'
import slide_arrow from '../ressources/slide_arrow.png'

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
      
      <Text style={{ fontSize: 22, fontFamily: "Futura", color: "#492d35" }}>{ props.title }</Text>
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
                  borderColor: "#fff",
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
  const slideUri = Image.resolveAssetSource(slide_arrow).uri
  return (
    <View style={{ width, height, flex: 1, backgroundColor: "#fff", position:"relative"}}>
      <Image 
        source={{
          uri: backgroundUri
        }}
        resizeMode="cover"
        style={[StyleSheet.absoluteFillObject, { opacity: 1 }]}
      />
      <Image
        source={{
          uri: slideUri
        }}
        style={{position: "absolute", top:55, left:20, zIndex: 10, width: 70, height: 70, opacity: 1}}
      />
      <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 40 }}>
      <Text style={{ color:"#fff", fontSize: 30, textAlign: 'center', marginTop: 31.5, marginBottom: 20,
      fontWeight: "bold", fontFamily: "Futura" }}>{"Choose an item"}</Text>
      <Text style={{ position: "absolute", marginTop: 70, marginLeft: 80, color:"#492d35", fontSize: 30, textAlign: 'center', fontWeight: "bold", fontFamily: "Futura" }}>{"Choose an item"}</Text>
      <View style={{ flex:1, flexDirection: 'column' }}>
        <Category title={"Shirts"} photos={photos}/>
        <Category title={"Outerwear"} photos={photos}/>
        <Category title={"Bottoms"} photos={photos}/>
        <Category title={"Dresses/skirts"} photos={photos}/>
        <Category title={"Shoes"} photos={photos}/>
    </View>
    </View>
    </View>
  )
}


