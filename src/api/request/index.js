import axios from 'axios';
import { is } from '@bill.kampouroudis/js-utils';
import urls from '../../pages/router/Urls';
import { getToken } from '../../utils/jwt';

export const requestMethods = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};

export const requestSource = axios.CancelToken.source();

const defaultHeaders = {
  'Content-Type': 'application/json'
};

const config = {
  headers: { ...defaultHeaders }
};

/**
 * Creates a request to the api using the given params
 * @param {string} method
 * @param {string} url
 * @param {object} data
 * @param {object} options
 *
 * @param {object} options.cancelToken
 * @param {object} options.headers
 * @example
 */
const makeRequest = async ({
  method = requestMethods.GET,
  url = '',
  data = {},
  options = {}
}) => {
  const {
    cancelToken = undefined, headers = {}, query = ''
  } = options;

  if (is.emptyObject(headers)) {
    config.headers = { ...defaultHeaders };
  } else {
    config.headers = {
      ...defaultHeaders,
      ...headers
    };
  }

  // Send the JWT if the user is logged in
  if (getToken()) {
    config.headers = {
      ...config.headers,
      Authorization: `bearer ${getToken()}`
    };
  }

  // Add cancel token to the request
  if (cancelToken) {
    config.cancelToken = cancelToken;
  } else {
    config.cancelToken = null;
  }

  try {
    const res = await axios({
      method,
      url: query ? `${url}?${query}` : url,
      data,
      ...config
    });

    return Promise.resolve(res);
  } catch (error) {
    // Log out the user if they make an unauthorized request
    if (error.request.status === 401) {
      window.location.replace(urls.LOGOUT);
    }

    return Promise.reject(error.response);
  }
};

export default makeRequest;
