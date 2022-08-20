const userService = require("../services/user.service");
const TypedError = require("../helper/ErrorHandler");
const User = require("../models/User");

async function userData(req, res, next) {
  const { type, error, status, user } = await userService.userDetails(
    req.params.id
  );

  if (status == 200) {
    return res.status(status).json({
      status,
      type,
      user,
    });
  }
  return res.status(status).json({
    status,
    type,
    error,
  });

}
async function adminData(req, res, next) {
  const { type, error, status, user } = await userService.adminDetails(req.user);

  if (status == 500) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }
  return res.status(status).json({
    status,
    type,
    user,
  });
}

async function sellers(req, res, next) {
  const { type, error, status, user } = await userService.sellers({
    page: req.query.page || 1,
    limit: req.query.limit || 10,
  });

  if (status == 500) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }
  return res.status(status).json({
    status,
    type,
    user,
  });
}

async function topSellers(req, res, next) {
  const { type, error, status, user } = await userService.topSellers({
    page: req.query.page || 1,
    limit: req.query.limit || 5,
  });

  if (status == 500) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }
  return res.status(status).json({
    status,
    type,
    user,
  });
}

async function customers(req, res, next) {
  const { type, error, status, user } = await userService.customers({
    page: req.query.page || 1,
    limit: req.query.limit || 10,
  });

  if (status == 500) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }
  return res.status(status).json({
    status,
    type,
    user,
  });
}

async function addUser(req, res, next) {
  const { body, file } = req;
  const response = await userService.addUser(body, file);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      user: response.user,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function userUpdate(req, res, next) {
  const { body, file, user } = req;
  const response = await userService.userUpdate(body, file, req.params.id);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      user: response.user,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function adminUpdate(req, res, next) {
  const { body, file, user } = req;
  const response = await userService.adminUpdate(body, file, user);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      user: response.user,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}



async function deleteUser(req, res, next) {

  const { status,type,error } = await userService.deleteUser(req.params.id);

  if (status == 500) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }
  return res.status(status).json({
    status,
    type,
  });
}


module.exports = { userData, userUpdate, adminData, adminUpdate, sellers, customers, addUser, deleteUser, topSellers };
