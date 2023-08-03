// 导入定义验证规则的包
const Joi = require('joi')

// 定义 phone，captcha 的验证规则
const phone = Joi.string().min(11).max(11).required()
const captcha = Joi.string().min(6).max(6).required()

exports.reg_get_captcha_schema = {
  body: {
    phone
  }
}

exports.reg_login_phone_schema = {
  body: {
    phone,
    captcha
  }
}
