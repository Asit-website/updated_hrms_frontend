import React, { useState,useEffect } from "react";

import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { useNavigate,useLocation } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

const EditQuotation = () => {
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
       
        <div className="w-full ">
         

          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">

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

                <div className="flex gap-[30px] items-center">
                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">User</p>
                    <input  type="text"  onChange={changeHandler} name="User" value={user?.fullName} disabled  className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>

                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Invoice Number</p>
                    <input type="text" onChange={changeHandler} name="InvoiceNo" value={formdata?.InvoiceNo} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5" />
                  </label>
                </div>

                <div className="flex gap-[30px] items-center">
                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">GST Number</p>
                    <input type="text" onChange={changeHandler} name="GstNo" value={formdata?.GstNo} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>

                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">SAC Code</p>
                    <input type="text" onChange={changeHandler} name="SacCode" value={formdata?.SacCode} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>
                </div>

                <div className="flex gap-[30px] items-center">
                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Placed Supply</p>
                    {/* <input type="text" onChange={changeHandler} name="PlacedSupply" value={formdata.PlacedSupply}  /> */}
                    <select name="PlacedSupply" id="PlacedSupply" onChange={changeHandler} value={formdata?.PlacedSupply} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5">
                        <option>Select Placed</option>
                        <option>Outside India</option>
                    </select>
                  </label>

                  <label  className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Bill To</p>
                    <input type="text" onChange={changeHandler} name="BillTo" value={formdata?.BillTo} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>
                </div>

                <div className="flex gap-[30px] items-center">
                  <label  className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Ship To</p>
                    <input type="text" onChange={changeHandler} name="ShipTo" value={formdata?.ShipTo} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5" />
                  </label>

                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Client Name</p>
                    <input type="text" onChange={changeHandler} name="ClientName" value={formdata?.ClientName} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5" />
                  </label>
                </div>

                <div className="flex gap-[30px] items-center">
                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Address</p>
                    <input type="text" onChange={changeHandler} name="Address" value={formdata?.Address}  className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>

                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Mobile</p>
                    <input type="text" onChange={changeHandler} name="Mobile" value={formdata?.Mobile} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>
                </div>

                <div className="flex gap-[30px] items-center">
                  <labe  className="w-[45%] flex flex-col gap-2"l>
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Email</p>
                    <input type="text" onChange={changeHandler} name="Email" value={formdata?.Email}  className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5" />
                  </labe>

                  <label  className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Item Description</p>
                    <input type="text" onChange={changeHandler} name="ItemDescription" value={formdata?.ItemDescription} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5" />
                  </label>
                </div>

                <div className="flex gap-[30px] items-center">
                  <label  className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Quantity</p>
                    <input type="text" onChange={changeHandler} name="Qty" value={formdata?.Qty} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>

                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Price</p>
                    <input type="text" onChange={changeHandler} name="Price" value={formdata?.Price} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>
                </div>

                <div className="flex gap-[30px] items-center">
                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Amount</p>
                    <input type="text" onChange={changeHandler} name="Amount" value={formdata?.Amount} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>

                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Balance Amount</p>
                    <input type="text" onChange={changeHandler} name="BalanceAmount" value={formdata?.BalanceAmount} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>
                </div>

                <div className="flex gap-[30px] items-center">

                <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Currency</p>
                    <select name="currency" id="currency" value={formdata?.currency} onChange={changeHandler} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5">
                        <option value="">Select Currency</option>
                        <option>INR</option>
                        <option>$</option>
                    </select>
                  </label>

                  
                  <label className="w-[45%] flex flex-col gap-2">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-left mt-2">Note</p>
                    <input type="text" onChange={changeHandler} name="Note" value={formdata?.Note} className="h-[44px] rounded-[3px] border border-[#D0D4DC] bg-white p-2.5"/>
                  </label>

                 

                
                </div>

                <div className="flex w-full justify-start mt-2">
                  <button  type="submit" className="w-[118px] h-[40px] rounded-[10px] bg-[#0B56E4]"><span className="text-[#FFFFFF] text-[16px] font-medium leading-[24px] tracking-[0.005em] text-left">Update</span></button>
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
