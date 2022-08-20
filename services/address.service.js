const Address = require("../models/Address");

async function addressList(user) {
  try {
    const addresses = await Address.find({user:user.id});
    console.log("============>", addresses);
    return {
      status: 200,
      type: "success",
      addresses: addresses,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function createAddress(body, user) {
  let requiredFields = new Array();

  if (!body.name) {
    requiredFields.push({ name: "name field required" });
  } else if (body.name.length < 5) {
    requiredFields.push({
      name: "name field must have text more then 5 letters.",
    });
  }
  
  if (!body.phone) {
    requiredFields.push({ phone: "phone field required" });
  } else if (body.phone.length < 10) {
    requiredFields.push({
      phone: "phone field must have 10 digits.",
    });
  }
  
  if (!body.address) {
    requiredFields.push({ address: "address field required" });
  }
  if (!body.postalCode) {
    requiredFields.push({ postalCode: "postalCode field required" });
  }else if (body.postalCode.length < 6) {
    requiredFields.push({
      postalCode: "postalCode field must have 6 digits.",
    });
  }
  
  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }

  body["user"] = user.id;
  let address = new Address(body);

  try {
    address = await address.save();

    return {
      status: 200,
      type: "success",
      address: address,
    };
  } catch (error) {
    console.log("==================>",error);
    return {
      status: 500,
      type: "error",
      error: "Internal server error.",
    };
  }
}

async function updateAddress(body,id) {

  let requiredFields = new Array();

  if (!body.name) {
    requiredFields.push({ name: "name field required" });
  } else if (body.name.length < 5) {
    requiredFields.push({
      name: "name field must have text more then 5 letters.",
    });
  }
  
  if (!body.phone) {
    requiredFields.push({ phone: "phone field required" });
  } else if (body.phone.length < 10) {
    requiredFields.push({
      phone: "phone field must have 10 digits.",
    });
  }
  
  if (!body.address) {
    requiredFields.push({ phone: "phone field required" });
  }
  if (!body.postalCode) {
    requiredFields.push({ postalCode: "postalCode field required" });
  }else if (body.postalCode.length < 6) {
    requiredFields.push({
      postalCode: "postalCode field must have 6 digits.",
    });
  }
  
  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }

  try {
    const address = await Address.findByIdAndUpdate(id, body, {
      new: true,
    });
    address.save();
    return {
      status: 200,
      type: "success",
      address: address,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function deleteAddress(id) {
  try {
    const result = await Address.findByIdAndDelete(id);

    return {
      status: 204,
      type: "success",
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}

module.exports = {
  addressList,
  createAddress,
  updateAddress,
  deleteAddress,
};
