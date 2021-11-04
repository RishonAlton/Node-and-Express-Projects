import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import FormRow from '../Components/FormRow'
import useLocalState from '../Utils/localState'


const useQuery = () => new URLSearchParams(useLocation().search)


const ResetPasswordForm = () => {

  const history = useHistory()
  const query = useQuery()

  const { alert, showAlert, loading, setLoading, success, setSuccess } = useLocalState()

  const [password, setPassword] = useState('')

  const handleChange = async (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!password) {
      showAlert({ text: 'Please enter your Password' })
      setLoading(false)
      return
    }
    try {
      await axios.post('/api/auth/reset-password', {
        password,
        token: query.get('token'),
        email: query.get('email'),
      })
      setLoading(false)
      setSuccess(true)
      showAlert({
        text: `Success, redirecting to login page shortly`,
        type: 'success',
      })
      setTimeout(() => {
        history.push('/login')
      }, 3000)
    } catch (error) {
      showAlert({ text: error.response.data.message })
      setLoading(false)
    }
  }

  return (
    <Wrapper className='page'>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {!success && (
        <form
          className={loading ? 'form form-loading' : 'form'}
          onSubmit={handleSubmit}
        >
          <h4>Reset Password</h4>
          <FormRow
            type='password'
            name='password'
            value={password}
            handleChange={handleChange}
          />
          <button type='submit' className='button button-block' disabled={loading}>
            {loading ? 'Please Wait...' : 'New Password'}
          </button>
        </form>
      )}
    </Wrapper>
  )
}


const Wrapper = styled.section `

  h4,
  p {
    text-align: center;
  }

  p {
    margin: 0;
    margin-top: 1rem;
  }

`


export default ResetPasswordForm
