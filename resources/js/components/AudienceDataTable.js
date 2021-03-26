import React, {useEffect, useState} from 'react';
import DataTable, {createTheme} from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import {Button, Modal} from "react-bootstrap";
import UpdateAudience from "./UpdateAudience";
import ShareAudience from "./ShareAudience";


const AudienceDataTable = ({api_token, userInfo, userCategories, filteredAudience, userAddedAudience}) => {
    const [loadingAudience, setLoadingAudience] = useState(true)
    const [audience, setAudience] = useState({})
    const [show, setShow] = useState(false);
    const [shareShow, setShareShow] = useState(false);
    const [audienceUpdateSelected, setAudienceUpdateSelected] = useState('')
    const [audienceShareSelected, setAudienceShareSelected] = useState('')

    useEffect(() => {
        async function getAudience() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }

                const {data} = await axios.get(`/api/v1/Audience`, config)
                setAudience(data.data.map(el => {
                    return {
                        id: el.id,
                        name: el.name,
                        email: el.email,
                        phoneNumber: el.phoneNumber,
                        category: el.category_audience.category_name,
                        setting: el.id
                    }

                }));
                setLoadingAudience(false)
            } catch (error) {
                console.log(error.response.data.errors)
            }
        }

        getAudience()

        console.log(userAddedAudience)

    }, [setLoadingAudience, setAudience, userAddedAudience])


    useEffect(() => {
        if (Object.values(filteredAudience).length > 0) {
            setAudience(Object.values(filteredAudience))

        } else {
            setAudience(Object.values({}))
        }
    }, [filteredAudience, setAudience])

    useEffect(() => {
        if (!setLoadingAudience) {
            setAudience(prevState => [...prevState, userAddedAudience])
        }
    }, [audience, setAudience, userAddedAudience]);
    createTheme('solarized', {
        text: {
            primary: '#FFFFFF',
            secondary: '#FFFFFF',
        },
        background: {
            default: '#343A40',
        },
        context: {
            background: '#cb4b16',
            text: '#d7d7d7',
        },
        divider: {
            default: '#454d55',
        },
        action: {
            button: '#d7d7d7',
            hover: '#d7d7d7',
        },
        sortFocus: {
            default: '#ffd7d7'
        },
        button: {
            default: '#ffffff',
            disabled: '#b4b4b4',
        }

    });


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

    const columns = [

        {
            name: 'نام',
            selector: 'name',
            sortable: true,
            center: true
        },
        {
            name: 'ایمیل',
            selector: 'email',
            sortable: true,
            center: true
        },
        {
            name: 'شماره تلفن',
            selector: 'phoneNumber',
            sortable: true,
            center: true
        },
        {
            name: 'دسته بندی',
            selector: 'category',
            sortable: true,
            center: true
        },
        {
            name: 'تنظیمات',
            selector: 'setting',
            sortable: true,
            center: true,
            cell: row => <>
                <button onClick={(e) => handleShow(row.setting)} className='btn btn-sm'><i
                    className="far text-white fa-edit "> </i></button>

                <button className='btn btn-sm'
                        onClick={(e) => deleteHandler(row.setting, e)}><i
                    className="fas text-danger fa-trash"> </i></button>

                <button className='btn btn-sm'
                        onClick={(e) => shareHandleShow(row.setting, e)}><i
                    className="fas fa-share-alt"> </i></button>
            </>
        },

    ];
    let tableData
    if (loadingAudience === false){
          tableData = {
             columns,
             data : audience
        };

    }


    return (
        <>
            {!loadingAudience &&

           <>
               <DataTableExtensions filterPlaceholder={'جست و جو'} export={false} print={false} {...tableData}>

                   <DataTable
                       pagination={true}
                       noHeader={true}
                       columns={columns}
                       data={audience}
                       theme="solarized"
                   />
               </DataTableExtensions>

           </>

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

export default AudienceDataTable;
