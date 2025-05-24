import "react-calendar/dist/Calendar.css";

// import "react-profile-avatar/dist/index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../../hooks/UseMain";

const MyProjects = ({ setAlert, pop, setPop }) => {
  const { user, getAllProjectUserApi, allEmployee } = useMain();
 const [allProjects, setAllProject] = useState([]);

 const navigate = useNavigate();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;



  const fetchuserapi = async (id) => {
    const ans = await getAllProjectUserApi(id);
    console.log("alluser", ans?.projects);
    setAllProject(ans?.projects);
  }


  // const [showIndex, setShowIndex] = useState(null);
  // const [proUser, setProUser] = useState([]);
  const [ setAllEmp] = useState([]);

  const fetchemp = async () => {
    const ans = await allEmployee();
    setAllEmp(ans?.emp);
  };

  useEffect(() => {
    fetchuserapi(hrms_user._id);

  }, [])


  return (
    <>
      <div className="employee-dash h-full">
       

        <div className="w-full bg-[#f5f5f5]">
         
          <div className="pt-[30px] pr-[20px] pb-[10px] pl-[20px] relative w-full">
            <div className="relative flex flex-col gap-5">

              <nav className="flex items-center justify-between">
                <h2 className="text-[24px] font-semibold leading-[32px] text-left"> { "My Projects"} </h2>

              </nav>

              
              <div className="relative w-full bg-white overflow-x-scroll md:overflow-visible">
                <table className="w-full text-sm text-gray-700">
                  <thead className="bg-white font-semibold">
                    <tr>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">#</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Project Name</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Start Date</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Deadline</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Members</th>
                      <th className="text-left font-bold text-gray-900 py-3 px-4 border-b border-gray-200 whitespace-nowrap">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allProjects?.length > 0 ? (
                      allProjects.map((client, index) => (
                        <tr key={index} 
                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                        >
                          <td className="px-3 py-3">{index + 1}</td>
                          <td className="px-3 py-3">
                            <span>{client.projectName}</span>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "2px",
                                fontSize: "0.875rem",
                                color: "#2563eb",
                              }}
                            >
                              <p
                                onClick={() =>
                                  navigate("/employeeDash/HRM/projectDetails", {
                                    state: client,
                                  })
                                }
                                style={{ margin: 0, cursor: "pointer" }}
                                className="underline text-blue-600"
                              >
                                View
                              </p>
                             
                            </div>
                          </td>
                          <td>
                            {
                              new Date(client?.createdAt)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td className="px-3 py-3">{client?.deadline}</td>

                          <td style={{ display: "flex", gap: "-2px" }} className="borderNone px-3 py-3">
                            {client?.Members?.map((member) => (
                              <img
                                src={`${member?.profileImage
                                    ? member?.profileImage
                                    : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                  }`}
                                className="w-20 h-20"
                                alt="Member Avatar "
                                key={member._id}
                                  style={{
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                  transition:
                                    "color 0.3s ease, text-decoration 0.3s ease",
                                  height: "40px",
                                  width: "40px",
                                }}
                              />
                            ))}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              style={{
                                color: "#2563eb",
                                border: "1px solid #a8c1f7",
                                background: "#f6f9fe",
                                alignItems: "center",
                                borderRadius: ".375rem",
                                display: "inline-flex",
                                fontSize: ".75rem",
                                fontWeight: 500,
                                lineHeight: "1rem",
                                padding: ".25rem .5rem",
                              }}
                            >
                              {client.Status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                        <td colSpan="6" className="px-3 py-3">No Projects Found</td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};
export default MyProjects;
