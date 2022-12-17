export const CRETE_IVY_CHECKOUT_SESSION = `
mutation createIvyCheckoutSession( $cartId: String!, $express: Boolean ) {
    createIvyCheckoutSession(
        input: {
            cart_id: $cartId
            express: $express
        }
    ) {
      redirectUrl
      errorMessage
    }
}
`;
