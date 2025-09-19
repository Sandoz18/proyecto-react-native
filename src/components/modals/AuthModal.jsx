import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function AuthModal({ isVisible, onClose }) {
   

    const handleNavigateToSignup = () => {
        onClose();
      
    };

    const handleNavigateToLogin = () => {
        onClose();
       
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.modalText}>
                        ¡Regístrate para descubrir todas nuestras ofertas especiales!
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.signupButton} onPress={handleNavigateToSignup}>
                            <Text style={styles.buttonText}>Regístrate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={handleNavigateToLogin}>
                            <Text style={styles.buttonText}>Iniciar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semitransparente
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    signupButton: {
        backgroundColor: '#e6009f',
        borderRadius: 8,
        padding: 15,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#000',
        borderRadius: 8,
        padding: 15,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
});

