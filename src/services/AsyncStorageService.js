import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@AppUsuarios:users';

// Obtém todos os usuários do Async Storage
export const getUsers = async () => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    return usersJson != null ? JSON.parse(usersJson) : [];
  } catch (e) {
    console.error("Erro ao carregar usuários:", e);
    return [];
  }
};

// Salva um novo usuário ou atualiza um existente
export const saveUser = async (user) => {
  try {
    const users = await getUsers();
    let newUsers = [...users];

    if (user.id) { // Atualiza usuário existente
      newUsers = users.map(u => u.id === user.id ? user : u);
    } else { // Cria novo usuário
      const newId = new Date().getTime().toString();
      newUsers.push({ ...user, id: newId });
    }

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
    return newUsers;
  } catch (e) {
    console.error("Erro ao salvar usuário:", e);
  }
};

// Função para deletar um usuário
export const deleteUser = async (userId) => {
  try {
    const users = await getUsers();
    const newUsers = users.filter(user => user.id !== userId);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
    return newUsers;
  } catch (e) {
    console.error("Erro ao deletar usuário:", e);
  }
};
 