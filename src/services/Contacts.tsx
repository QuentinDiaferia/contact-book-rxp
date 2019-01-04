import axios from 'axios'

import {API_URL} from '../config'

import LocalDb from './LocalDb'

import ContactModel from '../models/Contact'

class Contacts {
    private url: string = API_URL + 'users/'

    list() {
        return axios.get(this.url).then(response => {
            LocalDb.putContacts(response.data)
            return response
        })
    }

    listCache() {
        return LocalDb.getContacts().then(data => {
            return data as ContactModel[]
        })
    }

    get(id: string) {
        return axios.get(this.url + id)
    }

    getCache(id: string) {
        return LocalDb.getContacts().then(cacheData => {
            const data = cacheData.find((e: ContactModel) => e.id === id)
            if (data === undefined) {
                throw new Error()
            }
            return data as ContactModel
        })
    }
}

export default new Contacts()
