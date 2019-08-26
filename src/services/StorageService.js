class StorageService {
    
    setItem(key, value) {
        sessionStorage.setItem(key, value)
    }

    getItem(key) {
        let item = sessionStorage.getItem(key)
        if(item === null || item === undefined) {
            return null
        }

        return item
    }

    removeItem(key) {
        sessionStorage.removeItem(key)
    }
}

export default new StorageService()