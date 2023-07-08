import AsyncStorage from '@react-native-async-storage/async-storage';

enum StorageKeysEnum {
    'STOP_GTFS_ID_KEY'
}

type StorageKey = keyof typeof StorageKeysEnum

interface StorageManager {
    // save a string to storage
    // returns boolean based on success
    saveKeyValuePair: (key: StorageKey, value: string) => Promise<boolean>
    // read a string from storage
    // returns string or undefined, if not found
    readKeyValuePair: (key: StorageKey) => Promise<string | null>
}

class AsyncStorageManager implements StorageManager {
    saveKeyValuePair = async (key: StorageKey, value: string) => {
        try {
            await AsyncStorage.setItem(key, value)
            return true
        } catch (e) {
            return false
        }
    }
    readKeyValuePair = async (key: string) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch (error) {
            return null
        }
    }
}

const def: StorageManager = new AsyncStorageManager()

export default def
