import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import UserListScreen from './src/screens/UserListScreen';
import UserFormScreen from './src/screens/UserFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ed145b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{
            title: 'Lista de Usuários',
          }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserFormScreen}
          options={{
            title: 'Formulário de Usuários',
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

 