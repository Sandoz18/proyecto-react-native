import { StyleSheet, Text, View, Button, Modal } from 'react-native'
import React from 'react'

//Le paso las props desde el componente app
const ConfirmDeleteModal = ({ visible, onConfirm, onCancel, itemContent }) => {
    return (        
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onCancel}
            >
                <View style={styles.centeredView}>
                    <View style={styles.confirmModalView}>
                        <Text style={styles.confirmModalTitle}>¿Estás segura?</Text>
                        <Text style={styles.confirmModalText}>
                            ¿Realmente quieres eliminar '{itemContent}'?
                        </Text>
                        <View style={styles.confirmModalButtons}>
                            <Button
                                title="Sí, eliminar"
                                onPress={onConfirm}
                                color="#FF4B4B"
                            />
                            <Button
                                title="Cancelar"
                                onPress={onCancel}
                                color="#6c757d"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
       
    )
}

export default ConfirmDeleteModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    confirmModalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    confirmModalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
        textAlign: "center",
    },
    confirmModalText: {
        marginBottom: 25,
        textAlign: "center",
        fontSize: 16,
        color: "#555",
    },
    confirmModalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        gap: 10,
    },
})