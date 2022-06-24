import { View, Text  , ScrollView , Image , StyleSheet} from 'react-native'
import React from 'react'
import { USERS } from '../../data/Fakedata'

const Stories = () => {

  return (
    <View style={{marginBottom:40  , marginTop:15}} >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                USERS.map((story , index) => (
                    <View key={index} style={{alignItems:'center'}}>
                        <Image style={styles.story} source={{uri:story.image}} />
                        <Text style={{color:'#fff' , marginTop:5}}>{
                                  story.user.length > 11 ? story.user.slice(0,10).toLowerCase() + '...' : story.user
                        }</Text>
                    </View>
                ))
            }
         </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    story:{
        width: 80,
        height: 80,
        borderRadius:50,
        marginLeft:12,
        borderWidth:3,
        borderColor:'#ff8501'
    }
})

export default Stories