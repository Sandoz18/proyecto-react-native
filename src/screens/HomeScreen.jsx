import React, { useState, useEffect } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Pressable,
    Dimensions,
    Alert,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import SliderButton from "../components/SliderButton.jsx";
import NewsletterModal from "../components/modals/NewsletterModal.jsx";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from "react-redux";
import ProductSlider from "../components/ProductSlider.jsx";
import { useNavigation } from "@react-navigation/native";
import AuthModal from "../components/modals/AuthModal.jsx";
import { setProductSelected } from "../store/slices/shopSlice.js";
import { setFirstName } from "../store/slices/userSlice.js";
import { useGetUserDataQuery } from "../services/profileApi.js";


const { width } = Dimensions.get("window");
const HomeScreen = () => {     

    const dispatch = useDispatch();
    const handleProductPress = (product) => {
        dispatch(setProductSelected(product))
        navigation.navigate('ShopStack', { screen: 'product' });
    }

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showNewsletterModal, setShowNewsletterModal] = useState(false);
    const navigation = useNavigation();

     const localId = useSelector(state => state.user.localId);
    const firstName = useSelector(state => state.user.firstName);

      const { data: userData, isLoading } = useGetUserDataQuery(localId, {
        skip: !localId,
    });

      useEffect(() => {
        if (userData) {
            dispatch(setFirstName(userData.firstName));
        }
    }, [userData, dispatch]);

    const handleOpenNewsletterModal = () => {
        setShowNewsletterModal(true);
    };

    const handleCloseNewsletterModal = () => {
        setShowNewsletterModal(false);
    };

    const handleNewsletterSubmit = (email) => {
        console.log(`Correo recibido del modal: ${email}`);
        Alert.alert(
            "¡Gracias!",
            `Te has suscrito con el correo: ${email}. Revisa tu bandeja de entrada.`
        );
    };

    const allProducts = useSelector(state => state.shop.products);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
            const randomProducts = (shuffled.slice(0, 6));
            setBestSellers(randomProducts);
        }
        console.log('6. useEffect para los productos se ha ejecutado.');

    }, [allProducts]);

    const handleShowMore = () => {
        setShowAuthModal(true);
    };


    const greetingText = firstName ? `HOLA, ${firstName.toUpperCase()}` : "HOLA, USUARIO";
   

    return (
        <View style={styles.mainContainer}>

            <StatusBar style="auto" />
            <View style={styles.topSection}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Ionicons name="notifications-outline" size={24} color="#000" style={styles.icon} />
                        <Ionicons name="location-outline" size={24} color="#000" style={styles.icon} />
                    </View>
                    <View style={styles.headerRight}>
                        <Ionicons name="person-outline" size={24} color="#000" style={styles.icon} />
                        <Ionicons name="bag-outline" size={24} color="#000" style={styles.icon} />
                    </View>
                </View>

                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>{greetingText}</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent}
                >

                    <ImageBackground
                        source={require("../../assets/imagenPortada.jpg")}
                        style={styles.backgroundImage}
                    >
                        <View style={styles.heroContentWrapper}>
                            <View style={styles.bannerContentContainer}>
                                <View style={styles.discountContainer}>
                                    <Text style={styles.discountText}>DESCUENTOS</Text>
                                    <Text style={styles.discountText}>50%</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <SliderButton
                                        onSlideComplete={handleShowMore}
                                    />
                                </View>
                            </View>
                            <View style={styles.categoryButtonsContainer}>
                                <TouchableOpacity style={styles.categoryButton}
                                >
                                    <Text style={styles.categoryButtonText}>New In</Text>
                                </TouchableOpacity>
                                <View style={styles.categorySeparator}>|</View>
                                <TouchableOpacity style={styles.categoryButton}>

                                    <Text style={styles.categoryButtonText}>Sale</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>


                    <Text style={styles.bestSellers}>LO MÁS VENDIDO</Text>
                    <ProductSlider products={bestSellers}
                        onProductPress={handleProductPress}
                    />

                </ScrollView>
                <View style={styles.newsletterButtonContainer}>
                    <Pressable
                        onPress={handleOpenNewsletterModal}
                        style={({ pressed }) => [
                            styles.newsletterButton,
                            pressed && { opacity: 0.7 },
                        ]}
                    >
                        <Text style={styles.newsletterButtonText}>
                            Suscribirse a la Newsletter
                        </Text>
                    </Pressable>
                </View>

                <NewsletterModal
                    visible={showNewsletterModal}
                    onClose={handleCloseNewsletterModal}
                    onSubmit={handleNewsletterSubmit}
                />
            </View>
            <AuthModal
                isVisible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                navigation={navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    topSection: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 10,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
    },

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    greetingContainer: {
        alignItems: 'center',
        marginTop: 10,
    },

    greetingText: {
        fontSize: 20,
        fontWeight: '900',
        color: "#e6009f",
    },

    icon: {
        marginLeft: 15,
    },

    backgroundImage: {
        width: width,
        height: 400,
        resizeMode: "cover",
    },

    bannerContentContainer: {
        justifyContent: 'space-between',
    },

    discountContainer: {
        left: 80,
        marginTop: 20,
    },

    discountText: {
        color: '#ffffffff',
        textAlign: "center",
        fontSize: 30,
        fontFamily: 'Roboto-Black'
    },

    buttonContainer: {
        marginTop: 150,
    },

    sliderButton: {
        backgroundColor: '#decaca',
        borderRadius: 24,
        display: 'flex',
    },

    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 20,
    },

    heroContentWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    categoryButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#000',
        paddingVertical: 15,
        marginVertical: 32,
        borderRadius: 8,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        bottom: -20,
        left: 0,
        right: 0,

    },

    categoryButton: {
        borderRadius: 8,
        flex: 1,
    },
    categoryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    categorySeparator: {
        width: 1,
        backgroundColor: '#fff',
        marginHorizontal: 10,
    },

    bestSellers: {
        fontSize: 20,
        fontWeight: '900',
        color: "#e6009f",
        marginTop: 30,
    },

    newsletterButtonContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: "center",
    },
    newsletterButton: {
        backgroundColor: "#e6009f",
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        width: "85%",
        alignItems: "center",
    },
    newsletterButtonText: {
        color: "white",
        fontWeight: "bold",
    },

});
export default HomeScreen
