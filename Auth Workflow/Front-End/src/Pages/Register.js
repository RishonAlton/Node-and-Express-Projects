import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

import FormRow from '../Components/FormRow'
import useLocalState from '../Utils/localState'


const Register = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    hideAlert()
    setLoading(true)
    const { name, email, password } = values
    const registerNewUser = { name, email, password }
    try {
      const { data } = await axios.post(
        `/api/auth/register`,
        registerNewUser
      )
      setSuccess(true)
      setValues({ name: '', email: '', password: '' })
      showAlert({ text: data.message, type: 'success' })
    } catch (error) {
      const { message } = error.response.data
      showAlert({ text: message || 'There was an Error' })
    }
    setLoading(false)
  }

  return (
    <>
      <Wrapper className='page'>
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        {!success && (
          <form
            className={loading ? 'form form-loading' : 'form'}
            onSubmit={handleSubmit}
          >
            <FormRow
              type='name'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />
            <FormRow
              type='email'
              name='email'
              value={values.email}
              handleChange={handleChange}
            />
            <FormRow
              type='password'
              name='password'
              value={values.password}
              handleChange={handleChange}
            />
            <button type='submit' className='button button-block' disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </button>
            <p>
              Already have an account?
              <Link to='/login' className='login-link'>
                Log In
              </Link>
            </p>
          </form>
        )}
      </Wrapper>
    </>
  )

}


const Wrapper = styled.section `

  .alert {
    margin-top: 3rem;
    margin-bottom: -1.5rem;
  }

  h4 {
    text-align: center;
  }

  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }

  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }

  .button:disabled {
    cursor: not-allowed;
  }

`


export default Register
