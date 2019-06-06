import {Platform} from 'reactxp'

declare const __DEV__: boolean

export const DEBUG = __DEV__
export const DEV = __DEV__
export const DB_NAME = 'myDb'
export const DB_TABLE_CONTACTS = 'contacts'

function getApiUrl() {
    switch (Platform.getType()) {
        case 'web':
        case 'android':
        case 'ios':
        case 'windows':
        default:
            return 'https://jsonplaceholder.typicode.com/'
            break
    }
}

export const API_URL = getApiUrl()
