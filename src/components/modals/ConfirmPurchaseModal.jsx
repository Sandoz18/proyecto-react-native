import { StyleSheet, Text, View, Modal, Button, Pressable } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message'

const ConfirmPurchaseModal = ({ show, onConfirm, onCancel, totalPrice }) => {
    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={show}
                onRequestClose={() => {
                    Toast.show({
                        type: 'info',
                        text1: 'Modal cerrado',
                        text2: 'La confirmación de compra fue cancelada.',
                        visibilityTime: 3000,
                    });
                    onCancel();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>ConfirmPurchaseModal</Text>
                        <Text style={styles.modalText}>¿Estás seguro de que quieres finalizar tu compra?</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable style={[styles.button, styles.buttonCancel]} onPress={onCancel}>
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.buttonConfirm]} onPress={onConfirm}>
                                <Text style={styles.textStyle}>Confirmar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )





}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 25,
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        gap: 10, 
    },
    button: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        minWidth: 100,
    },
    buttonConfirm: {
        backgroundColor: '#A8FF60',
    },
    buttonCancel: {
        backgroundColor: '#FF4B4B',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ConfirmPurchaseModal

//Este modal va solo en la pantalla del carrito de compras