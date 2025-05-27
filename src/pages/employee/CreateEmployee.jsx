
import "react-calendar/dist/Calendar.css";
import { NavLink } from "react-router-dom";
import { useMain } from "../../hooks/UseMain";

const CreateEmployee = () => {
  const { user } = useMain();

  return (
    <>
      <div className="employee-dash h-full">

        <div className="w-full bg-[#f5f5f5]">


          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full
">

            <div className="flex-col">

              {/* first  */}
              <div className="flex flex-col gap-2 w-full mx-auto
">

                <p className="text-[20px] font-normal leading-[24px] tracking-[0em] text-left text-[#060606]
">HRMS</p>

                <div className="flex items-center gap-[10px]">
                  <p className=" text-[16px] font-normal leading-[19px] tracking-[0em] text-left text-[#1567FF]
">HRMS</p>{" "}
                  <span>
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748330260/chevron_right_fnygzr.png" alt="" />
                  </span>{" "}

                  <span className=" text-[16px] font-normal leading-[19px] tracking-[0em] text-left text-[#1567FF]
">Employee Management</span>

                  <span>
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748330260/chevron_right_fnygzr.png" alt="" />
                  </span>{" "}
                  <span className="thml">Create Employee</span>
                </div>

              </div>

              {/* second */}
              <main className="mt-[20px] w-full flex flex-col gap-6 bg-white overflow-x-scroll">

                {/* personal details */}
                <div className="max-w-[1075px] w-full rounded-[5px] flex flex-col gap-5 bg-white px-[40px] py-[20px]">
                  <h2 className="text-base font-normal leading-[19px] tracking-[0em] text-left text-[#060606]">Personal Details</h2>

                  <hr />

                  <div className="flex flex-col gap-[20px]">
                    {/* first row */}
                    <div className="flex flex-wrap gap-4 items-center">
                      <input
                        type="text"
                        placeholder="Employee Name*"
                        className="w-[246px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c]  p-[15px]"

                      />
                      <input
                        type="text"
                        placeholder="Enter Employee Phone*"
                        className="w-[246px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c]  p-[15px]"
                      />
                      <input type="date" placeholder="" className="w-[167px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c]  p-[15px]" />
                      <input
                        type="text"
                        placeholder="Personal Email ID"
                        className="w-[280px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c]  p-[15px]"
                      />
                    </div>

                    {/* second row */}
                    <div className="flex flex-wrap gap-4 items-center">
                      <input
                        type="text"
                        placeholder="Employee Name*"
                        className="w-[320px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c]  ps-[15px]"
                      />
                      <input
                        type="text"
                        placeholder="Enter Employee Phone*"
                        className="w-[320px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c]  ps-[15px]"
                      />

                      <input
                        type="text"
                        placeholder="Personal Email ID"
                        className="w-[320px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c]  ps-[15px]"
                      />
                    </div>

                    <div className="flex items-center gap-[50px]">

                      {/* left side */}
                      <div className="flex items-center gap-[10px]">
                        <select name="" id="" className="w-[90px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px]  text-[12px] font-normal leading-[15px] tracking-[0px] text-left
">
                          <option value="" selected className="pdThOp">
                            Country*
                          </option>
                        </select>
                        <select name="" id="" className="w-[90px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px] text-[12px] font-normal leading-[15px] tracking-[0px] text-left
">
                          <option value="" selected>
                            City*
                          </option>
                        </select>
                        <select name="" id="" className="w-[90px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px]  text-[12px] font-normal leading-[15px] tracking-[0px] text-left
">
                          <option value="" selected>
                            Pincode*
                          </option>
                        </select>
                      </div>

                      {/* right side */}
                      <div className="flex items-center gap-[10px]">

                        <select name="" id="" className="w-[90px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px]  text-[12px] font-normal leading-[15px] tracking-[0px] text-left
">
                          <option value="" selected>
                            Country*
                          </option>
                        </select>
                        <select name="" id="" className="w-[90px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px]  text-[12px] font-normal leading-[15px] tracking-[0px] text-left
">
                          <option value="" selected>
                            Country*
                          </option>
                        </select>
                        <select name="" id="" className="w-[90px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c] p-[10px]  text-[12px] font-normal leading-[15px] tracking-[0px] text-left
">
                          <option value="" selected>
                            Country*
                          </option>
                        </select>

                      </div>

                    </div>

                    <div className="w-[290px] h-[44px] rounded-[5px]  text-[#292a2c] border border-[#9499A0] flex items-center justify-between p-[10px]
">

                      <p className="text-[#2B2B2B] text-[15px] font-medium leading-[16px] text-left
">Gender*</p>

                      <div className="flex items-center gap-[10px]">

                        <label htmlFor="" className="flex items-center gap-[5px]">
                          <input type="radio" />
                          <span className="text-[#101820]">Male</span>
                        </label>

                        <label htmlFor="" className="flex items-center gap-[5px]">
                          <input type="radio" />
                          <span className="text-[#101820]">Female</span>
                        </label>

                      </div>


                    </div>

                  </div>
                </div>

                {/* company details */}
                <div className="max-w-[1075px] w-full rounded-[5px] flex flex-col gap-[20px] bg-white px-[40px] py-[20px]
">

                  <h2 className="text-[16px] font-normal leading-[19px] tracking-[0em] text-left text-[#060606]
">Company Detail</h2>
                  <hr />

                  <div className="flex flex-col gap-[20px]
">

                    {/* first  */}
                    <div className="flex items-center gap-[14px]
">

                      <input type="text" className="w-[246px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px] text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" placeholder="Employee ID*" />
                      <input type="text" className="w-[246px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" placeholder="Date of Joining*" />

                      <input type="text" placeholder="Branch*" className="w-[167px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />

                      <input type="text" placeholder="Department*" className="w-[282px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px] text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />


                    </div>

                    <div className="flex items-center gap-[14px]
">

                      <input type="text" placeholder="Designation*" className="w-[282px] h-[44px] rounded-[5px] border border-[#9499A0] text-[#292a2c] p-[10px] text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />
                      <input type="text" placeholder="Salary*" className="w-[167px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />
                    </div>

                    <div>

                    </div>

                  </div>

                </div>


                {/* docoument details */}
                <div className="max-w-[1075px] w-full rounded-[5px] flex flex-col gap-[20px] bg-white px-[40px] py-[20px]
">
                  <h2 className="text-[16px] font-normal leading-[19px] tracking-[0em] text-left text-[#060606]
">Document Detail</h2>
                  <hr />

                  <div className="flex flex-col gap-[20px]
">

                    {/* first  */}
                    <div className="flex gap-4 items-center
">
                      <input type="text" placeholder="Pan Number" className="w-[322px] h-[44px] rounded-[5px]  text-[#292a2c] border border-[#9499A0] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left

" />
                      <input type="text" placeholder="Aadhaar Number" className="w-[322px] h-[44px] rounded-[5px]  text-[#292a2c] border border-[#9499A0] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left

" />
                      <input type="text" placeholder="Validation Of Pan Number" className="w-[322px] h-[44px] rounded-[5px] text-[#292a2c] border border-[#9499A0] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left

" />
                    </div>

                    {/* secondd */}
                    <div className="flex gap-4 items-center
">

                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="Upload Pan Card" className="border-none outline-none w-fit h-full  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
"/>
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>
                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="10th Certificate" className="border-none outline-none w-fit h-full  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
"/>
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>

                    </div>

                    {/* secondd */}
                    <div className="flex gap-4 items-center
">

                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="Cancel Check Upload" className="border-none outline-none w-fit h-full  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
"/>
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>
                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="12th Certificate" className="border-none outline-none w-fit h-full  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>

                    </div>
                    {/* secondd */}
                    <div className="flex gap-4 items-center
">

                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="Upload Aadhaar Card" className="border-none outline-none w-fit h-full  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>
                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="Graduation Certificate" className="border-none outline-none w-fit h-full  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
"/>
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>

                    </div>

                  </div>

                </div>


                {/* bank account details */}
                <div className="max-w-[1075px] w-full rounded-[5px] flex flex-col gap-[20px] bg-white px-[40px] py-[20px]
">

                  <h2 className="text-[16px] font-normal leading-[19px] tracking-[0em] text-left text-[#060606]
">Bank Account Detail</h2>
                  <hr />

                  <div className="flex flex-col gap-[20px]">

                    {/* first  */}
                    <div className="flex items-center gap-4
">

                      <input type="text" placeholder="Account Holder Name" className="w-[246px] h-[44px] border border-[#9499A0] rounded-[5px]  text-[#292a2c] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />
                      <input type="text" placeholder="Account Number" className="w-[246px] h-[44px] border border-[#9499A0] rounded-[5px]  text-[#292a2c] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />
                      <input type="text" placeholder="Bank Name" className="w-[246px] h-[44px] border border-[#9499A0] rounded-[5px] text-[#292a2c] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />
                      <input type="text" placeholder="IFSC" className="w-[201px] h-[44px] rounded-[5px] border border-[#9499A0]  text-[#292a2c] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />

                    </div>

                    {/* first  */}
                    <div className="flex items-center gap-4
">

                      <input type="text" placeholder="Branch" className="w-[317px] h-[44px] rounded-[5px]  border border-[#9499A0] text-[#292a2c] p-[10px]  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />

                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="Last Organization Docs" className="border-none outline-none w-fit h-full  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>

                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="Experience Letter Of LO" className="border-none outline-none w-fit h-full text-[15px] font-normal leading-[15px] tracking-[0px] text-left
"/>
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>


                    </div>

                    <div className="flex items-center gap-4
">

                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="Relieving Letter of LO" className="border-none outline-none w-fit h-full  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
" />
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>
                      <div className="w-[322px] rounded-[5px] border border-[#9499A0] flex justify-between items-center px-[18px] py-[6px]
">
                        <input type="text" placeholder="Offer Letter Of LO" className="border-none outline-none w-fit h-full  text-[15px] font-normal leading-[15px] tracking-[0px] text-left
"/>
                        <button className="bg-[#008ECC] w-[108px] h-[32px] rounded-[5px]
"><span className="text-[12px] font-normal leading-[15px] tracking-[0px] text-left text-white
">Upload here</span></button>
                      </div>
                    </div>

                  </div>

                </div>

              </main>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
