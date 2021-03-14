import React, {useEffect, useState} from 'react';
import {v4 as uuid_v4} from "uuid";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import UpdateAudience from "./UpdateAudience";
import Button from "react-bootstrap/Button";
import ShareAudience from "./ShareAudience";

const AudienceList = ({api_token, userInfo, userCategories , filteredAudience}) => {
    const [loadingAudience, setLoadingAudience] = useState(true)
    const [audience, setAudience] = useState({})
    const [show, setShow] = useState(false);
    const [shareShow, setShareShow] = useState(false);
    const [audienceUpdateSelected, setAudienceUpdateSelected] = useState('')
    const [audienceShareSelected, setAudienceShareSelected] = useState('')
    const [filterAudience, setFilterAudience] = useState('')
    useEffect(() => {

        async function getAudience() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }

                const {data} = await axios.get(`/api/v1/Audience`, config)
                setAudience(Object.values(data.data))
                setLoadingAudience(false)

            } catch (error) {
                console.log(error.response.data.errors)
            }
        }

        getAudience()
    }, [setLoadingAudience,setAudience])


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
    const handleShareClose = () => setShareShow(false);
    const handleShow = (id) => {
        setShow(true)
        setAudienceUpdateSelected(audience.find(el => el.id === id))

    };
    const shareHandleShow = (id) => {
        setShareShow(true)
        setAudienceShareSelected(id)

    };
    useEffect(()=>{
        if(Object.values(filteredAudience).length > 0){
            setAudience(Object.values(filteredAudience))

        }else {
            setAudience(Object.values({}))
        }
    },[filteredAudience,setAudience])
    return (
        <>
            {!loadingAudience &&
            audience.map((el) => (
                    <tr key={uuid_v4()}>
                        <td className='text-center' key={uuid_v4()}>

                            <button onClick={(e) => handleShow(el.id)} className='btn btn-sm'><i
                                className="far text-white fa-edit "> </i></button>

                            <button className='btn btn-sm'
                                    onClick={(e) => deleteHandler(el.id, e)}><i
                                className="fas text-danger fa-trash"> </i></button>

                            <button className='btn btn-sm'
                                    onClick={(e) => shareHandleShow(el.id, e)}><i
                                className="fas fa-share-alt"> </i></button>
                        </td>
                        <td className='text-center'
                            key={uuid_v4()}>{el.category_audience.category_name}</td>

                        <td className='text-center' key={uuid_v4()}>{el.phoneNumber}</td>
                        <td className='text-center' key={uuid_v4()}>{el.email}</td>
                        <td className='text-center' key={uuid_v4()}>
                            <div
                                className='d-flex flex-wrap-reverse justify-content-end align-items-center'>{el.name}<Image
                                className='samll-bg' fluid src={`/uploads/${el.image}`}/></div>
                        </td>
                    </tr>
                ))
            }

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


            <Modal size="lg" show={shareShow} onHide={handleShareClose}>

                <Modal.Body>
                    <ShareAudience apiToken={userInfo.api_token}
                                   AudienceShareSelectedId={audienceShareSelected}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShareClose}>
                        لغو
                    </Button>

                </Modal.Footer>
            </Modal>

        </>
    );
};

export default AudienceList;
