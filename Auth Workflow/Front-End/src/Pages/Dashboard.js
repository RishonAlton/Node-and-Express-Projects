import styled from 'styled-components'
import { useGlobalContext } from '../context'


const Dashboard = () => {

  const { user } = useGlobalContext()
  const { userID, role } = user

  return (
    <>
      <Wrapper className='page'>
        <h2>Hello there, {user.name}!</h2>
        <p>
          Your ID: <span>{userID}</span>
        </p>
        <p>
          Your Role: <span>{role}</span>
        </p>
      </Wrapper>
    </>
  )

}

const Wrapper = styled.div `

  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
    border-radius: var(--border-radius);
    letter-spacing: var(--letter-spacing);
  }

  p:last-child {
    text-transform: capitalize;
  }

`

export default Dashboard
