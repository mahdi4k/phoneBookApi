import React, {useEffect, useState} from 'react';
 import Message from "../components/Message";

const UpdateAudience = ({userCategories, apiToken,audienceSelected}) => {
    const [name, setName] = useState(audienceSelected.name)
    const [email, setEmail] = useState(audienceSelected.email)
    const [phoneNumber, setPhoneNumber] = useState(audienceSelected.phoneNumber)
    const [status, setStatus] = useState(1)
    const [image, setImage] = useState(audienceSelected.image)
    const [category_id, setCategory_id] = useState(audienceSelected.category_id)
    const [formMessage, setFormMessage] = useState('')


    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', image);


        try {
            await axios.put(`/api/v1/Audience/update/${audienceSelected.id}`, {
                    name,
                    email,
                    phoneNumber,
                    status,
                    image,
                    category_id
                }, {
                    headers: {
                        Authorization: `Bearer ${apiToken}`
                    },

                }
            )
            window.location.reload()
        } catch (error) {
            error.response && setFormMessage(error.response.data.errors)

        }

    }
    const onChangeUploadImage = (e) => {
        const targetFile = e.target.files[0]
        setImage(targetFile);
        const reader = new FileReader();
        reader.readAsDataURL(targetFile);
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }

    return (
        <>
            <div className="col  inp">

                <h5 className="mt-2 text-right">ویرایش مخاطب</h5>
                {formMessage && <Message variant='danger' ErrorsMessage={formMessage}/>}
                <form onSubmit={submitHandler}>
                    <div className="form-group text-right mt-5">
                        <label htmlFor="Content-name">نام مخاطب</label>
                        <input value={name || ''}
                               onChange={(e) => setName(e.target.value)}
                               type="text" className="form-control"
                               id="Content-name"/>
                    </div>
                    <div className="form-group text-right mt-5">
                        <label htmlFor="Content-name">ایمیل</label>
                        <input value={email || ''}
                               onChange={(e) => setEmail(e.target.value)}
                               type="email" className="form-control"
                               id="Content-name"/>
                    </div>

                    <div className="form-group text-right mt-3">
                        <label htmlFor="Content-phone">شماره تلفن</label>
                        <input value={phoneNumber || ''}
                               onChange={(e) => setPhoneNumber(e.target.value)}
                               type="text"
                               className="form-control"
                               id="Content-phone"/>
                    </div>
                    <div className="custom-file">
                        <input onChange={onChangeUploadImage}
                               type="file" className="custom-file-input"
                               id="customFile"/>
                        <label className="custom-file-label" htmlFor="customFile">عکس پروفایل</label>
                    </div>
                    <div className="form-group mt-3 text-right">
                        <label htmlFor="exampleFormControlSelect1">گروه مخاطب</label>
                        <select value={category_id || ''}
                                onChange={(e) => setCategory_id(e.target.value)}
                                className="form-control dir-rtl content-category" id="exampleFormControlSelect1">
                            <option>انتخاب دسته بندی</option>
                            {userCategories.map(el => (
                                <option value={el.id} key={el.id}>{el.category_name}</option>
                            ))}


                        </select>
                    </div>
                    <button  type='submit'
                             className="btn btn-info w-100 btn1">ویرایش
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateAudience;
