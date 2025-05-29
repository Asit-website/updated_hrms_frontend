import React,{useRef} from "react";

import "react-calendar/dist/Calendar.css";

import { useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print'
import { useMain } from "../../../hooks/UseMain";



const InvoicePage = () => {
  const { user } = useMain();

  const user1 = JSON.parse(localStorage.getItem("hrms_user"));

  const location = useLocation();
  const invoiceData = location.state;

  const contonentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Order",
    parentContainer: {
      '@media print': {
        display: 'block'
      },
    },
    onAfterPrint: () => alert("success", "item saved")
  })

  return (
    <>
      <div className="employee-dash h-full">
      

        <div className="tm">
         

          <div className="pt-[30px] pr-5 pb-[10px] pl-[20px] relative w-full">
            <div className="w-full flex justify-center">
              <button onClick={generatePdf} className="w-[153px] h-10 rounded-[10px] bg-[#0B56E4]">
                <span className="text-white text-[16px] font-medium leading-6 tracking-[0.005em] text-left">Convert To PDF</span>
              </button>
            </div>

            <div ref={contonentPDF} className="mx-auto my-8 bg-white max-w-[1000px] rounded-[10px] border border-[#E3E3E3] shadow-[0px_4px_12px_0px_#1A1A1A7A] px-5 py-[60px] flex flex-col gap-7">
              {/* first section  */}
              <div className="flex justify-between">
                {/* left side */}
                <div className="flex flex-col max-w-[350px] w-full gap-[50px]">
                  <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1748523395/Kds_logo_1_1_jfhff5.png" className="max-w-[150px]" alt="" />

                  {/* s */}
                  <div className="inLefS">
                    <div className="singLef">
                      <h3>Issue Date :</h3>
                      <p>{new Date(Number(invoiceData?.ts)).toLocaleDateString()}</p>
                    </div>

                    <div className="singLef">
                      <h3>GST NO :</h3>
                      <p>{invoiceData?.GstNo}</p>
                    </div>
                    <div className="singLef">
                      <h3>SAC CODE :</h3>
                      <p>{invoiceData?.SacCode}</p>
                    </div>

                    <div className="singLef">
                      <h3>Place of Supply :</h3>
                      <p>{invoiceData?.PlacedSupply}</p>
                    </div>

                    <div className="singLef">
                      <h3>Currency : USD</h3>
                      <p>Conversion Rate: 80.00</p>
                    </div>
                  </div>

                  {/* t */}
                  <div className="inLefT">
                    <h4>Bill To</h4>
                    <h5>{invoiceData?.BillTo}</h5>

                    <p className="add">{invoiceData?.Address}</p>
                    <p className="num"> {invoiceData?.Mobile}</p>
                    <p className="email">{invoiceData?.Email}</p>
                  </div>
                </div>

                {/* right side */}
                <div className="flex flex-col max-w-[350px] w-full gap-[50px]">
                  <div className="flex flex-col gap-2 relative">
                    <h2 className="text-[#2B2B2B] text-[24px] font-semibold leading-[32px] text-left">Invoice</h2>
                    <p className="biLLnO">Bill No: {invoiceData?.BillTo}</p>
                  </div>

                  {/* s */}
                  <div className="inLefS2">
                    <p className="in2lHead">Kushel Digi Solutions</p>

                    <div className="inlef2Total">
                      <p>
                        205 Pankaj Tower mayur vihar phase 1 New Delhi, New
                        Delhi, DL
                      </p>
                      <p>(07) 110091, IN | 919045301702</p>
                      <p>shubham@kusheldigi.com</p>

                      <p>GSTIN: 07BKlPG8876K1 ZG Website: www.kusheldigi.com</p>

                      <p>Contact Name: shubham Gupta</p>
                    </div>
                  </div>

                  {/* t */}
                  <div className="inLefT">
                    <h4>Ship To</h4>

                    <p className="add">{invoiceData?.ShipTo}</p>
                  </div>
                </div>
              </div>

              {/* second section  */}
              <div className="inSecondSec">
                <div class="relative overflow-x-auto tableWrapping">

                  <div className="rounded-t-[10px] bg-white border border-[#D8D8D8] h-[50px] px-[12px] py-[14px] translate-y-[20px]">
                  
                    <h2 className="text-[16px] font-bold leading-[24px] text-left text-[#2B2B2B]">Payment log</h2>
                  </div>

                  <table class="w-full text-sm text-left tablecont">
                    <thead class=" uppercase ">
                      <tr>
                        <th scope="col" class="px-6 py-3 ">
                          S. No.
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Item Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                          HSN/SAC
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Qty UoM
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Price (₹)
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Amount (₹)
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Amount ($)
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr class="bg-white border-2 border-black  dark:border-gray-700">
                        <td class="px-6 py-4 addingBorder">01</td>
                        <td class="px-6 py-4 addingBorder">
                          {invoiceData?.ItemDescription}
                        </td>
                        <td class="px-6 py-4 addingBorder">{invoiceData?.SacCode}</td>
                        <td class="px-6 py-4 addingBorder">{invoiceData?.Qty}</td>
                        <td class="px-6 py-4 addingBorder" >{invoiceData?.Price}</td>
                        <td class="px-6 py-4 addingBorder">{invoiceData?.Amount}</td>
                        <td class="px-6 py-4 addingBorder">{invoiceData?.Amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* third section  */}
              <div className="inThirdSec">
                {/* left  */}
                <div className="inThirLEFT">
                  <div className="inThrPro">
                    <h3>Bank Name :</h3>
                    <p>Axis Bank Ltd</p>
                  </div>

                  <div className="inThrPro">
                    <h3>Account Number :</h3>
                    <p>918020056731833</p>
                  </div>
                  <div className="inThrPro">
                    <h3>Branch Name :</h3>
                    <p>Mayur Vihar Pahse 1</p>
                  </div>

                  <div className="inThrPro">
                    <h3>IFSC Code :</h3>
                    <p>AXISlNBB296</p>
                  </div>

                  <div className="inThrPro">
                    <h3>SWIFT CODE :</h3>
                    <p>AXISlNBB296</p>
                  </div>
                </div>

                {/* right  */}
                <div className="inThirLEFT">
                  <div className="inThrPro">
                    <h3>Total Taxable Value:</h3>
                    <p>₹40,000.00</p>
                  </div>

                  <div className="inThrPro">
                    <h3>Total Value (INR) :</h3>
                    <p>₹40,000</p>
                  </div>
                  <div className="inThrPro">
                    <h3>Total Value (USD) :</h3>
                    <p>$500.00</p>
                  </div>

                  <div className="inThrPro">
                    <h3>Total Value in words (INR) :</h3>
                    <p>₹ Forty Thousand Only </p>
                  </div>

                  <div className="inThrPro">
                    <h3>Total Value in words (USD) :</h3>
                    <p>$ Five Hundred Only</p>
                  </div>
                </div>
              </div>

              {/* foruthr  */}
              <div className="balanceFowrap">
                <div className="balanceCont">
                  <h2>Balance Amount :</h2>
                  <p className="valueBaln">{invoiceData?.BalanceAmount}</p>
                </div>
              </div>

              {/* fivth  */}
              <div className="inFivSec">
                <p className="ccHEad">Comments</p>
                <p className="comAns">
                  Fees Once Paid will not be Refundable, Nor-Transferable and
                  Nor-Extendable. Outside Shoes Not Allowed. Please do Not Bring
                  any Valuables as the Club will not be responsible for any
                  Loss.
                </p>
              </div>

              {/* sixth */}
              <div className="inSixSec">
                <div className="sixCont">
                  <div className="singLine"></div>
                  <p>Provider Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
