import * as SecureStore from 'expo-secure-store';

export const Save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
}

export const Get = async (key) => {
    return await SecureStore.getItemAsync(key);
}
export const Delete = async (key) => {
    await SecureStore.deleteItemAsync(key)
}