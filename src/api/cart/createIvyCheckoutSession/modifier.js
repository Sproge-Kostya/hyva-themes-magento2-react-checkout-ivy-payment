import { get as _get } from 'lodash-es';

export default function modifyСreateIvyCheckoutSession(result) {
    return _get(result, 'data.redirectUrl');
}
