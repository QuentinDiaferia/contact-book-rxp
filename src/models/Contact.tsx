import Address from './Address'
import Company from './Company'

export default interface Contact {
    id: string
    name: string
    email: string
    username: string
    phone: string
    website: string
    address: Address
    company: Company
}
