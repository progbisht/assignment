import { useState, useEffect } from 'react'
import axios from './api/axios'
import NewUser from './NewUser'
import { Link, useParams } from 'react-router-dom'

const Users = () => {

  const [user, setUser] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetch = async() => {
      try {       
        const response = await axios.get(`/api/v1/users/${id}`)
        console.log(response.data);
        setUser(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetch()
  }, [])

  return (
    <div className='container'>
        <NewUser
          user={user}
        />
        <div className='formItem'>
          <Link to={`/${id}/p5`}>
            <button>P5 balance</button>
          </Link>
          <Link to={`/${id}/rewards`}> 
            <button>Reward balance</button>
          </Link>
        </div>
    </div>
  )
}

export default Users