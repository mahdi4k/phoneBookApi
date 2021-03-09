import React, {useEffect, useState} from 'react';
import AddAudience from "../components/AddAudience";
import Loader from "../components/Loader";
import { v4 as uuid_v4 } from "uuid";

const HomeScreen = ({history}) => {
    const [message, setMessage] = useState('')
    const [audience, setAudience] = useState({})
    const [sharedAudience, setSharedAudience] = useState({})
    const [notApprovedAudience, setNotApprovedAudience] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (localStorage.getItem('userInfo') === null) {
            history.push('/login')
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
                setLoading(false)

            } catch (error) {
                error.response && setMessage(error.response.data.errors)
            }
        }

        getAudience()
    }, [setAudience])
    console.log(loading)

    console.log(audience)

    return (
        <div className="jumbotron mt-3 jum">

            <div className="row flex-row-reverse  ">

                <AddAudience/>

                <div className="col-lg-9">
                    <div className="form-group text-right">
                        <label htmlFor="content-filter">مخاطبین</label>
                        <select className="form-control dir-rtl content-category w-50 ml-auto" id="content-filter">

                            <option>همه</option>
                            <option>خانواده</option>
                            <option>دوستان</option>

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

                        {loading ? <Loader/> :
                            audience.map((el) => (
                                <tr>
                                    <td key={uuid_v4()} className="text-center">
                                        <a href=""><i className="far text-white fa-edit mr-3"></i></a>
                                        <a href=""><i className="fas text-danger fa-trash"></i></a>
                                    </td>
                                    <td key={uuid_v4() }>{el.category_audience.category_name}</td>

                                    <td key={uuid_v4()}>{el.phoneNumber}</td>
                                    <td key={uuid_v4()}>{el.email}</td>
                                    <td key={uuid_v4()}>{el.name}</td>
                                </tr>
                            ))}


                        </tbody>


                    </table>


                </div>


            </div>
        </div>
    );
};

export default HomeScreen;
