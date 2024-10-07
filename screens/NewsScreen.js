import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../others/Context'
import Carousel from 'react-native-snap-carousel';
import SingleNews from '../Components/SingleNews';

const NewsScreen = () => {
    const [activeIndex, setActiveIndex] = useState()

    const {
        news: { articles },
    } = useContext(NewsContext)

    const windowHeight = Dimensions.get("window").height
  
    return (
        <View style={styles.carousel}>
            {articles && (
                <Carousel
                    layout={"stack"}
                    data={articles.slice(0, 10)}
                    sliderHeight={300}
                    itemHeight={windowHeight}
                    vertical={true}
                    renderItem ={({item, index}) =>(
                        <SingleNews item ={item} index ={index}/>
                    )
                    }
                    onSnapToItem={(index) => setActiveIndex(index)}
                />
            )}
        </View>
    )
}

export default NewsScreen

const styles = StyleSheet.create({
    carousel: {
        flex: 1,
        backgroundColor: "black",
        transform: [{ scaleY: -1 }]
    }
})