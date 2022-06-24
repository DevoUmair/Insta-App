import { View, Text  , StyleSheet , Image  , TouchableOpacity} from 'react-native'
import React from 'react'
import FormikUplaoder from './FormikUplaoder'

const AddNewPost = ({navigation}) => {
  return (
     <View style={styles.continer}>
         <Header navigation={navigation} />
         {/* Formik Post Uploader */}
         <FormikUplaoder  navigation = {navigation} />
     </View>
  )
}

const Header = ({navigation}) => {
    return(
        <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={{width:30 , height:30}} source={require('../../assets/icons8-chevron-left-30.png')}  />
                </TouchableOpacity>
               <Text style={styles.HeaerText} >New Post</Text>
               <Text></Text>
        </View>
    )

}

const styles = StyleSheet.create({
    continer:{
        marginHorizontal:10,
        marginTop:20,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    HeaerText:{
        color: '#fff',
        fontWeight:'400',
        fontSize:20,
        marginRight:27.5
    }
})

export default AddNewPost