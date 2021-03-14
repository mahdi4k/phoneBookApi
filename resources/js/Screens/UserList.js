import React, {useEffect, useState} from 'react';
import Loader from "../components/Loader";
 import Table from "react-bootstrap/Table";
import {v4 as uuid_v4} from "uuid";

const UserList = () => {
    const [loading, setLoading] = useState(true)
    const [allUser, setAllUser] = useState({})
    const [checked, setChecked] = useState(false)

    const handleChange = (e) => {
        e.target.setAttribute('checked','true')
    }
    useEffect(() => {

        const getAllUser = async () => {
            const api_token = JSON.parse(localStorage.getItem('user_api'))

            try {
                const {data} = await axios.get('/api/v1/users', {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    },
                })
                setAllUser(Object.values(data.allUser))
                setLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }
        getAllUser()
    }, [setAllUser, setLoading])


    return (
        <>
            {loading ? <Loader/> :
                <div className='col-md-4 text-dark p-4 mt-4 bg-white adminUserList mx-auto'>
                    <h2 className='text-right'>لیست کاربران</h2>
                    <Table className='col-7 ml-auto mt-5' borderless  >
                        <thead>
                        <tr>
                            <th> وضعیت</th>
                            <th>نام</th>

                        </tr>
                        </thead>
                        <tbody>
                        {allUser.map(user => (

                                <tr key={uuid_v4()}>

                                    <td key={uuid_v4()}>
                                        <label className="switch" htmlFor={user.id}>

                                            <input onChange={handleChange} checked={user.active === 1} type="checkbox" id={user.id}/>
                                            <div className="slider round"></div>
                                        </label>
                                    </td>

                                    <td key={uuid_v4()}><p  className='mb-0'>{user.name}</p></td>

                                </tr>

                        ))}
                        </tbody>
                    </Table>
                </div>
            }

        </>
    );
};

export default UserList;
