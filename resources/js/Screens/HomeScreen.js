import React, {useEffect, useState} from 'react';
import AddAudience from "../components/AddAudience";
import Loader from "../components/Loader";
import {v4 as uuid_v4} from "uuid";
import Header from "../components/Header";
import Message from "../components/Message";
import AudienceList from "../components/AudienceList";
import Alert from "react-bootstrap/Alert";


const HomeScreen = ({history}) => {
    const [message, setMessage] = useState('')
    const [filteredAudience, setFilteredAudience] = useState({})
    const [userCategories, setUserCategories] = useState({})
    const [sharedAudience, setSharedAudience] = useState({})
    const [notApprovedAudience, setNotApprovedAudience] = useState({})
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState('')
    const [filterdAudienceID, setFilterAudienceID] = useState(0)
    const [userSelected, setUserSelected] = useState('')
    const [api_token, setApiToken] = useState('')

    useEffect(() => {
        if (localStorage.getItem('userInfo') === null) {
            history.push('/login')
        } else {
            setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
        }

        const api_token = JSON.parse(localStorage.getItem('user_api'))
        setApiToken(api_token)

        async function getUserCategories() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }

                const {data} = await axios.get(`/api/v1/Audience/category/all`, config)
                setUserCategories(Object.values(data.data))
                setLoading(false)

            } catch (error) {
                error.response && setMessage(error.response.data.errors)
            }
        }

        getUserCategories()

    }, [setSharedAudience, setUserInfo, setNotApprovedAudience, setLoading])

    useEffect(() => {

        const api_token = JSON.parse(localStorage.getItem('user_api'))
        if (userCategories.length === 0) {
            async function CreateDefaultCategory() {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${api_token}`
                        }
                    }

                    await axios.post(`/api/v1/Audience/category`, {
                        category_name: 'بدون دسته بندی'
                    }, config)
                    window.location.reload()
                } catch (error) {
                    console.log(error)
                }

            }

            CreateDefaultCategory()
        }


    }, [userCategories])



    const filterAudience = async (id, e) => {

        const api_token = JSON.parse(localStorage.getItem('user_api'))

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }

            const {data} = await axios.get(`/api/v1/Audience/categoryFilter/${id}`, config)
            setFilterAudienceID(id)
            setFilteredAudience(Object.values(data.data))

        } catch (error) {
            //  error.response && setMessage(error.response.data.errors)

        }

    }
    const shareHandler = async (id) => {
        const api_token = JSON.parse(localStorage.getItem('user_api'))

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }

            await axios.get(`/api/v1/Audience/share/${userSelected}/${id}`, config)


        } catch (error) {
            //  error.response && setMessage(error.response.data.errors)

        }
    }
    return (
        <>
            <Header/>
            {message && <Message variant='danger' ErrorsMessage={message}/>}
            {loading ? <Loader/> : userInfo.active === 1 ?
                <div className="jumbotron mt-3 jum">

                    <div className="row flex-row-reverse  ">

                        {/*audience form */}
                        <AddAudience apiToken={userInfo.api_token} userCategories={userCategories}/>

                        <div className="col-lg-9">
                            <div id="content-filter" className="form-group text-right">
                                <label htmlFor="content-filter">مخاطبین</label>

                                <select value={filterdAudienceID} onChange={e => filterAudience(e.target.value, e)}
                                        className="form-control dir-rtl content-category w-50 ml-auto">

                                    <option key={uuid_v4()} value={0}>همه گروه ها</option>
                                    {userCategories.map(el => (
                                        <option value={el.id} key={uuid_v4()}>{el.category_name}</option>
                                    ))}

                                </select>
                            </div>
                            <table id="myTable" className="table text-justify">

                                <thead className="tableh1">
                                <tr>
                                    <th className="text-center font-weight-bold"> تنظیمات</th>
                                    <th className="text-center font-weight-bold">دسته بندی</th>
                                    <th className="text-center font-weight-bold">شماره تلفن</th>
                                    <th className="text-center font-weight-bold">ایمیل</th>
                                    <th className="text-center font-weight-bold">نام</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    <AudienceList filteredAudience={filteredAudience} userCategories={userCategories}
                                                  api_token={api_token} userInfo={userInfo}/>
                                }


                                </tbody>


                            </table>


                        </div>


                    </div>


                </div>
                :
               <div className='col-6 mt-4 mx-auto'>
                   <Alert variant='danger' >کاربری شما غیر فعال شده است</Alert>
               </div>
            }
        </>

    );
};

export default HomeScreen;
