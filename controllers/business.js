import {getBusinesses, createBusiness} from "../dao/business.js"

export const get = async (query = {}) => {
    const business = await getBusinesses(query);
    return {
      status: "success",
      payload: business,
    };
  };

  export const create = async (body) => {
    const  business = await createBusiness(body);
    return {
      status: "success",
      payload:  business,
    };
  };
  