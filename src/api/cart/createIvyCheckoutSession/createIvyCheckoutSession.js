import LocalStorage from '../../../../../../utils/localStorage';
import modifier from './modifier';
import sendRequest from '../../../../../../api/sendRequest';
import { CRETE_IVY_CHECKOUT_SESSION } from './mutation';

export default async function createIvyCheckoutSession(
  dispatch,
  express = true
) {
  const variables = { cartId: LocalStorage.getCartId(), express };

  return modifier(
    await sendRequest(dispatch, {
      query: CRETE_IVY_CHECKOUT_SESSION,
      variables,
    })
  );
}
