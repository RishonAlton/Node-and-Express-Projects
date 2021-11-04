import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import logo from '../Images/Logo.svg'
import { useGlobalContext } from '../context'


const Navbar = () => {

  const { user, logoutUser } = useGlobalContext()

  return (
    <Wrapper>
      <div className='nav-center'>
        <Link to='/' className='home-link'>
          <img src={logo} alt='Auth Workflow' className='logo' />
        </Link>
        {user && (
          <div className='nav-links'>
            <p>{user.name}</p>
            <button
              className='button button-small'
              onClick={() => {
                logoutUser()
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  )

}


const Wrapper = styled.nav `

  background: var(--white);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
  }

  .nav-links p {
    margin: 0;
    text-transform: capitalize;
    margin-bottom: 0.25rem;
  }

  .home-link {
    display: flex;
    align-items: flex-end;
  }

  @media (min-width: 776px) {
    .nav-links {
      flex-direction: row;
      align-items: center;
    }
    .nav-links p {
      margin: 0;
      margin-right: 1.5rem;
    }
  } 
  
`

export default Navbar
