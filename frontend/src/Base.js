import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "./api/axios"

const Base = ({ eventType }) => {

  const [ users, setUsers ] = useState([])
  const [ allUsers, setAllUsers ] = useState([])

  useEffect(() => {
    const fetch = async() => {
      try {       
        const response_users = await axios.get('/api/v1/users/all')
        setUsers(response_users.data.data)
        
      } catch (error) {
        console.log(error);
      }
    }

    fetch()
  }, [])

  

  
  const getP5Balance = async (id) => {
    const response_bal = await axios.get(`/api/v1/p5/balance/${id}`)
    
    return (100 - response_bal.data.data[0].givenPoints)

  }
  
  const getRewardBalance = async(id) => {
    const response_bal = await axios.get(`/api/v1/p5/balance/${id}`)
    
    return (response_bal.data.data[0].receivedPoints)
  }


  useEffect(() => {
    users.map((user) => {
      const fetch = async(user) => {
        user.p5Balance = await getP5Balance(user._id)
        user.rewardBalance = await getRewardBalance(user._id)
        
        return user
      }
      
      return fetch(user)
    })

  }, [users])

  useEffect(() => {
    console.log(users);
    setAllUsers(users)
  },[users])
  
  
  
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
              allUsers.length > 0 && allUsers.map((user, index) => (
                <tbody key={user._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.p5Balance}</td>
                    <td>{user.rewardBalance}</td>
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