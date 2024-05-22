import React from 'react'

const RewardHistory = () => {
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
                    <td>Reward Received</td>
                    <td>User Name</td>
                    
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

export default RewardHistory