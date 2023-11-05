import * as SecureStore from 'expo-secure-store';

export async function Save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export async function Get(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) return result;
  else {
    console.log("No values stored)")
    return null;
  }
}
export const Delete = async (key) => {
    await SecureStore.deleteItemAsync(key)
}