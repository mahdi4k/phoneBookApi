import React, {useEffect, useState} from 'react';
import Message from "../components/Message";
import Loader from "./Loader";
import Alert from "react-bootstrap/Alert";

const ShareAudience = ({apiToken, AudienceShareSelectedId}) => {
    const [userID, setUserID] = useState('')
    const [allUser, setAllUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [message,setMessage] = useState('')
    useEffect(() => {
        const getAllUser = async () => {
            try {
                const {data} = await axios.get('/api/v1/users', {
                    headers: {
                        Authorization: `Bearer ${apiToken}`
                    },
                })
                setAllUser(Object.values(data.allUser))
                setLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }
        getAllUser()
    }, [setAllUser])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            await axios.post(`/api/v1/Audience/share/${userID}/${AudienceShareSelectedId}`, {
                    user_id: userID,
                    audience_id: AudienceShareSelectedId,

                }, {
                    headers: {
                        Authorization: `Bearer ${apiToken}`
                    },

                }
            )
            setMessage('مخاطب با موفقیت به اشتراک گذاشته شد')
            //window.location.reload()
        } catch (error) {
            console.log(error.response)

        }

    }

    return (
        <>

            {loading ? <Loader/> :
                <div className="col  inp">
                    {message && <Alert variant='success'>{message}</Alert>}
                    <h5 className="mt-2 text-right">اشتراک گذاری مخاطب</h5>

                    <form onSubmit={submitHandler}>
                        <div className="form-group mt-3 text-right">
                            <label htmlFor="exampleFormControlSelect1">گروه مخاطب</label>
                            <select value={userID || ''}
                                    onChange={(e) => setUserID(e.target.value)}
                                    className="form-control dir-rtl content-category" id="exampleFormControlSelect1">
                                <option>انتخاب کاربر</option>
                                {allUser.map(el => (
                                    <option value={el.id} key={el.id}>{el.name}</option>
                                ))}

                            </select>
                        </div>


                        <button type='submit'
                                className="btn btn-info w-100 btn1">ارسال
                        </button>
                    </form>
                </div>
            }
        </>
    );
};

export default ShareAudience;
