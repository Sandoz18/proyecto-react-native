import { StyleSheet, Text, View, FlatList, Image, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { toggleFavorite } from '../../store/slices/favoritesSlice';

const FavoritesScreen = () => {

    const navigation = useNavigation();
    const favoriteProductIds = useSelector(state => state.favorites.value);

    const allProducts = useSelector(state => state.shop.products);
    const favoriteProducts = allProducts.filter(product =>
        favoriteProductIds.includes(product.id)
    );

    const dispatch = useDispatch();

    if (favoriteProducts.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Todavía no tienes productos favoritos.</Text>
            </View>
        );
    }

    const renderFavoriteItem = ({ item }) => (

        <Pressable
            style={styles.favoriteCard}
            onPress={() => navigation.navigate('ProductScreen', { product: item })}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.image} />


            <TouchableOpacity
                style={styles.heartContainer}
                onPress={() => dispatch(toggleFavorite(item))}
            >

                <Ionicons name="heart" size={24} color="red" />
            </TouchableOpacity>


            <View style={styles.overlayText}>
                <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
            </View>
        </Pressable>
    );


    return (
        <FlatList
            data={favoriteProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={renderFavoriteItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'gray',
    },
    listContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    favoriteCard: {
        flex: 1,
        marginHorizontal: 5,
        height: 250,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    heartContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 1,
        padding: 5,
    },
    overlayText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    productTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    productPrice: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
    },
});