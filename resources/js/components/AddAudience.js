import React from 'react';

const AddAudience = () => {
    const addContact = ()=>{
        console.log('clicked')
    }
    return (
        <>
            <div className="col-lg-3 inp">

                <h5 className="mt-2 text-right">افزودن مخاطب</h5>

                <div className="form-group text-right mt-5">
                    <label htmlFor="Content-name">نام مخاطب</label>
                    <input type="email" className="form-control" id="Content-name" />
                </div>

                <div className="form-group text-right mt-3">
                    <label htmlFor="Content-phone">شماره تلفن</label>
                    <input type="email" className="form-control" id="Content-phone" />
                </div>
                <div className="form-group text-right">
                    <label htmlFor="exampleFormControlSelect1">گروه مخاطب</label>
                    <select className="form-control dir-rtl content-category" id="exampleFormControlSelect1">

                        <option>خانواده</option>
                        <option>دوستان</option>

                    </select>
                </div>
                <button onClick={addContact} className="btn btn-info w-100 btn1">افزودن</button>
            </div>
        </>
    );
};

export default AddAudience;
