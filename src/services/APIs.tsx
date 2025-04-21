import ConfigurationAPIs from './configurationAPIs';

const APIs = {
  login: async (data: any, customPath?: string) => {
    const path = customPath || 'auth/login';
    return ConfigurationAPIs.post(path, data);
  },

  cresteUser: async (data: any, customPath?: string) => {
    const path = customPath || 'users/create';
    return ConfigurationAPIs.post(path, data);
  },




  ///////////////////////////////////COMPANIES////////////////////////////////////////////////////

  cresteCompanies: async (data: any, customPath?: string) => {
    const path = customPath || 'companies/create';
    return ConfigurationAPIs.post(path, data);
  },



  getCompanies: async (id: number, customPath?: string) => {
    const path = customPath || `companies/get/${id}`;
    return ConfigurationAPIs.get(path);
  },



  ///////////////////////////////////SUCURSALES////////////////////////////////////////////////////

  cresteBranch: async (data: any, customPath?: string) => {
    const path = customPath || 'branch/create';
    return ConfigurationAPIs.post(path, data);
  },

  getBranch: async (data: any, customPath?: string) => {
    const path = customPath || `branch/get/${data.companyId}/${data.userId}`;
    return ConfigurationAPIs.get(path);
  },

  ///////////////////////////////////ALMACEN////////////////////////////////////////////////////

  cresteWarehouses: async (data: any, customPath?: string) => {
    const path = customPath || 'store/create';
    return ConfigurationAPIs.post(path, data);
  },

  getWarehouses: async (data: any, customPath?: string) => {
    const path = customPath || `store/get?companyId=${data.companyId}&branchId=${data.branchId}`;
    return ConfigurationAPIs.get(path);
  },



  ///////////////////////////////////UNIDADES////////////////////////////////////////////////////

  cresteUnits: async (data: any, customPath?: string) => {
    const path = customPath || 'units/create';
    return ConfigurationAPIs.post(path, data);
  },

  getUnits: async (data: any, customPath?: string) => {
    const path = customPath || `units/get?companyId=${data.companyId}` + (data.branchId ? `&branchId=${data.branchId}` : '');
    return ConfigurationAPIs.get(path);
  },


  ///////////////////////////////////PRODUCTO////////////////////////////////////////////////////

  cresteProducts: async (data: any, customPath?: string) => {
    const path = customPath || 'products/create';
    return ConfigurationAPIs.post(path, data);
  },

  getProducts: async (customPath?: string) => {
    const path = customPath || `products/get`;
    return ConfigurationAPIs.get(path);
  },





  // Administradores 
  createAdministrator: async (data: any, customPath?: string) => {
    console.log(data)
    const path = customPath || 'user/create';
    const token = data.token;
    // delete data.token;
    const headers = {
      Authorization: token,
    };
    return ConfigurationAPIs.post(path, data, { headers });
  },


  // Administradores
  getUsers: async (data: any, customPath?: string) => {
    const path = customPath || `user/${data.filtro}`;
    const config = {
      headers: {
        Authorization: data.token,
      },
      params: { ...data },
    };

    return ConfigurationAPIs.get(path, config);
  },

  // Administradores
  updateStatus: async (id: any, data: any, token: any, customPath?: string) => {
    const path = customPath || `user/setState/${id}`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: { ...data },
    };

    return ConfigurationAPIs.put(path, data, config);
  },

  // Administradores
  updateAdministrator: async (id: any, data: any, token: any, customPath?: string) => {
    const path = customPath || `user/updateUser/${id}`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: { ...data },
    };

    return ConfigurationAPIs.put(path, data, config);
  },

  // Administradores
  searchUser: async (data: any, customPath?: string) => {
    const path = customPath || `user/searchUser/${data.email}`;
    const config = {
      headers: {
        Authorization: data.token,
      },
      params: { ...data },
    };

    return ConfigurationAPIs.get(path, config);
  },




  ///////////////////////////////////////////////////////// Sub categorias ////////////////////////////////////////////////////////
  createSubCategories: async (data: any, token: string, customPath?: string) => {
    const path = customPath || 'category/create';
    const headers = {
      Authorization: token,
    };
    return ConfigurationAPIs.post(path, data, { headers });
  },


  // Administradores
  getCategories: async (classification: any, token: any, customPath?: string) => {
    const path = customPath || `category/get/${classification}`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: { ...classification },
    };

    return ConfigurationAPIs.get(path, config);
  },

  // Administradores
  updateStatusCategory: async (id: any, data: any, token: any, customPath?: string) => {
    const path = customPath || `category/state/${id}`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: { ...data },
    };

    return ConfigurationAPIs.put(path, data, config);
  },

  // Administradores
  updateCategory: async (id: any, data: any, token: any, customPath?: string) => {
    const path = customPath || `category/get/${id}`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: { ...data },
    };

    return ConfigurationAPIs.put(path, data, config);
  },





}




export default APIs;



