import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Alert, 
  LayoutAnimation, 
  UIManager,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUsers, deleteUser } from '../services/AsyncStorageService';
import Toast from 'react-native-toast-message';

// Habilita animações no Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const loadedUsers = await getUsers();
    setUsers(loadedUsers);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadUsers();
    }, [])
  );

  const handleDeleteUser = (id) => {
    Alert.alert(
      "Excluir usuário",
      "Deseja realmente remover este perfil?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: async () => {
            await deleteUser(id);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            loadUsers();
            Toast.show({
              type: 'success',
              text1: 'Perfil excluído',
              text2: 'O usuário foi removido com sucesso',
              position: 'bottom'
            });
          } 
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <Image
        style={styles.avatar}
        source={{ uri: item.urlAvatar || 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png' }}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.nome}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('UserForm', { user: item })}>
          <Text style={styles.buttonText}>🖊️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteUser(item.id)}>
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('UserForm')}>
        <Text style={styles.addButtonText}>➕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    marginVertical: 8,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: "#ed145b",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#ed145b',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: "#ed145b",
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 6,
    backgroundColor: '#ed145b',
    borderRadius: 6,
    marginRight: 5,
  },
  deleteButton: {
    padding: 6,
    backgroundColor: '#ff6f61',
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ed145b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 34,
  },
});
 