import React, {useEffect, useLayoutEffect, useState} from 'react';
import AddAudience from "../components/AddAudience";
import Loader from "../components/Loader";
import {v4 as uuid_v4} from "uuid";
import Header from "../components/Header";
import Message from "../components/Message";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UpdateAudience from "../components/UpdateAudience";


const HomeScreen = ({history}) => {
    const [message, setMessage] = useState('')
    const [audience, setAudience] = useState({})
    const [userCategories, setUserCategories] = useState({})
    const [sharedAudience, setSharedAudience] = useState({})
    const [notApprovedAudience, setNotApprovedAudience] = useState({})
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState('')
    const [audienceId, setAudienceId] = useState('')
    const [show, setShow] = useState(false);
    const [audienceUpdateSelected, setAudienceUpdateSelected] = useState('')
    const [filterdAudience, setFilterAudience] = useState(0)

    useEffect(() => {

        if (localStorage.getItem('userInfo') === null) {
            history.push('/login')
        } else {
            setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
        }

        const api_token = JSON.parse(localStorage.getItem('user_api'))

        async function getAudience() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }

                const {data} = await axios.get(`/api/v1/Audience`, config)
                setAudience(Object.values(data.data))
                setNotApprovedAudience(Object.values(data.audienceNotApproved))
                setSharedAudience(Object.values(data.sharedAudience))

            } catch (error) {
                error.response && setMessage(error.response.data.errors)
            }
        }

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

        getAudience()
        getUserCategories()

    }, [setAudience, setSharedAudience, setUserInfo, setNotApprovedAudience, setLoading])

    useEffect(() => {
        console.log(userCategories)
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


    const deleteHandler = async (id, e) => {
        e.preventDefault()
        const api_token = JSON.parse(localStorage.getItem('user_api'))
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }

            await axios.delete(`/api/v1/Audience/delete/${id}`, config)
            setAudience(audience.filter(item => item.id !== id))
        } catch (error) {
            //  error.response && setMessage(error.response.data.errors)

        }
    }
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true)
        setAudienceId(id)
        setAudienceUpdateSelected(audience.find(el => el.id === id))

    };
    const filterAudience = async (id, e) => {

        const api_token = JSON.parse(localStorage.getItem('user_api'))

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }

            const {data} = await axios.get(`/api/v1/Audience/categoryFilter/${id}`, config)
            setFilterAudience(id)
            setAudience(Object.values(data.data))

        } catch (error) {
            //  error.response && setMessage(error.response.data.errors)

        }

    }

    return (
        <>
            <Header/>

            {loading ? <Loader/> :
                <div className="jumbotron mt-3 jum">

                    <div className="row flex-row-reverse  ">

                        {/*audience form */}
                        <AddAudience apiToken={userInfo.api_token} userCategories={userCategories}/>

                        <div className="col-lg-9">
                            <div id="content-filter" className="form-group text-right">
                                <label htmlFor="content-filter">مخاطبین</label>

                                <select value={filterdAudience} onChange={e => filterAudience(e.target.value, e)}
                                        className="form-control dir-rtl content-category w-50 ml-auto"
                                >
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
                                    audience.map((el) => (
                                        <tr key={uuid_v4()}>
                                            <td className='text-center' key={uuid_v4()} className="text-center">
                                                <button onClick={(e) => handleShow(el.id)} className='btn'><i
                                                    className="far text-white fa-edit mr-3"> </i></button>

                                                <button className='btn btn-outline-danger'
                                                        onClick={(e) => deleteHandler(el.id, e)}><i
                                                    className="fas text-danger fa-trash"> </i></button>
                                            </td>
                                            <td className='text-center'
                                                key={uuid_v4()}>{el.category_audience.category_name}</td>

                                            <td className='text-center' key={uuid_v4()}>{el.phoneNumber}</td>
                                            <td className='text-center' key={uuid_v4()}>{el.email}</td>
                                            <td className='text-center' key={uuid_v4()}>
                                                <div
                                                    className='d-flex flex-nowrap justify-content-end align-items-center'>{el.name}<Image
                                                    className='samll-bg' fluid src={`/uploads/${el.image}`}/></div>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>


                            </table>


                        </div>


                    </div>
                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header closeButton>

                        </Modal.Header>
                        <Modal.Body><UpdateAudience audienceSelected={audienceUpdateSelected}
                                                    apiToken={userInfo.api_token}
                                                    userCategories={userCategories}/></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                لغو
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            }
        </>

    );
};

export default HomeScreen;
