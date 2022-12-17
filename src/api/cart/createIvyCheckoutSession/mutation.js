export const CRETE_IVY_CHECKOUT_SESSION = `
mutation createIvyCheckoutSession( $cartId: String!, $express: Boolean! ) {
    createIvyCheckoutSession(
        input: {
            cartId: $cartId
            express: $express
        }
    ) {
      redirectUrl
      errorMessage
    }
}
`;
