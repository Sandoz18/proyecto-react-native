import { StyleSheet, Text, View, FlatList, Image, Pressable, Alert } from 'react-native'
import { colors } from '../../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import FlatCard from '../../components/FlatCard'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { deleteProduct, addItem, removeOneUnit, clearCart } from '../../store/slices/cartSlice'

const CartScreen = () => {
  // Obtener los items del carrito desde el estado de Redux
  const cartItems = useSelector(state => state.cart?.items || []) 
  const total = cartItems.reduce((acc, currentItem) => acc + (currentItem.price * currentItem.quantity), 0);
  const dispatch = useDispatch();

  const onClearCart = () => {
    Alert.alert(
      "Vaciar carrito",
      "¿Estás seguro de que quieres vaciar tu carrito?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: () => dispatch(clearCart()) }
      ]
    );
  };
  
  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total.toFixed(2)} </Text>
      <Pressable style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </Pressable>
      <Pressable style={styles.clearButton} onPress={onClearCart}>
        <Text style={styles.clearText}>Vaciar Carrito</Text>
      </Pressable>
    </View>
  )

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.cartImage}
        resizeMode='cover'
      />
      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>Precio unitario: ${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <Pressable onPress={() => dispatch(removeOneUnit(item.id))}>
            <Ionicons name='remove-circle-outline' size={24} color={colors.darkGray} />
          </Pressable>
          <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
          <Pressable onPress={() => dispatch(addItem({ product: item, quantity: 1 }))}>
            <Ionicons name='add-circle-outline' size={24} color={colors.darkGray} />
          </Pressable>
        </View>
        <Text style={styles.total}>Total: ${ (item.quantity * item.price).toFixed(2) }</Text>
        <Pressable style={styles.deleteButton} onPress={() => dispatch(deleteProduct(item.id))}>
          <Ionicons name="trash-outline" size={24} color="#d31f1f" />
        </Pressable>
      </View>
    </FlatCard>
  )

  return (
    <View style={styles.container}>
      {
        cartItems.length > 0
          ?
          (
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              renderItem={renderCartItem}
              ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
              ListFooterComponent={<FooterComponent />}
            />
          ) : (
            <Text style={styles.emptyCartText}>Aún no hay productos en el carrito</Text>
          )
      }
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cartContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8
  },
  cartDescription: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginBottom: 16,
  },
  price: {
    fontSize: 14,
    color: colors.darkGray
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantity: {
    fontSize: 14,
    color: colors.darkGray,
    marginHorizontal: 10,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700'
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: '700'
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.purple,
    borderRadius: 16,
    marginBottom: 24,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700'
  },
  cartScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8
  },
  clearButton: {
    marginTop: 10,
  },
  clearText: {
    color: 'red',
    fontSize: 14,
  },
  emptyCartText: {
    fontSize: 20,
    backgroundColor: '#332b1bff',
    textAlign: 'center',
    marginTop: 50,
    color: '#ffff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

