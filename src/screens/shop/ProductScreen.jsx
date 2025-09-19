import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addItem } from '../../store/slices/cartSlice';
import { colors } from '../../global/colors';

const ProductScreen = ({ navigation, route }) => {
  const product = route.params?.product || useSelector(state => state.shop?.productSelected);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      
      const payload = {
        product: product,
        quantity: 1, 
      };
      dispatch(addItem(payload));
      console.log('producto agregado al carrito!!!', payload);
    }
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.purple} />
        <Text style={styles.loadingText}>Cargando producto...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity
        style={styles.goBackbutton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={[styles.productImage, { width: width * 0.9, height: width * 0.9 }]}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Agregar al Carrito</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.darkGray,
  },
  goBackbutton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    resizeMode: 'contain',
    borderRadius: 10,
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.gray,
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.purple,
    marginBottom: 20,
  },
  addToCartButton: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '80%',
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
