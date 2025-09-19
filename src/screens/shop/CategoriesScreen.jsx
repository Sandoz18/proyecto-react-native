import {
  StyleSheet, Text, View, TouchableOpacity, FlatList, Image,} from 'react-native';
import { setCategorySelected } from '../../store/slices/shopSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCategoriesQuery } from '../../services/shopApi';

const CategoriesScreen = ({ navigation }) => {
  const {data: categories, isLoading, error}= useGetCategoriesQuery();
  const dispatch = useDispatch();
  console.log('traeme las categorias desde firebase', categories);

  const handleSelectCategory = (category) => {
    dispatch(setCategorySelected(category))
    navigation.navigate('products');
  }
  const renderCategoryItem = ({ item, index }) => (

    <View style={styles.cardCustom}>
      <TouchableOpacity style={styles.categoryItem}
        onPress={() =>handleSelectCategory(item.title)         
        }
      >
        <Image
          source={{ uri: item.image }}
          style={styles.categoryImage}
          resizeMode="cover"
        />
        <View style={styles.categoryTextWrapper}>
          <Text style={styles.categoryText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return <Text style={styles.loadingText}>Cargando categorías...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error al cargar las categorías. Por favor, inténtalo de nuevo.</Text>;
  }

  return (
    <>
    <Text>{'categories'}</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}        
        // Cambiamos el keyExtractor para usar el ID del ítem
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.title}></Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
    marginBottom: 8,
    marginTop: 8,
    paddingHorizontal: 10,
  },
  cardCustom: {
    flex: 1, 
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryItem: {
    flex: 1,
    width: '100%',
  },
  categoryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categoryTextWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '600',
  },
});