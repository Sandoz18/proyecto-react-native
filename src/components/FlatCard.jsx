import { StyleSheet, Text, View } from "react-native";
import {colors} from '../global/colors';
import { Children } from "react";

const FlatCard = ({children}) =>{
    return (
         <View style={styles.container}>
            {children}
        </View>
    )
}

export default FlatCard

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.lightGray,
        padding:32,
        margin:8,
        elevation: 10,
        shadowColor: colors.darkGray,//ios
        shadowOffset: { x: 10, y: 10 },//ios
        shadowOpacity: 0.7//ios
    }
})