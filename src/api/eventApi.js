import { object } from '@bill.kampouroudis/js-utils';
import makeRequest, { requestMethods } from './request';

const userApi = {
  find: async (options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.GET,
        url: `${process.env.REACT_APP_API_URL}/events`,
        options
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(object.get(() => error.data.error));
    }
  },
  create: async (data, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.POST,
        url: `${process.env.REACT_APP_API_URL}/events`,
        data,
        options
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(object.get(() => error.data.error));
    }
  },
  update: async (id, data, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.PUT,
        url: `${process.env.REACT_APP_API_URL}/events/${id}`,
        data,
        options
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(object.get(() => error.data.error));
    }
  },
  delete: async (id, options) => {
    try {
      const response = await makeRequest({
        method: requestMethods.DELETE,
        url: `${process.env.REACT_APP_API_URL}/events/${id}`,
        options
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(object.get(() => error.data.error));
    }
  }
};

export default userApi;
