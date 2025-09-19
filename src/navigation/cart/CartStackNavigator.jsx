import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../../screens/cart/CartScreen';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const CartStackNavigator = () => {
    return (
        <Stack.Navigator

            screenOptions={{
                header: ({ route }) => (<Header title="Tienda" subtitle={route.name} />)
            }}
        >
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    )
}

export default CartStackNavigator;

