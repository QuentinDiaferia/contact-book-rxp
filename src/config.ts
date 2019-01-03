import {Platform} from 'reactxp'

declare const __DEV__: boolean

export const DEBUG = __DEV__
export const DEV = __DEV__

function getApiUrl() {
    switch (Platform.getType()) {
        case 'web':
            return 'http://localhost:3000/'
            break
        case 'android':
        case 'ios':
        case 'windows':
        default:
            return 'http://10.0.2.2:3000/'
            break
    }
}

export const API_URL = getApiUrl()
