import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import main from '../Images/Main Image.svg'
import { useGlobalContext } from '../context'


const Home = () => {

  const { user } = useGlobalContext()

  return (
    <>
      {user && <Redirect to='/dashboard' />}
      <Wrapper className='page'>
        <div className='info'>
          <h2>
            <span>Auth</span>
            Workflow
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, quos ad. Aliquid numquam sed quod accusamus, placeat necessitatibus vitae eum blanditiis dolorem laboriosam nobis est reiciendis exercitationem! Cumque, expedita neque?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat eaque blanditiis id asperiores, pariatur, voluptatibus iure, accusantium culpa rerum in commodi velit autem harum minus deleniti nulla! Quidem, tempora optio.
          </p>
          <Link to='/login' className='button'>
            Login
          </Link>
          <Link to='/register' className='button'>
            Register
          </Link>
        </div>
        <img src={main} alt='' className='image main-image' />
      </Wrapper>
    </>
  )
}


const Wrapper = styled.div `

  display: grid;
  align-items: center;

  h2 {
    font-weight: 700;
  }

  h2 span {
    color: var(--primary-500);
  }

  .main-image {
    display: none;
  }

  .button {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 6rem;
    .main-image {
      display: block;
    }
  }

`

export default Home
