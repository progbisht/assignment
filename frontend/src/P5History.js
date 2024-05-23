import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from './api/axios'


const P5History = () => {


  const [p5Balance, setp5Balance] = useState(0)
  const [p5History, setp5History] = useState([])

  const { id } = useParams()

  useEffect(()=>{
    const fetch = async () => {
      try {
        const response_bal = await axios.get(`/api/v1/p5/balance/${id}`)
        setp5Balance(100 - response_bal.data.data[0].givenPoints)
        
        const response_hist = await axios.get(`/api/v1/p5/history/${id}`)
        setp5History(response_hist.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetch()
  },[])

  return (
    <div className='container'>
        <Link to={`/${id}/rewards/new`}>
            <button>Create New Reward</button>
        </Link>
        <div className='section'>P5 Balance: {p5Balance}</div>
        <div>
        <table>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Date Time</td>
                    <td>P5 given</td>
                    <td>User Name</td>
                    <td>Delete</td>
                </tr>
            </thead>
            {
              p5History.length > 0 && p5History.map((user, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.givenPoints.createdAt}</td>
                    <td>{user.givenPoints.points}</td>
                    <td>{user.receiverName}</td>
                    <td><Link to={`/${user._id}`}><button>Edit</button></Link></td>
                  </tr>
                </tbody>
              ))
            }
        </table>
      </div>

    </div>
  )
}

export default P5History