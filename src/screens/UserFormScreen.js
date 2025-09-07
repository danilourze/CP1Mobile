import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveUser } from '../services/AsyncStorageService';

export default function UserFormScreen({ navigation, route }) {
  const userToEdit = route.params?.user;
  const [nome, setNome] = useState(userToEdit?.nome || '');
  const [email, setEmail] = useState(userToEdit?.email || '');
  const [urlAvatar, setUrlAvatar] = useState(userToEdit?.urlAvatar || '');

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


  const handleSave = async () => {
    if (!nome || !email || !urlAvatar) {
      Alert.alert("Ops!", "Todos os campos devem ser preenchidos!");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido, por favor.");
      return;
    }

    const newUser = {
      id: userToEdit?.id,
      nome,
      email,
      urlAvatar,
    };

    await saveUser(newUser);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Informe o Nome"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Informe o E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>URL do Avatar</Text>
      <TextInput
        style={styles.input}
        value={urlAvatar}
        onChangeText={setUrlAvatar}
        placeholder="Informe a URL do Avatar"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f2f2f7',
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "600",
    color: "#444",
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 18,
    backgroundColor: "#fff",
    elevation: 2, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: '#ed145b',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
