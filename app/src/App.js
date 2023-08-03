import { useState } from 'react'
import { Button, Input, Col, Row, message } from 'antd'
import axios from 'axios'
import qs from 'qs'
import './App.css'

let second = 60

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const [phone, setPhone] = useState('')
  // 按钮禁用状态
  const [captchaIsDis, setCaptchaIsDis] = useState(false)
  // 按钮文本
  const [captchaText, setCaptchaText] = useState('获取验证码')
  // 验证码
  const [captcha, setCaptcha] = useState('')

  // 提示函数
  const showTip = (type, content) => {
    messageApi.open({
      type,
      content
    })
  }

  // 改变验证码按钮文本
  const changeCaptchaText = () => {
    const secondCount = setInterval(() => {
      if (second === 0) {
        clearInterval(secondCount)
        second = 60
        setCaptchaIsDis(false)
        setCaptchaText('获取验证码')
      } else {
        setCaptchaIsDis(true)
        setCaptchaText(`${second}秒后可再次发送`)
        second--
      }
    }, 1000)
  }

  // 获取验证码
  const handleGetCaptcha = async () => {
    try {
      const { data: res } = await axios.post('http://127.0.0.1:100/api/get-captcha', qs.stringify({ phone }))
      if (res.status !== 0) {
        return showTip('error', res.message)
      }
      showTip('success', res.message)
      changeCaptchaText()
    } catch (error) {
      console.log(error)
    }
  }

  // 登录
  const handlePhoneLogin = async () => {
    try {
      const { data: res } = await axios.post('http://127.0.0.1:100/api/login-phone', qs.stringify({ phone, captcha }))
      if (res.status !== 0) {
        return showTip('error', res.message)
      }
      showTip('success', res.message)
      localStorage.setItem('token', res.token)
      // todo: 跳转首页
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {contextHolder}
      <div className="App">
        <Row>
          <Col span={3}>
            <Input
              placeholder="请输入手机号"
              value={phone}
              onChange={e => {
                console.log(e.target.value)
                setPhone(e.target.value)
              }}
            />
          </Col>
          <Col span={3}>
            <Button disabled={captchaIsDis} onClick={handleGetCaptcha}>
              {captchaText}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Input placeholder="请输入验证码" value={captcha} onChange={e => setCaptcha(e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Button type="primary" onClick={handlePhoneLogin}>
              登录
            </Button>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default App
