import { StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { colors } from '../global/colors'

const Search = ({ setKeyword }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                styles={styles.searchInput}
                placeholder='Search Product'
                onChangeText={(text) => { setKeyword(text) }}
            >
            </TextInput>
            <Icon style={styles.searchIcon} name= "search" size={24}/>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchContainer:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
         marginHorizontal: 16,
        marginVertical: 16
    },
       searchInput:{
        borderWidth:1,
        borderColor:colors.darkGray,
        borderRadius:16,
        minWidth: "90%",
        paddingLeft:32
    },
    searchIcon:{
        position:"absolute",
        left: 8
    }
})