import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ShopStack from '../shop/ShopStack'
import CartStack from '../cart/CartStackNavigator';
import FavoritesScreen from '../../screens/user/FavoritesScreen';
import ProfileStack from '../Profile/ProfileStack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../global/colors';
import { useSelector, useDispatch } from 'react-redux';
import { setLocalId } from '../../store/slices/userSlice';
import { getAuth } from 'firebase/auth';

const Tab = createBottomTabNavigator();


const CartBadge = ({ focused, size, color }) => {
  
  const cartItemsCount = useSelector(state =>
     state.cart.items.reduce((total, item)=> total + item.quantity, 0));

  return (
    <View style={{ position: 'relative' }}>
      <FontAwesome
        name="shopping-cart"
        size={size}
        color={color}
      />
      {cartItemsCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItemsCount}</Text>
        </View>
      )}
    </View>
  );
};

const TabNavigator = () => {
  const dispatch = useDispatch();
  const localId = useSelector(state => state.user.localId);

  if (!localId) {
    console.log("LOG 2: localId no esta disponible en TabNavigator.");
    return null;
  }

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      dispatch(setLocalId(user.uid));
    }
  }, [dispatch, localId]);

  console.log("LOG 1: Estoy en TabNavigator.jsx y me estoy ejecutando.");
  console.log("LOG 3: localId en TabNavigator.jsx es:", localId);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome name="home"
              size={size}
              color={focused ? colors.darkGray : colors.mediumGray} />
          ),
        }}
      />


      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="person-outline"
              size={size}
              color={focused ? colors.darkGray : colors.mediumGray} />
          ),
        }}
      />

      <Tab.Screen name="Categories"
        component={ShopStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={size}
              color={focused ? colors.darkGray : colors.mediumGray} />
          ),
        }}
      />

      <Tab.Screen name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              color={focused ? colors.darkGray : colors.mediumGray} />
          ),
        }}
      />

      <Tab.Screen
        name="CarritoTab"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <CartBadge
              focused={focused}
              size={size}
              color={focused ? colors.darkGray : colors.mediumGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
export default TabNavigator;


