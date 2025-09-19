import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Asegúrate de que la ruta sea correcta
import { toggleFavorite } from '../store/slices/favoritesSlice'; 

const ProductSlider = ({ products, onProductPress }) => {
    const navigation = useNavigation();
    const favorites = useSelector(state => state.favorites.value ?? []);
    const dispatch = useDispatch();

    const isFavorite = (productId) => favorites.some(item => item.id === productId);

    const renderProductItem = ({ item }) => (
        <Pressable
            style={({ pressed }) => [styles.productCard, pressed && styles.pressedEffect]}
            onPress={() => onProductPress(item)}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => {
                    dispatch(toggleFavorite(item));
                }}>
                <Ionicons
                    name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFavorite(item.id) ? 'red' : 'gray'}
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                style={{ minHeight: 300 }}
            />
        </View>
    );
};

export default ProductSlider;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    favoriteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 5,
        zIndex: 1,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
        width: 150,
        height: 250,
        overflow: 'hidden',
    },
    pressedEffect: {
        opacity: 0.7,
    },
    textContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 12,
        color: '#e6009f',
        marginTop: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

