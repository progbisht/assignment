import { useEffect, useRef, useState } from 'react'
import axios from './api/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'


const NewReward = () => {

    const currRef = useRef()

    const[ users, setUsers ] = useState([])
    const[fullName, setFullName] = useState('');

    const[points, setPoints] = useState(0)
    const[pointsFocus, setPointsFocus] = useState(false)
    
    const[p5Balance, setp5Balance] = useState(100)


    const [errMsg, setErrMsg] = useState('');

    

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetch = async() => {
            try {
                const response_users = await axios.get('/api/v1/users/all')
                setUsers(response_users.data.data.filter(user => user._id !== id))

                const response_balance = await axios.get(`/api/v1/p5/balance/${id}`)
                setp5Balance(100 - response_balance.data.data[0].givenPoints)

            } catch (error) {
                console.log(error);
            }
        }

        fetch()

    }, [])



    const handleSelectChange = (e) => {
        const selectedOption = e.target.value;
        setFullName(selectedOption);
    };    

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!fullName || !points){
            setErrMsg("Name and points are required")
            return
        }

        const data = {
            fullName,
            points
        }

        try{
            const response = await axios.post(`/api/v1/p5/create/${id}`, JSON.stringify(data))

            if(response.status === 201){
                navigate('/')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <div className='container'>
        <select className='dropdown' value={fullName} onChange={handleSelectChange}>
            <option value="">Select an option</option>
            {
                users.length > 0 && users.map( (user, index) => (
                    <option key={index} value={user.fullName}>{user.fullName}</option>
                ))
            }
            
        </select>

        </div>
        <div className='container'>
            {errMsg}
        <form>
                <input
                    ref={currRef}
                    type='number'
                    id='points'
                    placeholder='Points'
                    value={points}
                    onChange={(e)=>setPoints(e.target.value)}
                    
                    aria-invalid={((points > p5Balance) || (points > 100)) ? "true" : "false"}
                    aria-describedby='uidnote'
                    onFocus={()=>setPointsFocus(true)}
                    onBlur={()=>setPointsFocus(false)}
                />
                <p id='uidnote' className={ (pointsFocus && (points > 100)) ? "instructions" : "offscreen"}>
                    Max Limit is set to 100
                </p>

               <div className='section'>P5 Balance:{p5Balance}</div>
                
                
                <div className='formItem'>
                    <button
                        onClick={handleSubmit}
                        disabled={( (points > p5Balance) || (points > 100) ) ? true : false}
                    >Submit</button>
                    <Link to={'/'}><button>Cancel</button></Link>

                </div>
            </form>
        </div>
        </>
    )
}

export default NewReward