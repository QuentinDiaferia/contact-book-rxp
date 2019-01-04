import {Platform} from 'reactxp'

declare const __DEV__: boolean

export const DEBUG = __DEV__
export const DEV = __DEV__

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
