import React, { useState,useEffect } from "react";

import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
import { useNavigate,useLocation } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

const EditQuotation = ({ setAlert, pop, setPop }) => {
  const { user , updateQuotation } = useMain();

  const user1 = JSON.parse(localStorage.getItem("hrms_user"));

  const location = useLocation();

  const navigate = useNavigate();

  const item = location?.state;

  const [formdata , setFormdata] = useState({
    User: user?._id,
    InvoiceNo:"",
    GstNo:"",
    SacCode:"",
    PlacedSupply:"",
    BillTo:"",
    ShipTo:"",
    ClientName:"",
    Address:"",
    Mobile:"",
    Email:"",
    ItemDescription:"",
    Qty:"",
    Price:"",
    Amount:"",
    BalanceAmount:"",
    Note:"",
    currency:""
  })

  const changeHandler = (e)=>{
    const {name , value} = e.target;

     setFormdata((prev)=>({
      ...prev ,
      [name]:value
     }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const ans = await updateQuotation({...formdata, id: item?._id});
    console.log(ans);
  
    
        toast.success("Successful Updated");
        
    

    
}

useEffect(() => {
  setFormdata({
    User: user?._id,
    InvoiceNo: item?.InvoiceNo,
    GstNo:item?.GstNo,
    SacCode:item?.SacCode,
    PlacedSupply:item?.PlacedSupply,
    BillTo:item?.BillTo,
    ShipTo:item?.ShipTo,
    ClientName:item?.ClientName,
    Address:item?.Address,
    Mobile:item?.Mobile,
    Email:item?.Email,
    ItemDescription:item?.ItemDescription,
    Qty:item?.Qty,
    Price:item?.Price,
    Amount:item?.Amount,
    BalanceAmount:item?.BalanceAmount,
    Note:item?.Note,
    currency:item?.currency
  })
}, [])


  return (
    <>
      <div className="employee-dash h-full">
       
        <div className="tm">
         

          <div className="em">

            <div className="flex justify-between items-center">
              <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px] text-left">Invoice Generate</h2>

              <div className="flex items-center gap-[16px]">
                <button className="w-[86px] h-[40px] rounded-[10px] border border-[#0B56E4] bg-custom-gradient">
                  <span className="text-[#0B56E4] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Cancel</span>
                </button>
              </div>
            </div>

            <div>

              <form onSubmit={submitHandler}  className="invoiceForm">

                <div className="sinelinvoice">
                  <label>
                    <p>User</p>
                    <input type="text"  onChange={changeHandler} name="User" value={user?.fullName} disabled />
                  </label>

                  <label>
                    <p>Invoice Number</p>
                    <input type="text" onChange={changeHandler} name="InvoiceNo" value={formdata?.InvoiceNo}  />
                  </label>
                </div>

                <div className="sinelinvoice">
                  <label>
                    <p>GST Number</p>
                    <input type="text" onChange={changeHandler} name="GstNo" value={formdata?.GstNo} />
                  </label>

                  <label>
                    <p>SAC Code</p>
                    <input type="text" onChange={changeHandler} name="SacCode" value={formdata?.SacCode} />
                  </label>
                </div>

                <div className="sinelinvoice">
                  <label>
                    <p>Placed Supply</p>
                    {/* <input type="text" onChange={changeHandler} name="PlacedSupply" value={formdata.PlacedSupply}  /> */}
                    <select name="PlacedSupply" id="PlacedSupply" onChange={changeHandler} value={formdata?.PlacedSupply}>
                        <option>Select Placed</option>
                        <option>Outside India</option>
                    </select>
                  </label>

                  <label>
                    <p>Bill To</p>
                    <input type="text" onChange={changeHandler} name="BillTo" value={formdata?.BillTo} />
                  </label>
                </div>

                <div className="sinelinvoice">
                  <label>
                    <p>Ship To</p>
                    <input type="text" onChange={changeHandler} name="ShipTo" value={formdata?.ShipTo}  />
                  </label>

                  <label>
                    <p>Client Name</p>
                    <input type="text" onChange={changeHandler} name="ClientName" value={formdata?.ClientName}  />
                  </label>
                </div>

                <div className="sinelinvoice">
                  <label>
                    <p>Address</p>
                    <input type="text" onChange={changeHandler} name="Address" value={formdata?.Address}  />
                  </label>

                  <label>
                    <p>Mobile</p>
                    <input type="text" onChange={changeHandler} name="Mobile" value={formdata?.Mobile} />
                  </label>
                </div>

                <div className="sinelinvoice">
                  <label>
                    <p>Email</p>
                    <input type="text" onChange={changeHandler} name="Email" value={formdata?.Email}   />
                  </label>

                  <label>
                    <p>Item Description</p>
                    <input type="text" onChange={changeHandler} name="ItemDescription" value={formdata?.ItemDescription}  />
                  </label>
                </div>

                <div className="sinelinvoice">
                  <label>
                    <p>Quantity</p>
                    <input type="text" onChange={changeHandler} name="Qty" value={formdata?.Qty}  />
                  </label>

                  <label>
                    <p>Price</p>
                    <input type="text" onChange={changeHandler} name="Price" value={formdata?.Price}  />
                  </label>
                </div>

                <div className="sinelinvoice">
                  <label>
                    <p>Amount</p>
                    <input type="text" onChange={changeHandler} name="Amount" value={formdata?.Amount}  />
                  </label>

                  <label>
                    <p>Balance Amount</p>
                    <input type="text" onChange={changeHandler} name="BalanceAmount" value={formdata?.BalanceAmount}  />
                  </label>
                </div>

                <div className="sinelinvoice">

                <label>
                    <p>Currency</p>
                    <select name="currency" id="currency" value={formdata?.currency} onChange={changeHandler}>
                        <option value="">Select Currency</option>
                        <option>INR</option>
                        <option>$</option>
                    </select>
                  </label>

                  
                  <label>
                    <p>Note</p>
                    <input type="text" onChange={changeHandler} name="Note" value={formdata?.Note} />
                  </label>

                 

                
                </div>

                <div className="quaotitionBtn">
                  <button  type="submit"><span>Update</span></button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuotation;
