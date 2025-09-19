import { StyleSheet, Text, View, FlatList, TextInput, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProductSelected } from '../../store/slices/shopSlice';
import { useGetProductsByCategoryQuery } from '../../services/shopApi';

const ProductsScreen = ({ navigation }) => {    
    const [keyword, setKeyword] = useState('');

    const category = useSelector(state => state.shop?.categorySelected);
    const {data: productsFilteredByCategory, isLoading, error}= useGetProductsByCategoryQuery(category.toLowerCase());
    const dispatch = useDispatch();   

    const handleSelectProduct = (item) => {
        dispatch(setProductSelected(item));
        navigation.navigate('product', { product: item });
    };

    const renderProductItem = ({ item }) => (
        <Pressable
            onPress={() => handleSelectProduct(item)}
            style={styles.productItem}
        >
                <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text>{item.title}</Text>
                    <Text>{item.price}</Text>
                </View>
        </Pressable>
    );

    const filteredData = productsFilteredByCategory?.filter(
        (product)=>product.title.toLowerCase().includes(keyword.toLowerCase())
    ) 

    if (isLoading) return <Text>Cargando Productos....</Text>
    if (error) return <Text>Error al cargar los Productos....</Text>

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar productos..."
                onChangeText={setKeyword}
                value={keyword}
            />
            <FlatList
                data={filteredData}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatlistCategory}
            />
        </View>
    );
};

export default ProductsScreen;

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    productItem: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    flatlistCategory: {
        paddingBottom: 20,
    },
});