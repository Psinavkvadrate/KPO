import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api'
import { setUser } from '../utils/auth'
import { Input, Button, Form, Typography, Card, message } from 'antd'
import { motion } from 'framer-motion'
import { LockOutlined, UserOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons'
import './Auth.scss'

const { Title, Text } = Typography

export default function Register() {
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function handleSubmit(values: any) {
    setLoading(true)
    try {
      const res = await register(values.username, values.password, values.email, values.fullName)
      if (res.error) {
        message.error(res.error)
      } else {
        setUser(res.data.user)
        message.success('Регистрация успешна!')
        nav('/')
      }
    } catch (err: any) {
      message.error(err.response?.data?.error ?? err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-bg strict">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-brand">ЖСПД</div>
        <Card className="auth-card strict">
          <Title level={3} className="auth-title strict">
            Регистрация
          </Title>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="username"
              label={<span className="auth-label">Логин</span>}
              rules={[{ required: true, message: 'Введите логин' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Введите логин" className="auth-input strict" />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="auth-label">Email</span>}
              rules={[
                { required: true, message: 'Введите email' },
                { type: 'email', message: 'Некорректный email' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Введите email" className="auth-input strict" />
            </Form.Item>

            <Form.Item
              name="fullName"
              label={<span className="auth-label">Полное имя</span>}
            >
              <Input prefix={<IdcardOutlined />} placeholder="Иван Иванов" className="auth-input strict" />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="auth-label">Пароль</span>}
              rules={[{ required: true, message: 'Введите пароль' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Введите пароль" className="auth-input strict" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="auth-button strict"
            >
              Зарегистрироваться
            </Button>
          </Form>

          <div className="auth-footer">
            <Text className="auth-text">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="auth-link strict">
                Войти
              </Link>
            </Text>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
