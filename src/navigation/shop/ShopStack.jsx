import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CategoriesScreen,ProductScreen,ProductsScreen } from '../../screens';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';


const Stack = createNativeStackNavigator();

const ShopStack = ()=>{
    const categorySelected = useSelector(state=>state.shop.categorySelected)
    return(
        <Stack.Navigator 
        initialRouteName='categories'
       screenOptions={{
        header: ({route})=>(<Header title="Tienda"
             subtittle={route.name==='categories'?'categoriesScreen':categorySelected}/>) 
      }}
        >
            <Stack.Screen name='categories' component={CategoriesScreen}/>
            <Stack.Screen name='products' component={ProductsScreen}/>
            <Stack.Screen name='product' component={ProductScreen}/>
        </Stack.Navigator>
    )
}

export default ShopStack

const styles = StyleSheet.create({})