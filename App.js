import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Alert,
  Button,
  ImageBackground,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import NewsletterModal from "./src/components/modals/NewsletterModal.jsx";
import ConfirmDeleteModal from "./src/components/modals/ConfirmDeleteModal.jsx";
import Categories from "./src/components/data/categories.json";
import Header from "./src/components/Header.jsx";
import FlatCard from "./src/components/FlatCard.jsx";

const { width } = Dimensions.get("window");

export default function App() {
  const [text, setText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [itemToDeleteContent, setItemToDeleteContent] = useState("");
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  const handleAddTask = () => {
    if (text.trim() !== "") {
      Alert.alert("Tarea agregada !!! ");
      setTaskList((prevState) => [
        ...prevState,
        { id: Math.random().toString(), value: text },
      ]);
      setText("");
    } else {
      Alert.alert("Error", "Ingrese una cadena de texto");
    }
  };

  const handleDeleteItem = (id) => {
    const taskToDelete = taskList.find((task) => task.id === id);
    if (taskToDelete) {
      setItemToDeleteId(id);
      setItemToDeleteContent(taskToDelete.value);
      setShowConfirmModal(true);
    }
  };

  const handleConfirmDelete = () => {
    setTaskList((currentTasks) => {
      const updatedTasks = currentTasks.filter(
        (task) => task.id !== itemToDeleteId
      );
      console.log("Tareas después de eliminar (confirmado):", updatedTasks);
      return updatedTasks;
    });
    Alert.alert("Tarea eliminada!", "La tarea ha sido eliminada con éxito.", [
      { text: "OK" },
    ]);
    setShowConfirmModal(false);
    setItemToDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setItemToDeleteId(null);
  };

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

  const renderCategoryItem = ({ item }) => (  
    
    <FlatCard>      
        <TouchableOpacity style={styles.categoryItem}>
           <Image
        source={{ uri: item.image }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryText}>{item.title}</Text>      
    </TouchableOpacity>  
    </FlatCard>
  );

  return (
    <>
    <Header title="Acá va un titulo"/>
    
    
      <ImageBackground
        source={require("./assets/imagenPortada.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.appContainer}>          
          <View style={styles.discountContainer}>
            <Text style={styles.mainTitle}>Esto es el titulo </Text>
          </View>
          <Text style={styles.discountText}>DESCUENTOS 50% OFF </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.taskInput}
              placeholder="Ingresá el texto"
              onChangeText={setText}
              value={text}
            />
            <Button title="agregar" onPress={handleAddTask} color="#22976eff" />
          </View>

          <View style={styles.taskListWrapper}>
            <FlatList
              data={taskList}
              renderItem={({ item }) => (
                <View style={styles.flatListItem}>
                  <Text style={styles.flatListItemText}>{item.value}</Text>
                  <Button
                    title="x"
                    color={"#5512ee"}
                    onPress={() => handleDeleteItem(item.id)}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          <FlatList
            data={Categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatlistCategory}
          />
          
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
        </View>
        <ConfirmDeleteModal
          visible={showConfirmModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          itemContent={itemToDeleteContent}
        />
        <NewsletterModal
          visible={showNewsletterModal}
          onClose={handleCloseNewsletterModal}
          onSubmit={handleNewsletterSubmit}
        />

        <StatusBar style="auto" />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  discountContainer: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  mainTitle: {
    color: "#31f21fff",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 20,
  },
  discountText: {
    color: "#eee1e1ff",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    position: "relative",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
    gap: 10,
    alignSelf: "center",
    borderRadius: 10,
    padding: 5,
  },
  taskInput: {
    backgroundColor: "#f5f5f5",
    borderColor: "#8c8c8c",
    borderRadius: 16,
    borderBottomWidth: 1,
    flex: 1,
    textAlign: "center",
  },
  taskListWrapper: {
    flex: 1,
  },
  flatListItem: {
    backgroundColor: "#264a77ff",
    marginTop: 10,
    color: "white",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
  },
  flatListItemText: {
    color: "#f7eeeeff",
    flexShrink: 1,
    marginRight: 10,
  },
  newsletterButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  newsletterButton: {
    backgroundColor: "#2abd2fff",
    marginBottom: 30,
    padding: 10,
    borderRadius: 8,
    width: "85%",
    alignItems: "center",
  },
  newsletterButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  flatlistCategorias: {
    marginTop: 10,
    marginBottom: 20,
  },
  categoryItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
});
