import React from 'react'
import { Link } from 'react-router-dom'

const P5History = () => {
  return (
    <div className='container'>
        <Link to={`/:id/rewards/new`}>
            <button>Create New Reward</button>
        </Link>
        <div className='container'>{}</div>
        <div className='container'>
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

    </div>
  )
}

export default P5History