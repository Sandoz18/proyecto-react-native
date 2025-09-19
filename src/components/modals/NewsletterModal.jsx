import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, Pressable, Dimensions, Alert} from 'react-native'

 
  const {width} = Dimensions.get('window');
  const NewsletterModal = ({visible, onClose, onSubmit}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () =>{
   
    if (email.trim()=== ''|| !email.includes('@')) {
       Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
       return;
    }

      onSubmit(email);

     
      setEmail('');
      onClose();
    };
  
  return (
    <View>
      <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>¡Suscríbete a nuestro Newsletter!</Text>
          <Text style={styles.modalText}>
            Recibe las últimas noticias y ofertas exclusivas directamente en tu bandeja de entrada.
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Introduce tu correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonSubmit]}
              onPress={handleSubmit}
            >
              <Text style={styles.textStyle}>Suscribirme</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
 modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  input: {
    width: 240,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 8,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonSubmit: {
    backgroundColor: '#4CAF50',
  },
  buttonClose: {
    backgroundColor: '#F44336',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

})

export default NewsletterModal

//Renderizado global en app.jsx o algun componente que envuelva a la app.