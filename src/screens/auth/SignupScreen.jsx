import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firebaseApp } from '../../firebase/firebaseConfig';

const SignupScreen = ({ navigation }) => {
  console.log('Rendering SignupScreen...');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState(''); 
  

  const handleSignup = async () => {
    if (!email || !password || !username || !confirmPassword) {
      Alert.alert("Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, ingresa una dirección de correo electrónico válida.");
      return;
    }

    if (password.length < 6) {
    Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
    return;
}
    

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getDatabase(firebaseApp);
      await set(ref(db, 'users/' + user.uid), { 
        username: username, 
        email: email,
        createdAt: new Date().toISOString(),
      });

      
      Alert.alert("Éxito", "Usuario registrado correctamente.", [
        {
          text: "OK",          
        }
      ]);

    } catch (error) {
      let errorMessage = "Ocurrió un error inesperado"
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "El email ya está en uso.";
          break;
        case "auth/invalid-email":
          errorMessage = "El email no es válido.";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es muy débil.";
          break;
        default:
          console.error(error);
          break;
      }
      Alert.alert("Error de registro", errorMessage);
    }
  }

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name='arrow-back' size={24} color='white' />
      </TouchableOpacity>
      <Text style={styles.brand}>ACA VA LA MARCA</Text>
      <Text style={styles.title}>Crear Cuenta</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          placeholderTextColor="#bdc3c7"
          autoCapitalize="none"
          value={username} // Muestra el valor del nuevo estado
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#bdc3c7"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          placeholderTextColor="#bdc3c7"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmar Contraseña"
          placeholderTextColor="#bdc3c7"
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={handleNavigateToLogin}>
          <Text style={styles.link}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignupScreen;

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
  inputContainer: {
    width: '100%',
    alignItems: 'center',
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
  passwordContainer: {
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
  eyeIcon: {
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
  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  linkText: {
    color: '#fff',
  },
  link: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  brand: {
    fontFamily: 'Roboto-Bold',
    backgroundColor: 'transparent'
  },
  goBackButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});
