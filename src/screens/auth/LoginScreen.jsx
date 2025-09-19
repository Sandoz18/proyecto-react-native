import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Pressable, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setEmail, setLocalId, setFirstName, setProfilePicture } from '../../store/slices/userSlice';
import { saveSession, clearSession } from '../../components/db/db';


const textInputWidth = Dimensions.get('window').width * 0.7;

const AlertComponent = ({ message, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss])

    if (!message) return null;

    return (
        <View style={styles.alertContainer}>
            <Text style={styles.alertText}>{message}</Text>
        </View>
    );

};
const LoginScreen = ({ navigation, route }) => {
    console.log('Rendering LoginScreen...');
    const [email, setEmailState] = useState('');
    const [password, setPassword] = useState('');
    const [persistSession, setPersistSession] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [triggerLogin] = useLoginMutation();

    const dispatch = useDispatch();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

   const onSubmit = async () => {
    try {
        const userData = await triggerLogin({ email, password }).unwrap();

        // 1. OBTENER DATOS DE LA BASE DE DATOS
        const response = await fetch(`${process.env.EXPO_PUBLIC_RTDB_URL}/users/${userData.localId}.json`);
        const userDbData = await response.json();

        // 2. DISPATCH DE TODOS LOS DATOS A REDUX
        dispatch(setEmail(userData.email));
        dispatch(setLocalId(userData.localId));
        if (userDbData.firstName) {
            dispatch(setFirstName(userDbData.firstName));
        }
        if (userDbData.profilePictureUrl) {
            dispatch(setProfilePicture(userDbData.profilePictureUrl));
        }
        
        // 3. GUARDAR LA SESIÓN Y MOSTRAR ALERTA
        setAlertMessage("Login exitoso!");
        if (persistSession) {
            await saveSession(userData.localId, userData.email);
        } else {
            await clearSession();
        }
    } catch (error) {
        console.error('Error en el login:', error);
        setAlertMessage("Error en el login. Por favor, revisa tus credenciales.");
    }
};

    const handleNavigateToSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <AlertComponent message={alertMessage} onDismiss={() => setAlertMessage(null)} />
            <Text style={styles.title}>REACT NATIVE APP</Text>
            <Text style={styles.welcome}>Bienvenido</Text>
            <Text style={styles.subtitle}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmailState(text)}
                keyboardType='email-address'
                autoCapitalize="none"
            />
            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Contraseña"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!showPassword} // Controlado por el estado
                />
                <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordToggle}>
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#7f8c8d"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.rememberMe}>
                <Text style={{ color: 'white' }}>¿Mantener sesión iniciada?</Text>
                <Switch
                    onValueChange={setPersistSession}
                    value={persistSession}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
            </View>
            <TouchableOpacity onPress={handleNavigateToSignup}>
                <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#2c3e50",
    },
    title: {
        fontSize: 32,
        marginBottom: 50,
        color: "#fff",
        fontFamily: 'Roboto-Bold',
    },
    welcome: {
        color: '#fff',
        marginBottom: 50,
        fontSize: 24,
    },
    subtitle: {
        color: '#fff',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#7f8c8d',
        color: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#34495e',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#7f8c8d',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#34495e',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    passwordInput: {
        flex: 1,
        padding: 10,
        color: '#fff',
    },
    passwordToggle: {
        padding: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        marginTop: 15,
        color: '#fff',
    },
    rememberMe: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginTop: 10,
    },
    alertContainer: {
        position: 'absolute',
        top: 50,
        width: '80%',
        backgroundColor: '#2ecc71',
        padding: 15,
        borderRadius: 8,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LoginScreen;
