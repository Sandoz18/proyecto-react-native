// Header.js
import { StyleSheet, Text, View, Pressable } from 'react-native'
import {colors} from "../global/colors"
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons' 

const Header = ({title, subtitle}) => {
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()

  return (
    <View style={styles.headerContainer}>
      {
        canGoBack && (
          <Pressable onPress={() => navigation.goBack()} style={styles.goBackButton}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </Pressable>
        )
      }
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textSubtitle}>{subtitle}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.cobaltBlue,
    height: 100,
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  titleContainer: {
    
  },
  textTitle: {
    fontSize: 16,
    color: colors.white,
  },
  textSubtitle: {
    fontSize: 16,
    color: colors.white,
  },
  goBackButton: {
    position: 'absolute', 
    left: 15,            
    top: 50,             
  },
});