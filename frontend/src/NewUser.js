import { useEffect, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import axios from './api/axios'


const NewUser = ({ user }) => {

    const [fullName, setFullName] = useState('')

    useEffect(() => {
        if(user && user?.fullName !== undefined){
            setFullName(user.fullName)
        }
    }, [user])


    const navigate = useNavigate()

    const handleSaveUser = async (e) => {
        e.preventDefault()

        const data = { fullName }

        try{
            const response = await axios.post('/api/v1/users', JSON.stringify(data))
            setFullName('')
            console.log(response);
            navigate('/')
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className='container'>
            <form>
                <input
                    type='text'
                    placeholder='Name'
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
                />
                <div className='formItem'>
                    <button
                        onClick={handleSaveUser}
                    >Save</button>
                    <Link to={'/'}><button>Cancel</button></Link>

                </div>
            </form>
            
        </div>
    )
}

export default NewUser