import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from './api/axios'

const RewardHistory = () => {

  const [rewardBalance, setRewardBalance] = useState(0)
  const [rewardHistory, setRewardHistory] = useState([])

  const { id } = useParams()

  useEffect(()=>{
    const fetch = async () => {
     
      try {
        const response_bal = await axios.get(`/api/v1/reward/balance/${id}`)
        setRewardBalance(response_bal.data.data[0].receivedPoints)
        
        const response_hist = await axios.get(`/api/v1/reward/history/${id}`)
        
        setRewardHistory(response_hist.data.data)
      
      } catch (error) {
        console.log(error)
      }
    }

    fetch()
  },[])

  return (
    <div className='container'>
        
        <div className='section'>Reward Balance: {rewardBalance}</div>
        <div>
        <table>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Date Time</td>
                    <td>Reward Received</td>
                    <td>User Name</td>
                    
                </tr>
            </thead>
            {
              rewardHistory.length > 0 && rewardHistory.map((user, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.receivedPoints.createdAt}</td>
                    <td>{user.receivedPoints.points}</td>
                    <td>{user.senderName}</td>
                  </tr>
                </tbody>
              ))
            }
        </table>
      </div>

    </div>
  )
}

export default RewardHistory