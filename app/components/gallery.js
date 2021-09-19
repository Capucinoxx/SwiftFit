import * as React from 'react'
import {
  FlatList,
  Image,
  Animated,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { UserContext } from '../context/context'
const { width, height } = Dimensions.get('screen')

const API_KEY = '563492ad6f917000010000011ce76314e86a4f05abf1138ca17632ef'

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

const THUMB_SIZE = 80
export default ({ navigation }) => {
  const context = React.useContext(UserContext)
  if (context.id === undefined) {
    navigation.push('login')
  }

  const scrollY = React.useRef(new Animated.Value(0)).current
  const [photos, setPhotos] = React.useState(null)
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    const getPhotos = async () => {
      const photos = await fetchPexelsDotCom()
      setPhotos(photos)
    }
    getPhotos()
  }, [])

  const maxRef = React.useRef()
  const thumbRef = React.useRef()
  const scrollToIndex = (index) => {
    if (index === activeIndex) {
      return
    }
    maxRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    })

    if (index * (THUMB_SIZE + 10) - THUMB_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (THUMB_SIZE + 10) - width / 2 + THUMB_SIZE / 2,
        animated: true,
      })
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      })
    }

    setActiveIndex(index)
  }

  if (!photos) {
    return null
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        ref={maxRef}
        data={photos}
        keyExtractor={(item) => item.id.toString() + '1'}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(ev) => {
          scrollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
        }}
        renderItem={({ item }) => {
          return <Image source={{ uri: item.src.portrait }} style={[{ width, height }]} />
        }}
      />
      <FlatList
        ref={thumbRef}
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ position: 'absolute', bottom: 80 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                scrollToIndex(index)
              }}
            >
              <Image
                source={{ uri: item.src.tiny }}
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  marginRight: 10,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? 'white' : 'transparent',
                }}
              />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}