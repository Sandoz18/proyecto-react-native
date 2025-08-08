import { StyleSheet, Text, View } from 'react-native'
import {colors} from "../global/colors"

const Header = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({

  headerContainer:{
     backgroundColor: colors.neonGreen,
     heigth: 200,
  },
  textTitle:{
  fontSize:16
  },
 
})