const authService = require("../services/auth.service");
const TypedError = require("../helper/ErrorHandler");

async function login(req, res, next) {
  const { phone, otp, fcm_token, role } = req.body;

  const { type, error, status, user, token } = await authService.userLogin(
    phone,
    otp,
    fcm_token,
      role
  );

  if (status === 400) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }

  // 3) If everything is OK, send data
  return res.status(status).json({
    status,
    type,
    user,
    token,
  });
}

async function adminLogin(req, res, next) {
  const { email, password } = req.body;

  const { type, error, status, user, token } = await authService.adminLogin(
    email,
    password
  );

  if (status === 400) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }

  // 3) If everything is OK, send data
  return res.status(status).json({
    status,
    type,
    user,
    token,
  });
}

async function sendOTP(req, res, next) {
  const { phone, role, fcm_token } = req.body;

  const { type, error, status } = await authService.sendOTP(
    phone,
    role,
    fcm_token
  );

  if (status === 400) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }

  // 3) If everything is OK, send data
  return res.status(status).json({
    status,
    type,
    message: "OTP has been sent to your register phone.",
  });
}

async function verifyOTP(req, res, next) {
  const { email, otp } = req.body;

  const { type, error, user, token, status } = await authService.verifyOTP(
    email,
    otp
  );

  if (status === 400) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }

  // 3) If everything is OK, send data
  return res.status(status).json({
    status,
    type,
    user,
    token,
  });
}

module.exports = { login, sendOTP, adminLogin, verifyOTP };
