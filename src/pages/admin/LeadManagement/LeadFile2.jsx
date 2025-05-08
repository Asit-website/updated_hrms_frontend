import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

const LeadFile2 = () => {
  const navigate = useNavigate();
    const { user, allEmployee, createExcelLead } = useMain();

    const [selectedFiles , setSelectedFiles] = useState("");


    const [users, setUsers] = useState([]);
  
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

    // Excel sheet
    const [excelFile, setExcelFile] = useState(null);
  
    const [typeError, setTypeError] = useState(null);
  
    // submit state
    const [excelData, setExcelData] = useState(null);
  
    const getData = async () => {
      const ans1 = await allEmployee();
      setUsers(ans1?.emp);
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    // onchange event
    const handleFile = (e) => {
      let fileTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
  
      let selectedFile = e.target.files[0];
  
      if (selectedFile) {
        setSelectedFiles(selectedFile);

        if (selectedFile && fileTypes.includes(selectedFile.type)) {
          setTypeError(null);
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = (e) => {
            setExcelFile(e.target.result);
          };
          toast.success("Successfuly Browse..");
        } else {
          setTypeError("please seelect only file type");
          setExcelFile(null);
        }
      } else {
        console.log("please select the file");
      }
    };
  
    // onsubmit event
    const handleFileSubmit = async (e) => {
      e.preventDefault();
  
      if (excelFile !== null) {
        const workbook = XLSX.read(excelFile, { type: "buffer" });
  
        const worksheetName = workbook.SheetNames[0];
  
        const worksheet = workbook.Sheets[worksheetName];
  
        const data = XLSX.utils.sheet_to_json(worksheet);
    
        let toastId;
  
        if (data?.length > 0) {
          toastId = toast.loading("Loading....");
        }
  
        setExcelData(data?.slice(0, 10));
  
        for (let i = 0; i < data?.length; i++) {

          const {
            CompanyName,
            Email,
            LeadStatus , 
            FirstName,
            LastName ,
            Website
          } = data[i];
  
      
        const ans = await createExcelLead({
          LeadOwner: hrms_user?._id,
          CompanyName,
          Email,
          Website , 
          LeadStatus , 
          FirstName,
          LastName ,
            });
  
          }
        
  
        toast.success("Successfuly uploaded");
        navigate("/adminDash/myLead");
  
        toast.dismiss(toastId);
      }
    };

    return (
        <>
            <div className="employee-dash h-full">
             

                <div className="w-full bg-[#f5f5f5]">
                    

                    <div className="pt-8 pr-5 pb-8 pl-[54px] relative w-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[#101820] text-2xl font-semibold">Import Leads</h2>
                           <NavLink to="/adminDash/myLead"><button className="bg-[#2563eb] text-white text-[16px] font-medium px-4 py-[6px] rounded-md hover:bg-blue-700">
                                <span className="text-white font-medium text-base">Cancel</span>
                            </button></NavLink>
                        </div>
                        <div className="bg-white mt-[30px] rounded-[10px] py-[40px]">
                            <div className="flex items-center justify-center">
                                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1746621216/bxs_fdlr66.svg" alt="bxs" />
                                <h3 className="text-[#2B2B2B] font-medium text-[24px] ml-[10px]">From File</h3>
                            </div>

                            <div className="max-w-[478px] w-full h-[296px] border border-dashed border-[#8FB1F3] mx-auto mt-[15px] rounded-[10px] flex flex-col items-center justify-center bg-[#F8F9FB]">
                                <h3 className="text-[#666D76] text-[16px] font-normal text-center">Drag and drop your file here. <br />
                                    -  or  -</h3>
                                <div className="selis_inp">
                                    <div className="flex items-center justify-center flex-col relative mt-4">
                                        <div className="w-[175px] h-[40px] rounded-[8px] flex items-center justify-center">
                                            <h3 className="text-[16px] text-black underline font-medium cursor-pointer">Browse Local Files</h3>
                                        </div>
                                        <input className="absolute opacity-0 cursor-pointer" type="file"  onChange={handleFile} required />
                                    </div>
                                    {selectedFiles && <p className="text-center">{selectedFiles.name}</p>} 

                                </div>
                                <div className="mt-[25px]">
                                    <h2 className="text-[16px] font-medium text-[#49515C] tracking-[1px]">Download sample file
                                        <span className="text-[16px] font-medium text-[#0B56E4]"> CSV </span>
                                           or
                                        <span className="text-[16px] font-medium text-[#0B56E4]"> XLSX </span>
                                    </h2>
                                </div>

                                <button onClick={handleFileSubmit} className="bg-[#2563eb] text-white text-[16px] font-medium px-4 py-[6px] rounded-md hover:bg-blue-700">
                  <span className="text-white font-medium text-base">Upload</span>
                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeadFile2;
