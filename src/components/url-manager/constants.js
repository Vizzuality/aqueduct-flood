import { setParamsFromURL } from 'modules/app/actions';

export const URL_PROPS = [
  {
    type: 'string',
    value: 'p',
    redux: 'filters',
    action: setParamsFromURL,
    required: false
  }
];

export default { URL_PROPS };