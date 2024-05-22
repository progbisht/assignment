import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "./api/axios"

const Base = ({ eventType }) => {

  const [ users, setUsers ] = useState([])

  useEffect(() => {
    const fetch = async() => {
      try {       
        const response = await axios.get('/api/v1/users/all')
        
        setUsers(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetch()
  }, [])

  return (
    <>
      <div className="container">
        <Link to={`/new`}>
          <button >
              {eventType}
          </button>
        </Link>
      </div>
      <div className='container'>
        <table>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>P5 Balance</td>
                    <td>Reward Balance</td>
                    <td>Login</td>
                </tr>
            </thead>
            {
              users.length > 0 && users.map((user, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index}</td>
                    <td>{user.fullName}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td><Link to={`/${user._id}`}><button>Edit</button></Link></td>
                  </tr>
                </tbody>
              ))
            }
        </table>
      </div>
    </>
  )
}

export default Base