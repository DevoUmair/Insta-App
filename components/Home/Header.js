import { View, Text  , Image , StyleSheet , TouchableOpacity} from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'

const Header = ({navigation}) => {

  const handleSignedOut = async () => {
      await signOut(auth)
  }  

  return (
    <View style={styles.container}>

        <TouchableOpacity onPress={handleSignedOut}>
            <Image 
                style={styles.logo} 
                source={{uri:'https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png'}} 
            />
        </TouchableOpacity>

        <View style={styles.iconContiner}>
            <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
                <Image style={[styles.icon , {width:23 , height:23} ]} source={require('../../assets/icons8-plus-64.png')} />
            </TouchableOpacity>
            {/* <TouchableOpacity>
                <Image style={styles.icon} source={require('../../assets/icons8-heart-50(1).png')} />
            </TouchableOpacity> */}
            <TouchableOpacity>
                <View style={styles.unredBadge}>
                    <Text style={styles.unredBadgeText} >11</Text>
                </View>
                <Image style={styles.icon } source={require('../../assets/icons8-facebook-messenger-50.png')} />
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
          justifyContent:"space-between",
          alignItems:'center',
          flexDirection:'row',
          marginHorizontal:20,
          marginTop:10,
    },
    logo:{
        width:100,
        height:50,
        resizeMode:"contain"
    },
    iconContiner:{
        flexDirection:"row",
    },
    icon:{
        width: 25,
        height: 25,
        marginLeft:13,
        resizeMode:'contain'
    },
    unredBadge:{
        backgroundColor:'#FF3250',
        position: 'absolute',
        left:20,
        top: -10,
        botton:18,
        width:25,
        height:18,
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        zIndex:100,
    },
    unredBadgeText:{
        fontWeight:'600',
        color:'white',
    }
})

export default Header