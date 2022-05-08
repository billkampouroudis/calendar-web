import { object } from '@bill.kampouroudis/js-utils';
import makeRequest, { requestMethods } from './request';

const authApi = {
  login: async (data, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.POST,
        url: `${process.env.REACT_APP_API_URL}/auth/local`,
        data,
        options
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(object.get(() => error.data.error));
    }
  }
};

export default authApi;
