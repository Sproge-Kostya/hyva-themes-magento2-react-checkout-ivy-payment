import { get as _get } from 'lodash-es';

export default function modifyСreateIvyCheckoutSession(result) {
  const redirectUrl = _get(result, 'data.redirectUrl');
  const errorMessage = _get(result, 'data.redirectUrl');

  return {
    redirectUrl,
    errorMessage,
  };
}
