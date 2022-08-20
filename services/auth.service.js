const User = require("../models/User");
const Admin = require("../models/Admin");
const TypedError = require("../helper/ErrorHandler");
var dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/VerifyToken");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

dotenv.config();

let transporter = nodemailer.createTransport({
  service: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function userLogin(phone, otp, fcm_token, role) {
  if (!phone || (phone && phone.length < 10)) {
    return {
      status: 400,
      type: "error",
      errors: "Invalid phone number",
    };
  } else {
    try {
      const user = await User.findOne({ phone: phone});

      if (!user) {
        let user = new User({ phone: phone, role:role, fcm_token:fcm_token,status:"active"  });
        try {
          user = await user.save();
          let token = jwt.sign(
              { id: user.id, phone: phone, role: role },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_REFRESH_EXPIRATION_DAYS,
              }
          );


          return {
            status: 200,
            type: "Success",
            user: user,
            token: token,
          };
        } catch (error) {
          return {
            status: 500,
            type: "error",
            error: "Internal server error.",
          };
        }

       }

      else if (user && user.role == "seller" && user.isApproved === false) {
        return {
          status: 400,
          type: "error",
          error:
            "User Not Approved. Please contact support to activate your account.",
        };
      } else if (user && user.role == "user" && user.status === 'inactive') {
        return {
          status: 400,
          type: "error",
          error:
              "User Not Active. Please contact support to activate your account.",
        };
      } else {

        let token = jwt.sign(
          { id: user.id, phone: user.phone, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION_DAYS,
          }
        );

        user.otp = null;
        await user.save();

        return {
          status: 200,
          type: "Success",
          user: user,
          token: token,
        };
      }
    } catch (err) {
      return {
        status: 500,
        type: "error",
        error: err,
      };
    }
  }
}

async function adminLogin(email, password) {
  if (!email || (email && email.length < 10)) {
    return {
      status: 400,
      type: "error",
      error: "Invalid Email id",
    };
  } else if (!password) {
    return {
      status: 400,
      type: "error",
      error: "Invalid Password",
    };
  } else {
    try {
      const user = await Admin.findOne({ email: email });
      if (!user) {
        return {
          status: 400,
          type: "error",
          error: "Invalid login details.",
        };
      }


      const match = await bcrypt.compare(password, user.password);

      if (match) {
        let token = jwt.sign(
          { id: user.id, phone: user.phone, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION_DAYS,
          }
        );

        // user.otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = "000000";
        await user.save();



        return {
          status: 200,
          type: "Success",
        };
      } else {
        return {
          status: 400,
          type: "success",
          error: "Incorrect Password.",
        };
      }
    } catch (err) {
      return {
        status: 500,
        type: "success",
        error: err,
      };
    }
  }
}

async function sendOTP(phone, role, fcm_token) {
  if (!phone || (phone && phone.length < 10)) {
    return {
      status: 400,
      type: "error",
      error: {
        errors: "Invalid phone number",
      },
    };
  } else {
    try {
      const user = await User.findOne({ phone: phone });
      const otp = Math.floor(100000 + Math.random() * 900000);

      if (!user) {
        const newUser = new User({
          phone: phone,
          role: role,
          fcm_token: fcm_token,
          otp: otp,
        });

        const savedUser = await newUser.save();
        return {
          status: 200,
          type: "Success",
        };
      } else {
        user.otp = otp;
        await user.save();
        return {
          status: 200,
          type: "Success",
        };
      }
    } catch (err) {
      return {
        status: 500,
        type: "error",
        error: err,
      };
    }
  }
}

async function verifyOTP(email, otp) {
  if (!email || (email && email.length < 10)) {
    return {
      status: 400,
      type: "error",
      errors: "Invalid email",
    };
  } else if (!otp || (otp && otp.length < 6)) {
    return {
      status: 400,
      type: "error",
      error: "Invalid OTP",
    };
  } else {
    try {
      const user = await Admin.findOne({ email: email, otp: otp });

      if (!user) {
        return {
          status: 400,
          type: "error",
          error: "Invalid OTP provided",
        };
      } else {
        let token = jwt.sign(
          { id: user.id, phone: user.phone, role: "admin" },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION_DAYS,
          }
        );

        user.otp = null;
        await user.save();

        return {
          status: 200,
          type: "Success",
          user: user,
          token: token,
        };
      }
    } catch (err) {
      return {
        status: 500,
        type: "error",
        error: err,
      };
    }
  }
}

module.exports = { userLogin, sendOTP, adminLogin, verifyOTP };
