const express = require('express')
// 导入路由对应的函数
const user_handler = require('../router_handler/user')
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { reg_get_captcha_schema, reg_login_phone_schema } = require('../schema/user')

const router = express.Router()

// expressJoi局部中间件用于验证表单数据的格式
router.post('/get-captcha', expressJoi(reg_get_captcha_schema), user_handler.getCaptcha)
router.post('/login-phone', expressJoi(reg_login_phone_schema), user_handler.loginPhone)

module.exports = router
