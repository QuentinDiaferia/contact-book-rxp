export default interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
        lat: number
        long: number
    }
}
