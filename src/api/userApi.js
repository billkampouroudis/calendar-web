import { object } from '@bill.kampouroudis/js-utils';
import makeRequest, { requestMethods } from './request';

const userApi = {
  me: async (options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${process.env.REACT_APP_API_URL}/users/me`,
        options
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(object.get(() => error.data.error));
    }
  }
};

export default userApi;
