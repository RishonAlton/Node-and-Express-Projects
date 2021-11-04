import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

import { useGlobalContext } from '../context'


const useQuery = () => new URLSearchParams(useLocation().search)


const VerifyPage = () => {

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { isLoading } = useGlobalContext()
  const query = useQuery()

  const verifyToken = async () => {
    setLoading(true)
    try {
      await axios.post('/api/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      })
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!isLoading) {
      verifyToken()
    }
    //eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <section className='page'>
        <h2>Loading...</h2>
      </section>
    )
  }

  if (error) {
    return (
      <section className='page'>
        <h4>There was an error, please double check your verification link</h4>
      </section>
    )
  }

  return (
    <section className='page'>
      <h2>Account Confirmed</h2>
      <Link to='/login' className='button'>
        Please login
      </Link>
    </section>
  )
}


export default VerifyPage
