import axios from 'axios'
import {API_URL} from '../config'
import LocalDb from '../services/LocalDb'
import ContactModel from '../models/Contact'

class Contacts {
    private url: string = API_URL + 'users/'

    list() {
        return axios.get(this.url).then((response: {data: ContactModel[]}) => {
            LocalDb.insertContacts(response.data)
            return response
        })
    }

    get(id: string) {
        return axios.get(this.url + id).then((response: {data: ContactModel}) => {
            LocalDb.putContact(response.data)
            return response
        })
    }

    create(data: ContactModel) {
        return axios.post(this.url, data).then((response: {data: ContactModel}) => {
            LocalDb.putContact(response.data)
            return response
        })
    }

    listCache() {
        return LocalDb.listContacts().then((data: ContactModel[]) => data)
    }

    getCache(id: string) {
        return LocalDb.getContact(id).then((data: ContactModel) => data)
    }
}

export default new Contacts()
