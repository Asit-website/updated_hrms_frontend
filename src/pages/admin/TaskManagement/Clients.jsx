import { useEffect, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useMain } from "../../../hooks/UseMain";
import { useOutsideClick } from "../../../hooks/UseOutsideClick";
import InitialsAvatar from "../../../components/InitialAvatar";

const TaskClients = () => {
  const {createClientapi, getClientapi, editTaskapi, disableClientapi } =
    useMain();
  const navigate = useNavigate();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user")) || '';

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    Name: "",
    Email: "",
    Password: "",
    City: "",
    State: "",
    ZipCode: "",
    PhoneNumber: "",
    Country: "",
    Address: "",
  });

  const [showIndex, setShowIndex] = useState(null);

  const [addClientPop, setAddClientPop] = useState(false);

  const [showImport, setShowImport] = useState(false);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;

    let newErrors = { ...errors };

    if (name === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|yahoo\.com)$/;
      if (!emailRegex.test(value)) {
        newErrors.Email = "Invalid email format.";
      } else {
        delete newErrors.Email;
      }
    }

    if (name === "PhoneNumber") {
      if (!/^\d*$/.test(value)) return;

      if (value.length > 10) return;

      if (value.length === 10) {
        delete newErrors.PhoneNumber;
      } else {
        newErrors.PhoneNumber = "Phone number must be exactly 10 digits.";
      }
    }

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors(newErrors);
  };


  const [allClient, setAllClient] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const getAllClient = async () => {
    try {
      const ans = await getClientapi();
      console.log("ans", ans);
      if (ans?.status) {
        setAllClient(ans?.data.reverse());
        console.log(allClient)
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const ans = await createClientapi({ ...formdata });
      if (ans?.status) {
        toast.success("Successfuly created");
        getAllClient();
        setFormdata({
          Name: "",
          Email: "",
          Password: "",
          City: "",
          State: "",
          ZipCode: "",
          PhoneNumber: "",
          Country: "",
          Address: "",
        });
        setAddClientPop(false);
      }
      else {
        toast.error(ans?.message);

      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const ans = await editTaskapi({ ...formdata, clientId: isEdit });
      if (ans?.status) {
        toast.success("Successfuly updated");
        getAllClient();
        setFormdata({
          Name: "",
          Email: "",
          City: "",
          State: "",
          ZipCode: "",
          PhoneNumber: "",
          Country: "",
          Address: "",
          Password: "",
        });
        setAddClientPop(false);
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const disableHandler = async (id) => {
    const toastId = toast.loading("Loading...");
    try {
      const ans = await disableClientapi(id);
      if (ans?.status) {
        toast.success("Successfuly done");
        getAllClient();
        setShowIndex(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const projectsPerPage = 8;
  const filteredProjects = allClient?.filter((client) => {
    const searchWords = searchInput.toLowerCase().trim().split(/\s+/);
    const name = client.Name.toLowerCase();
    return searchWords.every((word) => name.includes(word));
  });

  const totalPages = Math.ceil(filteredProjects?.length / projectsPerPage);
  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);


  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

  // for the import excel sheet
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile = (e) => {

    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
        console.log("slect file", selectedFile);
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
        console.log("data ", data);
        const {
          Name, Email, City, State, ZipCode, PhoneNumber, Country, Address
        } = data[i];

        const ans = await createClientapi({
          Name, Email, City, State, ZipCode, PhoneNumber, Country, Address
        });
      }
      setShowImport(false);
      getAllClient();
      toast.success("Successfuly uploaded");

      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    getAllClient();

  }, []);

  const popWrapper = useRef();
  const popupwrapper = useRef();

  useOutsideClick(popWrapper, () => {
    setShowIndex(null);
  });

  useOutsideClick(popupwrapper, () => {
    setAddClientPop(null);
  });

  return (
    <>
      <div className="flex relative bg-[#f5f5f5] h-full">


        <div className="w-full bg-[#f5f5f5] ">

          <div className="pt-8 pr-5 pb-8 pl-[20px] relative w-full">
            <div className="relative flex flex-col gap-[20px]">
              <nav className="flex items-center justify-between">
                <h2 className="text-[24px] font-semibold text-[#111827] leading-6">Clients</h2>

                <div className="clibtns">
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                    }}
                    className="flex items-center gap-1 text-[16px] font-medium px-4 py-[6px] border border-[#2563eb] text-[#2563eb] rounded-md bg-[#2563eb] text-white"
                  >
                    <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201651/pluss_wqvd9q.png" alt="" /> <span>New Client</span>
                  </button>

                </div>
              </nav>

              <div className="flex flex-col">

                <input type="text" placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput} className="border border-[#D0D4DC] w-[200px] px-2.5 h-[38px] rounded-[10px]" />

                <p className="py-[24px] pt-0 pb-8 text-[#1B2533] text-[12px] font-medium leading-[16px] tracking-[0.004em] text-left mt-4">Total Records: {allClient?.length || 0}</p>
              </div>


              <div className="grid gap-[15px] grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
                {paginatedProjects?.map((client, index) => (
                  <div key={index} className="flex flex-col gap-[12px] items-center p-[12px] bg-white border border-[#E8E9EB] rounded-[12px] relative">
                    <div
                      onClick={() => {
                        if (showIndex === index) {
                          setShowIndex(null);
                        } else {
                          setShowIndex(index);
                        }
                      }}
                      className="flex justify-end w-full cursor-pointer"
                    >
                      {" "}
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201690/thredonts_snuk81.png" alt="" />
                    </div>

                    <InitialsAvatar name={client?.Name} size={60} />

                    <h3 className="text-[18px] font-semibold leading-[32px] text-[#1B2533]">{client?.Name}</h3>
                    <p className="text-[14px] font-normal leading-[24px] tracking-[0.0015em] text-[#666D76]">
                      Created At : {new Intl.DateTimeFormat("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(client?.createdAt))}
                    </p>

                    {showIndex === index && (
                      <div ref={popWrapper} className="z-[1000] flex flex-col gap-[13px] right-[48px] top-[20px] w-[161px] h-[148px] p-[8px] rounded-[8px] bg-white border border-[#E3E3E3] shadow-[0px_4px_12px_0px_#1A1A1A33] absolute">
                        <div className="flex items-center gap-[10px] cursor-pointer">
                          <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201027/bx-happy-heart-eyes_i8b4bn.png" alt="" />
                          <span onClick={() =>

                            navigate(role === "EMPLOYEE" ? "/employeeDash/HRM/clientsProject" : "/adminDash/HRM/clientsProject", {
                              state: client,
                            })
                          } className="text-[#2B2B2B] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">View</span>
                        </div>

                        <hr />

                        <div
                          onClick={() => {
                            setIsEdit(client?._id);
                            setFormdata(client);
                            setAddClientPop(true);
                            setShowIndex(null);
                          }}
                          className="flex items-center gap-[10px] cursor-pointer"
                        >
                          <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201584/edit_edmvcr.png" alt="" />
                          <span className="text-[#2B2B2B] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Edit</span>
                        </div>

                        <hr />

                        <div
                          onClick={() => {
                            disableHandler(client?._id);
                          }}
                          className="flex items-center gap-[10px] cursor-pointer"
                        >
                          <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201122/bx-hide_zibzhs.png" alt="" />
                          <span className="text-[#2B2B2B] text-[14px] font-normal leading-[20px] tracking-[0.0025em] text-[#DD3409]">
                            {client?.isDisable ? "UnDisable" : "Disable"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="gap-[5px] w-full flex justify-center items-center mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                >
                  Prev
                </button>
                <span className="px-4 w-[40px] h-[40px] text-center rounded-[10px] bg-white border border-[#D8D8D8] text-[#666D76] flex items-center justify-center font-inter text-[12px] font-medium"> {currentPage}</span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {addClientPop && (
        <div className="bg-[#40404066] fixed left-0 right-0 bottom-0 top-0 z-[3000] w-full h-full py-[20px] flex items-center justify-center backdrop-blur-[1px]">
          <div ref={popupwrapper} className="w-[599px] p-[24px] h-fit flex flex-col gap-[16px] rounded-[18px] bg-white">
            <nav>
              <p>{isEdit ? "Edit Client" : 'Add Client'}</p>

            </nav>

            <hr />

            <form className="flex flex-col gap-[20px] pr-[10px] pl-0 py-0" onSubmit={isEdit ? editHandler : submitHandler}>

              <div className="flex flex-col gap-[20px] overflow-y-scroll max-h-[400px] px-[10px] pt-0 pb-0">


                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Name <span className="text-red-500">*</span></p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    type="text"
                    name="Name"
                    value={formdata.Name}
                    onChange={changeHandler}
                    placeholder="Name"
                    required
                  />
                </label>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Email <span className="text-red-500">*</span></p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    type="email"
                    name="Email"
                    value={formdata.Email}
                    autoComplete="new-password"
                    onChange={changeHandler}
                    placeholder="Enter your email"
                    disabled={isEdit}
                    required
                  />
                </label>

                {errors.Email && <span className="text-[12px] text-red-500 -mt-5">{errors.Email}</span>}
                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Password <span className="text-red-500">*</span></p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    type="password"
                    name="Password"
                    value={formdata.Password}
                    onChange={changeHandler}
                    placeholder="Password"
                    required
                  />
                </label>

                <div className="flex items-center gap-[16px] w-full">
                  <label className="block text-md font-normal mb-1">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">City <span className="text-red-500">*</span></p>
                    <input
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      type="text"
                      name="City"
                      value={formdata.City}
                      onChange={changeHandler}
                      placeholder="City"
                      required
                    />
                  </label>

                  <label className="block text-md font-normal mb-1">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">State <span className="text-red-500">*</span></p>
                    <input
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      type="text"
                      name="State"
                      value={formdata.State}
                      onChange={changeHandler}
                      placeholder="State"
                      rel=""
                    />
                  </label>
                </div>

                <div className="flex items-center gap-[16px] w-full">
                  <label className="block text-md font-normal mb-1">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Zip/Post Code <span className="text-red-500">*</span></p>
                    <input
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      type="text"
                      name="ZipCode"
                      value={formdata.ZipCode}
                      onChange={changeHandler}
                      placeholder="Zip/Post Code"
                      required
                    />
                  </label>

                  <label className="block text-md font-normal mb-1">
                    <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Country <span className="text-red-500">*</span></p>
                    <input
                      className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                      type="text"
                      name="Country"
                      value={formdata.Country}
                      onChange={changeHandler}
                      placeholder="Country"
                      required
                    />
                  </label>
                </div>

                <label className="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Phone Number <span className="text-red-500">*</span></p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    type="number"
                    name="PhoneNumber"
                    value={formdata.PhoneNumber}
                    onChange={changeHandler}
                    placeholder="Phone Number"
                    maxLength="10"

                    required
                  />
                </label>


                {errors.PhoneNumber && <span className="text-[12px] text-red-500 -mt-5 font-semibold">{errors.PhoneNumber}</span>}

                <label clasName="block text-md font-normal mb-1">
                  <p className="text-[#1B2533] text-[14px] font-normal leading-[20px] tracking-[0.0025em]">Address</p>
                  <input
                    className="w-full border rounded p-2 text-sm font-normal text-gray-500"
                    type="text"
                    name="Address"
                    value={formdata.Address}
                    onChange={changeHandler}
                    placeholder="Address"
                  />
                </label>

              </div>

              <div className="flex gap-3">
                <button type="submit" className="saveclient">
                  <span className="px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">{isEdit ? 'Update' : 'Save Client'}</span>
                </button>
                <button
                  onClick={() => {
                    setAddClientPop(false);
                    setFormdata({
                      Name: "",
                      Email: "",
                      Password: "",
                      City: "",
                      State: "",
                      ZipCode: "",
                      PhoneNumber: "",
                      Country: "",
                      Address: "",
                    })
                  }}
                  className="cancel"
                >
                  <span className="px-4 py-1.5 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Cancel</span>
                </button>
              </div>

            </form>


          </div>
        </div>
      )}

      {showImport && (
        <div className="fixed inset-0 z-[3000] w-full h-full bg-[#40404066] py-[20px] flex items-center justify-center backdrop-blur-[1px]">
          <div className="w-[599px] h-[464px] p-[24px] flex flex-col gap-[16px] rounded-[18px] bg-white">
            <nav className="flex items-center justify-between">
              <p className="text-[#1B2533] text-[16px] font-semibold leading-[24px] tracking-[0.0015em] text-left">Upload Client</p>
              <img
                onClick={() => {
                  setShowImport(false);
                }}
                src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201525/cutt_u1ph2c.png"
                alt=""
              />
            </nav>

            <hr />

            <div className="w-full flex flex-col items-center gap-[16px]">
              <div className="flex items-center gap-[10px]">
                <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747201340/bx-file_jnijor.svg" alt="" />
                <span className="text-[24px] font-medium leading-[32px] text-[#2B2B2B]">Upload Clients</span>
              </div>

              <div className="w-full h-[184px] py-[40px] rounded-[12px] bg-[#F8F9FB] border border-[#8FB1F3] flex flex-col items-center justify-center gap-[10px]">
                <p className="text-[16px] font-normal leading-[24px] tracking-[0.005em] text-center text-[#666D76]">Select CSV File</p>
                <button className="w-[164px] h-[40px] rounded-[10px] bg-[#0B56E4]" onClick={handleButtonClick}>
                  {" "}
                  <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em]"
                  >Choose File Here</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFile}
                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              </div>
            </div>

            <div className="flex items-center gap-[16px] mt-[32px]">
              <button onClick={() => handleFileSubmit()} className="w-[87px] h-[40px] rounded-[10px] bg-[#0B56E4]">
                <span className="text-white text-[16px] font-medium leading-[24px] tracking-[0.005em]">Upload</span>
              </button>
              <button onClick={() => {
                setShowImport(false);
              }} className="w-[76px] h-[40px] rounded-[10px] border border-[#B8BBC0]">
                <span className="text-[#666D76] text-[16px] font-medium leading-[24px] tracking-[0.005em]">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};
export default TaskClients;