const addressService = require("../services/address.service");

async function addressData(req, res, next) {
  const response = await addressService.addressList(req.user);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      addresses: response.addresses,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function createAddress(req, res, next) {
  const { body, user } = req;

  const response = await addressService.createAddress(body, user);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      address: response.address,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function updateAddress(req, res, next) {
  const { body, user } = req;
  const response = await addressService.updateAddress(body, req.params.id);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      address: response.address,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function deleteAddress(req, res, next) {
  const response = await addressService.deleteAddress(req.params.id);

  if (response.status === 204) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

module.exports = {
  createAddress,
  addressData,
  updateAddress,
  deleteAddress,
};
