import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator, } from 'react-native'
import { colors } from '../../global/colors'
import CameraIcon from '../../components/CameraIcon'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { usePutProfilePictureMutation } from '../../services/profileApi'
import { setImage, logout } from '../../store/slices/userSlice'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const ProfileScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [address, setAddress] = useState("");
    const [locationLoaded, setLocationLoaded] = useState(false);

    const userEmail = useSelector(state => state.user.email);
    const localId = useSelector(state => state.user.localId);
    const image = useSelector(state => state.user.image);


    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        });

        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
            dispatch(setImage(imgBase64));
            triggerPutProfilePicture({ localId: localId, image: imgBase64 });
        }
    };

    useEffect(() => {
        async function getCurrentLocation() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Los permisos de ubicación fueron denegados');
                    setLocationLoaded(true);
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                if (location) {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
                    );
                    const data = await response.json();

                    setLocation(location);

                    if (data.results && data.results.length > 0) {
                        setAddress(data.results[0].formatted_address);
                    } else {
                        setAddress("Dirección no encontrada");
                    }
                }
            } catch (error) {
                console.log("Error al obtener la ubicación:", error);
                setAddress("Error al obtener la dirección");
            } finally {
                setLocationLoaded(true);
            }
        }
        getCurrentLocation();
    }, []);

    if (!userEmail) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.purple} />
                <Text style={styles.loadingText}>Cargando perfil...</Text>
            </View>
        );
    }

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{userEmail?.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                    <CameraIcon />
                </Pressable>
            </View>

            <Text style={styles.profileData}>Email: {userEmail} </Text>
            <View style={styles.mapContainer}>
                {
                    (location && location.coords)
                        ?
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ "latitude": location.coords.latitude, "longitude": location.coords.longitude }} title={"Mi Ubicación"} />
                        </MapView>
                        :
                        (
                            locationLoaded
                                ?
                                <Text>{errorMsg || "Hubo un problema al obtener la ubicación"}</Text>
                                :
                                <ActivityIndicator size="large" />
                        )
                }
                <View style={styles.placeDescriptionContainer}>
                    <View style={styles.addressContainer}>
                        <Text>Dirección:</Text>
                        <Text style={styles.address}>{address || ""}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.logoutButtonContainer}>
                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </Pressable>
            </View>
        </View>

    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    profileContainer: {
        flex:1,
        padding: 32,       
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.white,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    mapContainer: {
        width: '100%',
        height: 240,
        overflow: "hidden",
        elevation: 5,
        marginBottom: 16
    },
    map: {
        height: 240,
    },
    mapTitle: {
        fontWeight: '700'
    },
    placeDescriptionContainer: {
        flexDirection: 'row',
        gap: 16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: colors.dark,
    },
     logoutButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButton:{
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});