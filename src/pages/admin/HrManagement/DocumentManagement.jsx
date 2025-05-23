import "../../../components/Document/REgisterPageBreak";
import React, { useEffect, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMain } from "../../../hooks/UseMain";

const item = [
  {
    title: "Full-time Employee",
  },
  {
    title: "Intern Employee",
  },
  {
    title: "Freelancer Employee",
  },
  {
    title: "Part-time Employee",
  },
];

const item2 = [
  {
    title: "Offer Letter",
  },
  {
    title: "Relieving Letter",
  },
  {
    title: "Experience Letter",
  },
  {
    title: "LOR Letter",
  },
  {
    title: "Complition Letter",
  },
];

export const data = `<p classNamme="MsoNormal" align="left" style="text-indent: -1px; color: black; margin: 0in 0in 0in 1px; text-align: left; line-height: 107%; font-size: 16px;"><strong style="font-family: Inter, sans-serif;"><span style="line-height: 107%;">Private
        &amp; Confidential </span></strong></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; background: yellow; font-family: Inter, sans-serif;"> [SENDINGDATE] </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Dear <span style="background: yellow;">[DEAR]</span>,</span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; color: windowtext; font-family: Inter, sans-serif;">I
        am pleased to extend this offer letter for the position of <strong><span style="background: yellow;"> [POST] on a [EMPLOYEETYPE] basis </span></strong><span style="background: yellow;"></span> <span style="background: yellow;"> at <strong>KUSHEL DIGI
            SOLUTIONS</strong>. We are excited about the prospect of you joining our team and
        contributing your expertise to our organization.</span></p>

<p><br></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext;"><strong>Position</strong></span><strong><span style="color: windowtext;"><span style="background: yellow;">:</span></span></strong><span style="color: windowtext; background: yellow;"> [POST] </span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; background: yellow; font-family: Inter, sans-serif;"><br></span></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Joining
            Date:<span>&nbsp; </span></span></strong><span style="color: windowtext; background: yellow;"> [JOININGDATE] </span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; background: yellow; font-family: Inter, sans-serif;"><br></span></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Location:
        </span></strong><span style="color: windowtext;">Sector- 63, Noida</span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;"><br></span></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Working Hours<span style="background: yellow;">:</span></span></strong><span style="color: windowtext; background: yellow;"> <span>&nbsp;</span> [WORKHOUR] Hours</span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; background: yellow; font-family: Inter, sans-serif;"><br></span></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Working Days</span></strong><span style="color: windowtext;">: [WORKINGDAYS] </span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;"><br></span></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext; font-family: Inter, sans-serif;">Responsibilities:</span></strong></p>

<ol start="1" type="1" style="margin-bottom: 0in;">
    <li className="MsoNormal" style="margin: 0in 0in 0px 0.5in; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: orange; font-family: Inter, sans-serif;">Identify
            and pursue new business opportunities to generate leads and increase  
            revenue.</span></li>
    <li className="MsoNormal" style="margin: 0in 0in 0px 0.5in; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background:orange; font-family: Inter, sans-serif;">Develop
            and maintain relationships with clients and key stakeholders.</span></li>
    <li className="MsoNormal" style="margin: 0in 0in 0px 0.5in; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: orange; font-family: Inter, sans-serif;">Collaborate
            with the sales and marketing teams to develop strategies for business
            growth.</span></li>
    <li className="MsoNormal" style="margin: 0in 0in 0px 0.5in; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: orange; font-family: Inter, sans-serif;">Analyze
            market trends and competitor activities to identify potential areas for
            expansion.</span></li>
    <li className="MsoNormal" style="margin: 0in 0in 0px 0.5in; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: orange; font-family: Inter, sans-serif;">Prepare
            and deliver presentations to prospective clients.</span></li>
    <li className="MsoNormal" style="margin: 0in 0in 0px 0.5in; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: orange; font-family: Inter, sans-serif;">Negotiate
            contracts and agreements with clients.</span></li>
</ol>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Compensation</span></strong><span style="color: windowtext;">: Your compensation for this
        position will be <strong><span style="background: yellow;"> [COMPENSATION] </span></strong><span style="background: yellow;">/- PM</span> + incentives based on the target's
        achievements policies.</span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;"><br></span></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Benefits</span></strong><span style="color: windowtext;">: As a [EMPLOYEETYPE] ,
        you will be eligible for the following benefits:</span></p>

<ol start="1" type="1" style="margin-bottom: 0in;">
    <li className="MsoNormal" style="margin: 0in 0in 0px 0.5in; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="font-family: Inter, sans-serif;">Flexible work schedule.</span></li>
    <li className="MsoNormal" style="margin: 0in 0in 0px 0.5in; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="font-family: Inter, sans-serif;">Opportunities for professional
            development and growth.</span></li>
</ol>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">&nbsp;</span></strong><br></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext; font-family: Inter, sans-serif; font-size: 19px;">Terms of Employment:</span></strong></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext; font-family: Inter, sans-serif; font-size: 19px;"><br></span></strong></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;">This offer of employment is
        contingent upon your acceptance of the terms outlined in this letter and the
        successful completion of any background checks or screenings required by <strong>KUSHEL DIGI SOLUTIONS</strong>.</span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;"><br></span></p>
    <p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p>    <p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p class="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p class="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p class="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p class="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p class="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p>
    <p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p><p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;">Please indicate your
        acceptance of this offer by signing and returning a copy of this letter by  <strong><span style="background: yellow;">[RETURNINGDATE] </span></strong></span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext;"><strong><span style="background: yellow; font-family: Inter, sans-serif;">  </span></strong></span></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="font-family: Inter, sans-serif;">The above mentioned
        offer shall be valid if you join us on or before <strong><span style="background: yellow;"> [VALIDJOIN] </span></strong></span></p>

<p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><br></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;">&nbsp;Your annual gross emoluments will be Rs. [COMPENSATION]/- (Thousand only) includes Basic, HRA, Conveyance Allowances, Medical , Communication and Personal Allowances .The detail soft he salary are in the attached Salary breakup Annexure-A.</span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;"><br></span></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;">We are excited about the
        opportunity to work with you and believe that your skills and experience will make
        a significant contribution to our team. If you have any questions or require
        further clarification, please do not hesitate to contact me.</span></p><p className="MsoNormal" align="left" style="margin: 0in 0in 0px; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Inter, sans-serif;"><br></span></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">To confirm your acceptance to this
        agreement, please initial all the pages and put your signature on the
        declaration at the page of this agreement and return to us the duplicate copy
        of the entire agreement duly initialed and signed. We look forward to a long
        and mutually beneficial relationship. </span></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px -31px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="margin: 0in 0in 0px -31px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext;"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Yours faithfully, </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" align="left" style="text-indent: -1px; color: black; margin: 0in 0in 0in 1px; text-align: left; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; background: yellow; font-family: Inter, sans-serif;"> [SENDERNAME] </span></strong></p>

<p className="MsoNormal" align="left" style="text-indent: -1px; color: black; margin: 0in 0in 0in 1px; text-align: left; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; background: yellow; font-family: Inter, sans-serif;">HR
            Manager</span></strong></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<h1 align="left" style="text-indent: -1px; line-height: 107%; break-after: avoid; color: black; margin: 0in 0in 0.15in 1px; text-align: left; font-size: 24px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 16px;">For and behalf of </span></h1>

<p className="MsoNormal" align="left" style="text-indent: -1px; color: black; margin: 0in 0in 11px 1px; text-align: left; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-family: Inter, sans-serif;">Kushel Digi Solutions.</span></strong></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;">
    <v:shapetype id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f" style="font-family: Inter, sans-serif;">
        <v:stroke joinstyle="miter">
        <v:formulas>
            <v:f eqn="if lineDrawn pixelLineWidth 0">
            <v:f eqn="sum @0 1 0">
            <v:f eqn="sum 0 0 @1">
            <v:f eqn="prod @2 1 2">
            <v:f eqn="prod @3 21600 pixelWidth">
            <v:f eqn="prod @3 21600 pixelHeight">
            <v:f eqn="sum @0 0 1">
            <v:f eqn="prod @6 1 2">
            <v:f eqn="prod @7 21600 pixelWidth">
            <v:f eqn="sum @8 21600 0">
            <v:f eqn="prod @7 21600 pixelHeight">
            <v:f eqn="sum @10 21600 0">
        </v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:formulas>
        <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect">
        <o:lock v:ext="edit" aspectratio="t">
    </o:lock></v:path></v:stroke></v:shapetype>
    <v:shape id="Picture_x0020_201" o:spid="_x0000_s1027" type="#_x0000_t75" style="position:absolute;left:0;text-align:left;margin-left:4pt;margin-top:.15pt;
 width:136pt;height:67.5pt;z-index:251662336;visibility:visible;
 mso-wrap-style:square;mso-wrap-distance-left:9pt;mso-wrap-distance-top:0;
 mso-wrap-distance-right:9pt;mso-wrap-distance-bottom:0;
 mso-position-horizontal:absolute;mso-position-horizontal-relative:text;
 mso-position-vertical:absolute;mso-position-vertical-relative:text">
        <v:imagedata src="file:///C:/Users/91741/AppData/Local/Packages/oice_16_974fa576_32c1d314_30c6/AC/Temp/msohtmlclip1/01/clip_image001.png" o:title="" style="font-family: Inter, sans-serif;">
        <w:wrap type="square">
    </w:wrap></v:imagedata></v:shape>
    <!--[endif]----><img width="182" height="90" src="file:///C:/Users/91741/AppData/Local/Packages/oice_16_974fa576_32c1d314_30c6/AC/Temp/msohtmlclip1/01/clip_image002.gif" align="left" hspace="12" v:shapes="Picture_x0020_201"><strong><span><span>&nbsp;</span></span></strong></p>

     
<div className="break"></div>
<p className="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" style="margin: 0in 0in 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p><h1 style="text-align: center; line-height: 107%; break-after: avoid; color: black; margin: 0in 10px 0px 0in; text-indent: 0in; font-size: 24px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 19px;">Appendix A</span></h1>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 628px 7px 0in; text-align: left; text-indent: 0in; line-height: 98%; font-size: 16px;"><strong><span style="line-height: 98%;"><span>&nbsp;
</span></span></strong><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;">Name:
</span></strong><span style="line-height: 107%; background: yellow;">[DEAR]</span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;">Designation:
</span></strong><span style="line-height: 107%; color: windowtext; background: yellow;">[POST]</span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;">Location:
</span></strong><span style="line-height: 107%;">Sector 63, Noida</span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 628px 7px 0in; text-align: left; text-indent: 0in; line-height: 100%; font-size: 16px;"><span>&nbsp;</span><br></p>

<p className="MsoNormal" align="center" style="color: black; margin: 0in 0in 0in 1px; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 19px;">Compensation
Details</span></strong></p>

<p className="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 0in; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 19px;">&nbsp;</span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px; text-indent: 0in; font-size: 16px;"><span style="font-family: Inter, sans-serif;">All
the above amounts are based on a full year of service. The amount payable to
you will be determined on pro-rata based on the number of days that you serve
with the Company during the applicable financial year. The annual payable to
you shall be liable to tax deduction at source as per the applicable law for
the time being in force.</span></p>

<table className="MsoNormalTable" border="1" cellspacing="0" cellpadding="0" align="left" width="701" style="margin-left: 9px; margin-right: 9px;">
 <tbody><tr style="height: 22px;">
  <td width="701" colspan="2" valign="top" style="width: 7.3in; padding: 0in; height: 22px;">
  <p className="TableParagraph" align="center" style="font-family: Inter, sans-serif; margin: 3px 335px 0px 0in; text-align: center; line-height: 87%; font-size: 15px;"><strong><span style="line-height: 87%; font-size: 13px;"><span></span>Annexure–A</strong>.</p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; font-size: 13px;">Per Month Fixed</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;"> [COMPENSATION].00 </span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">Salary Break-up Components</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">Monthly
  (INR)</span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Basic+DA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><br></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">HRA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">000.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Conveyance Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">000.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Medical
  Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Education Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 20px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 20px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">LTA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 20px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 2px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Communication</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 2px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">PersonalAllowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Bonus</span></p> 
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">Net Take Home(Per Month)</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; background: yellow; font-size: 13px;"> [COMPENSATION] </span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">TOTAL COST TO THE COMPANY (Per Annum)</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; background: yellow; font-size: 13px;">[ANNUALCOMPENSATION]</span></strong></p>
  </td>
 </tr>
</tbody></table>



<p className="MsoBodyText" style="margin: 0px 70px 0px 0in; line-height: 103%; font-size: 16px;"><span style="font-family: Inter, sans-serif;">Please note that irrespective of whether you join<strong> KUSHEL
DIGI SOLUTIONS</strong> or not,you need to keep all the details contained in this letter confidential.</span></p>

<p className="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>


<p className="MsoBodyText" style="margin: 0in; font-size: 16px;"><span style="font-family: Inter, sans-serif;">We look forward to your joining and along as sociation.</span></p>

<p className="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br><!-- pagebreak --></p>
<div className="break"></div>
<p className="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<h1 style="text-align: center; line-height: 107%; break-after: avoid; color: black; margin: 0in 0in 8px; text-indent: 0in; font-size: 24px;"><span style="font-family: Inter, sans-serif;">Appendix B</span></h1>

<p className="MsoNormal" align="center" style="color: black; margin: 0in 0in 0in 29px; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 19px;">General Terms &amp; Conditions </span></strong></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; display: flex; justify-content: flex-start; break-after: avoid; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">1.&nbsp;</span><span style="line-height: 107%;">Background Verification </span></strong></h2>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 6px; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Your employment in the Company is
subject to satisfactory verification of your certificates, testimonials and
personal particulars/ credentials. The Company reserves the right to get a
background check (including criminal history record search, education and
employment; and personal details verification) conducted on you through
nominated third party agencies. In the event that such verification or
background check reveals any discrepancy in the statement(s) made in your
application or in the bio-data with the Company or in the declarations made by
you in this agreement, your services are liable to be terminated forthwith
without any notice or compensation.</span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; display: flex; justify-content: flex-start; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">2.&nbsp;</span><span style="line-height: 107%;">Date of Birth </span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; color: black; margin: 0in 2px 0in 0in; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-family: Inter, sans-serif;"><span>&nbsp; </span>The date of birth declared by you is <span style="background: yellow;"> [EMPLOYEEDATEOFBIRTH] </span>. You will be
bound by such a declared </span></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;"><span>&nbsp;
</span>Date of birth in all service matters with the Company, including your
retirement age. </span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; display: flex; justify-content: flex-start; text-indent: -1px; line-height: 107%; break-after: avoid; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">3.&nbsp;&nbsp;</span><span style="line-height: 107%;">Leave </span></strong></h2>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" style="text-align: justify; color: black; margin: 0in 0in 2px 6px; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="font-family: Inter, sans-serif;">You will be eligible for 15 days’ annual leave per financial year
(in addition to statutory holidays).<span>&nbsp;&nbsp;
</span>You will not be entitled to receive payment in lieu of any unused leave.</span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in; line-height: 107%; display: flex; justify-content: flex-start; break-after: avoid; font-family: Inter, sans-serif; color: black; text-indent: 0in; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span>4.&nbsp;</span><span style="line-height: 107%;">Confidentiality
</span></strong></h2>
<p classNmae="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Maintaining confidentiality is a
condition to your employment. During your employment, you will not store,
possess, use or disclose confidential/ personal/ sensitive information or data
(including those from any of your previous employment(s) with other organizations)
in an unauthorized manner. You shall not bring any such information or data
into the Company. You will not, either during your employment with the Company
or after termination of such employment, divulge to anyone any information,
secret, accounts or dealings relating to the Company’s business, its affairs or
its client, service providers, sub-contractor or vendors, other than the
Directors of the Company or their authorized representatives. </span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">On discontinuation of your employment, you
will return to the Company, all papers and documents and all other property
pertaining to the Company or affairs of the Company or its client or any of its
associates or branches, which may be in your possession, and will not retain
any copy or extract there from. </span></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">You agree to sign engagement specific
non-disclosure/ confidentiality agreements, if so, required by certain clients
of the Company. In case of any breach of confidentiality caused by you, either
during or after the termination of your employment with us, you will be
personally liable to our clients or third parties. You also agree to keep the
company and its directors indemnified for any loss which may be caused by your
failure to comply with confidentiality agreements.</span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>


<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; display: flex; justify-content: flex-start; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">5.</span><span style="line-height: 107%;">People Handbook- Policies &amp; Procedure:</span></strong></h2> 
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">You acknowledge that the Company has or may
from time to time adopt a people handbook, restrictions, policies and
procedures with respect to the conduct of its business and the financial and
investment affairs of its officers, directors and employees, and you agree to
be bound by and to adhere to all such handbooks, restrictions, policies and
procedures. Without prejudice to the above, you agree that you will during the
course of your employment abide by all existing and future India laws
applicable to the performance of your duties, all applicable rules and
regulations set forth by regulatory agencies, exchanges and self-practices. You
further agree to submit to such supervision as may be necessary to ensure
compliance therewith. </span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in; line-height: 107%; display: flex; justify-content: flex-start; break-after: avoid; font-family: Inter, sans-serif; color: black; text-indent: 0in; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span>6.&nbsp;</span><span style="line-height: 107%;">Indemnity:
</span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">You hereby agree to indemnify the Company, to
the fullest extent permitted by law and to save and hold harmless the Company,
from and in respect of all reasonable fees, costs, loss, damages and expenses,
including legal fee paid in connection with or resulting from </span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">any claim, action, or demand against the
Company, that arises out of or in any way relates to any action or omission on
your part during the course of your employment with the</span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Company, where you were acting negligently or
unlawfully or in breach of the terms of your employment or in an unreasonable
manner. </span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in; line-height: 107%; display: flex; justify-content: flex-start; break-after: avoid; font-family: Inter, sans-serif; color: black; text-indent: 0in; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span>7.&nbsp;</span><span style="line-height: 107%;">Intellectual Property
</span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">The nature of work to be assigned to you might
be such that the clients may retain exclusive ownership rights on the resulting
work products on unconditional basis. Further,</span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">The Company may need to provide a client with
material without acknowledging each individual who worked on it. </span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><strong><span style="line-height: 104%;">By
signing this agreement, you</span></strong><span style="line-height: 104%;">: </span></p>

<p className="MsoListParagraph" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 17px; text-indent: -0.25in; font-size: 16px;"><span style="line-height: 104%; font-family: Symbol;"><span>·<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;" data-font-size="">&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-family: Inter, sans-serif;">Acknowledge and agree to the condition that all existing and future intellectual property rights in any materials, information and technology of any nature created by you either singly or jointly with other persons, are the exclusive property of the Company with unfettered rights for utilization or disposal of the same; and · Consent the Company and/  or its clients to use or adapt material to which you have contributed, in any manner and without expressly acknowledging your individual contribution.</span></span></span></span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; display: flex; justify-content: flex-start; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">8.&nbsp;</span><span style="line-height: 107%;">Confidential and Proprietary Information </span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Information and materials relating to the
Company, its clients, licensors and suppliers that are not publicly available
must be treated as confidential and proprietary (“Confidential Information”)
and may only be used or disclosed for obligation purposes related to your
employment duties with the Company. </span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">You have an obligation to safeguard
Confidential Information from unauthorized use and disclosure. Confidential
Information includes, but is not limited to, the Company's professional,
technical and administrative manuals; associated forms, processes, and computer
systems (including hardware, software, databases and Information technology
systems); other methodologies and systems; marketing and business development
plans and strategies; client and prospect files, lists and materials; research
materials; investigative materials; and project notes and plans. </span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Because Confidential Information is extremely
valuable, the Company takes measures to maintain its confidentiality and guard
its secrecy. Confidential Information may be copied, disclosed or used by you
during your employment with the Company only as necessary to carry out Company
business and, where applicable, only as required or authorized under the terms
of any agreements between the Company and its clients, licensors and suppliers.
</span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">You agree not to take or keep any Confidential
Information when you leave the Company. If you are ever asked to disclose any
information or materials that are subject to these confidentiality
restrictions, pursuant to legal process or otherwise, you must contact the
business unit head or directors to seek the Company's consent prior to any
disclosure. These confidentiality restrictions are permanent and do not lapse
or cease upon your departure from the Company.</span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; display: flex; justify-content: flex-start; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">9.&nbsp;</span><span style="line-height: 107%;">Insider Information </span></strong></h2>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">You are prohibited from using or sharing
information, not publicly disclosed, which you obtain during the course of your
work for the Company, for your personal gain or advantage in securities
transactions, or for the personal gain or advantage of anyone with whom you
improperly share this information. This restriction applies to such information
related to any company, not just the Company's clients and their affiliates.
The foregoing obligation is in addition to any obligation that you have not to
purchase or hold securities of entities with respect to which the Company must
maintain independence. </span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; display: flex; justify-content: flex-start; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">10.</span><span style="line-height: 107%;">Protection of computer software/Company’s
Assets </span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">The Company has a strict policy prohibiting
the unauthorized reproduction or use of computer software purchased or licensed
from an outside vendor. You will not bring into the Company, or use, any
unauthorized or unlicensed software. You will be required to sign a declaration
annually that you are complying with this policy. All Company property/ assets,
including any copies thereof, must be returned to the Company on termination of
employment or whenever requested by the company. </span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">You will be provided with access to a computer
for your business use in the office. If you are allocated a portable computer
for use with your work, you are required to take additional responsibility for
the physical security of the equipment as well as the information stored
therein. You must make yourself aware of and comply with Company’s relevant
policies and procedures applicable to usage of the Company’s computer
equipment, including the Company’s policies on the appropriate use of email and
the internet. </span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">You acknowledge and agree that the Company
reserves the right to monitor your usage of the Company’s computer(s) and IT
systems/resources towards ensuring that there is no unauthorized usage thereof.
In case of any damage due to Negligence apart from any wear &amp; tear the
company is entitled to recover 80% of the cost of damage from you. </span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; display: flex; justify-content: flex-start; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">11.</span><span style="line-height: 107%;">Exclusivity </span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">During the continuance of your
employment with the Company, it is a condition of your employment that you will
not engage yourself in any other trade, business or occupation, including
private business and consulting, without obtaining prior permission from the
director of the Company.</span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; display: flex; justify-content: flex-start; color: black; text-indent: 0in; font-size: 16px;"><strong><span style="line-height: 107%;">12.</span><span style="line-height: 107%;">Performance Management </span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="font-family: Inter, sans-serif;">As a part of the People Growth Cycle, we follow an Annual
Appraisal Cycle in the month of April &amp; October of any given calendar year.
We encourage outstanding performance consistently and hence you may also be
appraised at any time during the year. However, there is no standard process of
increments after completion of probation in the company. Such appraisals are
undertaken only in the event of outstanding performance and only unanimous
management decision. </span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; display: flex; justify-content: flex-start; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">13.</span><span style="line-height: 107%;">Notice Period </span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">The Company or you may, at any time
during the course of the employment by stating their intention to do so in
writing, terminate the employment by giving notice of 1 month or more or a
salary payment in lieu of that notice. The Company may require you to complete
all operative parts of the assignment or project that you may be involved in on
the date of resignation as determined by the Company. If, in exceptional cases,
the Company may agree to your request for an early release, the Company will
recover the salary or part thereof equivalent to the balance notice period. </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">During the probation period, the company can
terminate the employment forthwith without any notice.</span></p>

<p className="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<h2 style="margin: 0px 0px 0px 6px; text-indent: -1px; display: flex; justify-content: flex-start; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">14.</span><span style="line-height: 107%;">Summary Termination: </span></strong></h2>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 1px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">This Agreement and your employment may be
terminated by the Company immediately without prior notice if you at any time: </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="line-height: 104%; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(i)&nbsp;</span></span><span style="line-height: 104%;">Commit any breach of your obligations
under this Agreement;</span></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="line-height: 104%; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(ii)&nbsp;</span></span><span style="line-height: 104%;">Disobey a lawful and reasonable order
of the Company;</span></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="line-height: 104%; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(iii)&nbsp;</span></span><span style="line-height: 104%;">Misconduct yourself under the
influence of any substance abuse. If the company has reasonable grounds of
suspecting that you are under the influence of illegal substance abuse whileat
work, the company may request you to undergo a noninvasive drug test which will
be conducted by a medical professional. If found guilty, your employment may be
terminated without any notice there.</span></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="line-height: 104%; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(iv)&nbsp;</span></span><span style="line-height: 104%;">Are guilty of or attempted to commit
fraud, dishonesty, theft or gross malfeasance, including, without limitation,
conduct of a disruptive, criminal nature, conduct involving moral turpitude,
embezzlement, or misappropriation of assets, misuse of the Company’s property;</span></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="line-height: 104%; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(v)&nbsp;</span></span><span style="line-height: 104%;">Are neglectful in your duties, despite
being warned;</span></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="line-height: 104%; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(vi)&nbsp;</span></span><span style="line-height: 104%;">Fail to report for work at the
Company’s office by the Effective Date;</span></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="line-height: 104%; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(vii)&nbsp;</span></span><span style="line-height: 104%;">Remain absent from duty for more than
3 days, without prior permission of a designated senior</span></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="line-height: 104%; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(viii)&nbsp;</span></span><span style="line-height: 104%;">Misrepresent any information to the
Company or make any false declaration to the Company or it is found that you
suppressed any information from the Company. This clause shall also be
applicable to any information or declaration or act committed prior to entering
into the employment of the Company;</span></p>

<p className="MsoNormal" align="left" style="color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="line-height: 104%; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(ix)&nbsp;</span></span><span style="line-height: 104%;">You are deemed incapable of continuing
in service or performing given work satisfactorily, owing to any physical or mental
infirmity/ incapacity or any other reason whatsoever.</span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-align: left; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">This list is not
exhaustive. The Company shall also be entitled to terminate your employment
immediately without prior notice for any other cause recognized by applicable
law.</span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-align: left; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">In the event of
termination pursuant to the above provision the Company shall not be obliged to
make any further payment to you beyond the amount of any remuneration and
payment in lieu of untaken holiday actually accrued up to and including the
date of such termination.</span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p className="MsoNormal" align="left" style="text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-align: left; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Further, the
termination of employment under this Agreement shall be without prejudice to
any right that the Company may have in respect of any breach by you of any of
the provisions of this Agreement, which may have occurred prior to such termination.</span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0px 0px 0px 6px; text-indent: -1px; display: flex; justify-content: flex-start; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">15.</span><span style="line-height: 107%;">Exit-Formalities: </span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Before termination of employment, you will be
required to complete exit formalities and sign necessary forms in this regard,
as per the policies of the Company. You will be required to return all
documents and property (including copies thereof) belonging to the Company
before your last working day in order to obtain release. You are also
specifically restrained from keeping copies, forwarding any mails or extracts
of any of the Company’s or client’s documents, codes, information with you,
after your release from the services of the Company, except with specific
written permission from the Company. </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-indent: 4px; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">As part of your exit formalities, you
have to provide in writing to us that you will be personally liable to us and/
or our clients for any data/ confidential information retained by you, in any
unauthorized manner or disclosed by you even after the tenure of your
employment. </span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0px 0px 0px 6px; text-indent: -1px; display: flex; justify-content: flex-start; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span style="line-height: 107%;">16.</span><span style="line-height: 107%;">Non-Solicitation </span></strong></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">Upon leaving the Company you will not,
without prior written consent of the Company, for a period of 24 (twenty-four)
months from the date of ceasing employment, canvass, solicit, interfere with or
entice away any person, Company or corporation who has, at any time during your
employment with the Company, been a client of the Company with whom you have
had contact or been involved in the provision of services, or an employee of
the Company.</span></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Inter, sans-serif;">To prevent any potential conflict of
interest or breach of confidentiality, you will not accept an appointment
offered by a client for whom an assignment is being performed by you or on
which you are working for twenty-four months after the last working day, unless
appropriate written consent is obtained from the Company. It is mandatory to
immediately notify your director of such an offer.</span></p>

<p className="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<div className="break"></div>
<p className="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p className="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p><p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 27px;">Declaration to be signed by the Employee</span></strong><span><br clear="all" style="break-before: page;">
</span></p>

<h2 align="center" style="line-height: 107%; text-align:center; break-after: avoid; color: black; margin: 0in 42px 9px 0in; text-align: center; text-indent: 0in; font-size: 16px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 21px;">DECLARATION
</span></h2>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; color: black; font-size: 16px;"><span style="font-family: Inter, sans-serif;">By signing this agreement, I hereby acknowledge and agree that I
have carefully read and understood the above agreement (including the attached
terms and conditions thereto) and accept the same unconditionally. I will make
myself fully aware of, and be bound by, the rules and regulations of the
Company as amended from time to time. In particular, I declare that: </span></p>
<p classNmae="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>a)&nbsp;</span></span></strong><span>I
will furnish original copies of my certificates, testimonials and other
necessary documents, on demand. </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>b)&nbsp;</span></span></strong><span>I
acknowledge and agree to the Company reserving the right to get a background
check conducted on me through a third-party agency. In furtherance thereof, I
authorize the Company to collect and retain copies of my personal particulars
(including educational certificates, copies of passport, driving license, PAN
card, and voter-identification card) either directly or through a third-party
agency. </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>c)&nbsp;</span></span></strong><span>There
are no ongoing or pending criminal cases/ criminal liabilities on me</span></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>d)&nbsp;</span></span></strong><span>I am
not in possession, in an unauthorized manner, of any confidential, sensitive or
personal information/ data/ material of any other Company or individual
(collectively “Sensitive Data”). I shall not bring any Sensitive Data into the
Company, and shall not use any such Sensitive Data in an unauthorized manner,
during or after my tenure with the Company </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>e</span></span></strong><span>I
shall not commit, or cause to commit, any act or omission, which I believe to
be illegal or against Company’s policies and core values for time being in
force. </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>f)&nbsp;</span></span></strong><span>In
the event of any wilful or intentional misconduct, fraud, dishonesty or breach
of confidentiality on my part, I will personally be liable to the Company and/
or its clients. </span></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span><span>&nbsp;</span></span><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 15px 31px; font-size: 16px;"><strong><span>Name<span>&nbsp;
</span><span>&nbsp;</span></span></strong><span>______________________</span></p>

<p className="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 15px 31px; font-size: 16px;"><strong><span>Signature </span></strong><span>______________________</span></p>

<p className="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; font-size: 16px;"><strong><span>Date </span></strong><span>______________________</span></p><p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; color: black; font-size: 16px;"><span><br></span></p>`;

export const data2 = `<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; background: yellow; font-family: Inter, sans-serif; font-size: 16px;">28<sup>TH</sup> of June 2024</span></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Inter, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; background: yellow; font-family: Inter, sans-serif; font-size: 16px;">To [NAME] [ADDRESS] Pin code: 201307</span></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Inter, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 16px;">Subject:
        Relieving Letter</span></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Inter, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 16px;">This is to
        acknowledge the receipt of your resignation letter dated <span style="background: yellow;">28 June 2024</span> from the
        post of <span style="background: yellow;">"[POSTOF]</span>” While accepting the same, we thank you very much for the close
        association you had with us during the tenure <span style="background: yellow;">from AUGUST 1<sup>ST</sup>, 2023 to JUNE 28<sup>TH</sup>,
            2024</span></span></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Inter, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 16px;">You have
        been relieved from your service with effect from the closing working hours of <span style="background: yellow;">JUNE 28<sup>TH</sup>, 2024</span></span></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Inter, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 16px;">We wish you
        all the best in your future</span></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Inter, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 16px;">Endeavour's
        Sincerely. </span></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 16px;">Kushel Digi
        Solutions</span></p>

<p className="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-family: Inter, sans-serif; font-size: 16px;">Noida, Uttar
        Pradesh</span></p>`;

export const data3 = `<p className="MsoNormal" style="margin: 0in 0in 11px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 19px;">
  <b>Kushel Digi Solutions</b>
</p>

<p className="MsoNormal" style="margin: 0in 0in 5px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;">
  First Floor, D242, F-32B, Sector 63 Rd, Noida, 201301<br />
  Uttar Pradesh
</p>
<p className="MsoNormal" style="margin: 0in 0in 5px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;">
  Email: <a href="mailto:info@kusheldigi.com" style="color:#101820;">info@kusheldigi.com</a><br/>
  Tel: <a href="tel:+919045301702" style="color:#101820;">+91 9045301702</a>
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>
<p className="MsoNormal" style="margin: 0in 0in 14px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  Date: <strong>[DATE]</strong>
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="margin: 0in 0in 22px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 17px;">
  <b>TO WHOMSOEVER IT MAY CONCERN</b>
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="margin: 0in 0in 14px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  This is to certify that <span style="font-weight:bold;">[FULLNAME]</span>, son/daughter of <span style="font-weight:bold;">[GUARDIANSNAME]</span>, was employed with Kushel Digi Solutions as a <span style="font-weight:bold;">[DESIGNATION]</span> from <span style="font-weight:bold;">[STARTDATE]</span> to <span style="font-weight:bold;">[ENDDATE]</span>.
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>
<p className="MsoNormal" style="margin: 0in 0in 11px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  During [his/her/their] tenure with us, [he/she/they] was responsible for:
</p>
<ul style="padding-left: 30px; font-size: 16px; font-family: Calibri, sans-serif;">
  <li><strong>[RESPONSIBILITY1]</strong></li>
   <li><strong>[RESPONSIBILITY2]</strong></li>
  <li><strong>[RESPONSIBILITY3]</strong></li>

</ul>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>
<p className="MsoNormal" style="margin: 0in 0in 11px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  <strong>[FIRSTNAME]</strong> demonstrated consistent dedication, professionalism, and a strong work ethic. [He/She/They] was a valuable member of our team and contributed meaningfully to our projects and organizational success.
</p>
<p className="MsoNormal" style="margin: 0in 0in 11px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  We found [him/her/them] to be proactive, quick to learn, and excellent in communication and teamwork. We appreciate the efforts and commitment shown during [his/her/their] time with us.
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>
<p className="MsoNormal" style="margin: 0in 0in 11px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  We wish [him/her/them] continued success in all future endeavors.
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>
<p className="MsoNormal" style="margin: 0in 0in 11px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  This letter is issued upon the employee's request and can be used as a formal record of employment.
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>
<p className="MsoNormal" style="margin: 0in 0in 31px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  Warm regards,
</p>

<p classNmae="MsoNormal" style="margin: 0in 0in 2px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  <b>[SENDERSNAME]</b>
</p>
<p className="MsoNormal" style="margin: 0in 0in 2px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  <strong>HR Manager</strong>
</p>
<p className="MsoNormal" style="margin: 0in 0in 2px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  <strong>Kushel Digi Solutions</strong>
</p>
<p className="MsoNormal" style="margin: 0in 0in 2px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  <strong>[(Signature &amp; Seal)]</strong>
</p>`;

export const data4 = `
<br>
 <p><span style="font-family: Helvetica, sans-serif;"><strong style="font-size: 14px;">Date</strong></span>: [issueDate]</p>
 
 <p><br></p><p><strong style="font-size: 14px;">Position:</strong> [POSITION] Intern</p><p><br></p><p><strong style="font-size: 14px;">Work Hours:</strong> [WORKHOUR] Hours</p><p><br></p><p>
<strong style="font-size: 14px;">Location: </strong> [LOCATION] </p><p><br></p><p>
<strong style="font-size: 14px;">Duration: </strong> [DURATION]
</p><p><br></p><p><strong style="font-size: 14px;">Job Profile</strong>: [POSITION] Intern</p><p><br></p><p>
<strong style="font-size: 14px;">Salary: </strong> [SALARY]
</p><p><br></p><p><strong style="font-size: 14px;">Joining Date:</strong> [joiningDate]
</p><p><br></p><p> [NAME] ,
I am pleased to extend an offer to you for the position of [POSITION] with KUSHEL DIGI SOLUTIONS,
effective [EFFECTIVE]. This position is an [SALARY] internship for [DURATION], aimed at providing valuable handson experience in [EXPERIENCEAT].</p><p><br></p><p>
During your internship, 
</p><p><br></p><p>Please review the further details regarding your responsibilities and expectations. We look forward to
welcoming you to our team and contributing to your professional growth.
</p><p><br></p><p><strong style="font-size: 14px;">Please confirm your acceptance of this offer by signing and returning this letter by [ACCEPTDATE].
</strong></p><p><br></p><p><strong style="font-size: 14px;">Benefits</strong>: Certificate, LOR/LOA (Or any other equivalent), ESOPs. Your position will officially start on [STARTDATE], upon acceptance of the offer.
</p><p><br></p><p style="text-align: center;"><strong style="font-size: 14px;">Terms and Conditions</strong></p><p><br></p><p>
If any of the parties would like to end the position and withdraw thereon, a notice must be given to the other
party at least 2 weeks in advance.
</p><p><br></p><p>The benefits of the job will be granted based on performance. Incentives will be paid quarterly based on the
performance and meeting KPIs.
</p><p><br></p><p>The certificates, LOR, LOA, etc. benefits will be only given on completion of the internship. Any official letters
such as recommendation, appreciation, or experience will only be given based on the performance of the
candidate.
</p><p><br></p><p>The Position Title, Job Description, and salary benefits are subject to change depending on the performance
review at the end of each month. This will be done in agreement with the employee.
</p><p><br></p><p>There are no set working hours in the company, so employees are expected to use their discretion regarding
office hours. About leaves, Kushel Digi Solutions is flexible and only expects the employee to give advance
notice to the management.
</p><p><br></p>
<div className="break"></div>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p><p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p>
Any elongated or uninformed (Without advance notice) holidays/leaves are not
allowed and if they happen, strict action will be taken. In case of emergencies, informing your senior would
suffice but other than that, giving advance notice about such leaves is mandatory.
The employee can still come to the office if he/she wishes on working days. We expect you to follow ethical
practices while working with us and are not liable for any unethical actions on your part while at work.</p><p><br></p><p>
The employee must also maintain a Non-Disclosure clause about the activities and strategies of Kushel Digi
Solutions. This means that you cannot share anything about what happens inside the firm, how you did your
work, what systems are followed in the company, and any data that was generated inside Kushel Digi Solutions
due to its business activities, while you are working with us or even after you leave the company. Breaking this
term can and will result in legal action.
</p><p><br></p><p>This offer is legally binding in all forms and nature. Acceptance implies agreement with all terms and
conditions herein.
</p><p><br></p><p>
We are excited for you to join us and to have a long-lasting association.</p><p><br></p><p>Thanks &amp; Regards</p><p>
HR Manager</p><p>
Priya Singh</p><p>
Kushel Digi Solutions</p><p><br></p><p>Name ______________________</p><p><br></p><p> Signature ______________________</p><p><br></p><p> Date ______________________</p>
`;

export const data5 = `
 <p> <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date: 24 AUGUST 2024</p><p><br></p><p><strong>To Whom It May Concern</strong>,</p><p>
 <p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

I am pleased to recommend <strong>[FULLNAME]</strong>, who completed a one-month internship as a
<strong>[DESIGNATION]</strong> with us. During this time, [he/she] demonstrated exceptional <strong>[SKILLS]</strong> and a keen understanding of our audience. <strong>[FIRSTNAME]</strong> consistently
delivered high-quality content on time and showed great adaptability to our
editorial standards. [His/Her/Them] enthusiasm and professionalism were evident, making [Him/Her/Them]
a valuable asset to our team. I am confident that <strong>[FIRSTNAME]</strong> will excel in any future
writing endeavors.</p><p><br></p><p>
We wish you all the best for your future!</p><p><br></p><p>
Thanks &amp; Regards
</p><p><strong>[SENDERSNAME]</strong> <br/>
HR Manager&nbsp;</p><p>
Kushel Digi Solutions</p>

`;

export const data6 = `
<p className="MsoNormal" style="margin: 0in 0in 11px; text-align:left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 19px;">
  <b>Kushel Digi Solutions</b>
</p>

<p className="MsoNormal" style="margin: 0in 0in 5px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;">
  First Floor, D242, F-32B, Sector 63 Rd, Noida, 201301<br />
  Uttar Pradesh
</p>
<p className="MsoNormal" style="margin: 0in 0in 5px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;">
  Mail : <a href="mailto:info@kusheldigi.com" style="color:#101820;">info@kusheldigi.com</a> <br/>
  Phone no: <a href="tel:+919045301702" style="color:#101820;">+91 9045301702</a>
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="margin: 0in 0in 14px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  Date: [DATE]
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="margin: 0in 0in 22px; text-align: left; line-height: 107%; font-family: Calibri, sans-serif; font-size: 17px;">
  <b>TO WHOMSOEVER IT MAY CONCERN</b>
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="margin: 0in 0in 14px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  This is to certify that <span style="font-weight:bold;">[FULLNAME]</span> has successfully completed an internship at <b>Kushel Digi Solutions</b>. The internship was undertaken from <span style="font-weight:bold;">[STARTDATE]</span> to <span style="font-weight:bold;">[ENDDATE]</span>, during which time [he/she/they] was actively involved in assigned tasks and projects relevant to [his/her/their] field of study.
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="margin: 0in 0in 14px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  During the internship tenure, <strong>[FULLNAME]</strong> exhibited professionalism, a strong willingness to learn, and the ability to contribute meaningfully to team objectives. [His/Her/Their] performance and conduct were satisfactory throughout the engagement period.
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="margin: 0in 0in 14px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  We appreciate [his/her/their] contribution and wish [him/her/them] the very best for future academic and professional pursuits.
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="margin: 0in 0in 34px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  Sincerely,
</p>
<p className="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p className="MsoNormal" style="margin: 0in 0in 2px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  <b>[SENDERSNAME]</b>
</p>
<p className="MsoNormal" style="margin: 0in 0in 2px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  HR Manager
</p>
<p className="MsoNormal" style="margin: 0in 0in 2px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  Kushel Digi Solutions
</p>
<p className="MsoNormal" style="margin: 0in 0in 2px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 16px;">
  (Signature &amp; Seal)
</p>
`;

export const data7 = `<p><strong>Private &amp; Confidential</strong></p><p><br></p><p>
[SENDINGDATE] </p><p><br></p><p>
Dear [NAME],
</p><p>We are pleased to offer you the position of [POSITION] with Kushel Digi Solutions. 
[INTRODUCTION]
</p><p><br></p><p><br></p><p><h3 style="text-align:center;"><strong style="font-size: 16px;">Terms of Engagement</strong></h3><br><br>1. <strong>Position:&nbsp;</strong>[POSITION]<br> <br> 2. <strong>Start Date</strong>: [JOININGDATE]<br> <br> 3. <strong>Scope of Work:&nbsp;</strong>[WORKSCOPE]<br> <br>
4. <strong>Working Hours: </strong>You will work on a flexible schedule, delivering tasks and reports as per the agreed timeline.
<br><br>5. <strong>Compensation: </strong>Your compensation for this position will be [COMPENSATION]/- PM<br><br><br><h3 style="text-align:center;"><strong style="font-size: 16px;">Terms of Employement</strong></h3>
<br><br>This offer of employment is contingent upon your acceptance of the terms outlined in this letter
and the successful completion of any background checks or screenings required by <strong>KUSHEL DIGI
SOLUTIONS.</strong><br><br>
Please indicate your acceptance of this offer by signing and returning a copy of this letter by [RETURNINGDATE]<br><br>
The above-mentioned offershall be valid if you join us on or before Monday, [JOININGDATE]<br><br>

Your annual gross emoluments will be Rs. [ANNUALINCOME]
including Basic, HRA, Conveyance Allowances, Medical, Communication and Personal Allowances. The
details of the salary are in the attached Salary Break up Annexure –A.<br><br>We are excited about the opportunity to work with you and believe that your skills and
experience will make a significant contribution to our team. If you have any questions or require
further clarification, please do not hesitate to contact me.
<br><br>To confirm your acceptance of this agreement, please initial all the pages and put your signature
on the declaration on the page of this agreement and return to us the duplicate copy of the
entire agreement duly initialed and signed. We look forward to a long and mutually beneficial
relationship.
<br><br>Yours faithfully,
<br>Priya Singh
HR Manager<br>
For and on behalf of

<div className="break"></div>
 
<br>Kushel Digi Solutions.<br><br><br>&nbsp; &nbsp;<br><h3 style="text-align:center;"><strong style="font-size: 16px;">Appendix A</strong></h3></p><p><br></p><p><strong>Name: </strong>[NAME]<br>
<strong>Designation:</strong> [DESIGNATION]
<br><strong>Location: </strong>[LOCATION]<br><br><br><br><strong style="font-size: 16px;">Compensation Details</strong>

</p><p><br>All the above amounts are based on a full year of service. The amount payable to you will be
determined on pro-rata based on the number of days that you serve with the Company during the
applicable financial year. The annual payable to you shall be liable to tax deduction at source as
per the applicable law for the time being in force.<br><br>


Please note that irrespective of whether you join KUSHEL DIGI SOLUTIONS or not, you
need to keep all the details contained in this letter confidential.





</p><table className="MsoNormalTable" border="1" cellspacing="0" cellpadding="0" align="left" width="701" style="margin-left: 9px; margin-right: 9px;">
 <tbody><tr style="height: 22px;">
  <td width="701" colspan="2" valign="top" style="width: 7.3in; padding: 0in; height: 22px;">
  <p className="TableParagraph" align="center" style="font-family: Inter, sans-serif; margin: 3px 335px 0px 0in; text-align: center; line-height: 87%; font-size: 15px;"><strong><span style="line-height: 87%; font-size: 13px;"><span></span>Annexure–A</strong>.</p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; font-size: 13px;">Per MonthFixed</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;"> [COMPENSATION].00 </span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">SalaryBreak -upComponents</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">Monthly
  (INR)</span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Basic+DA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><br></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">HRA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">000.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Conveyance Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">000.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Medical
  Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Education Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 20px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 20px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">LTA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 20px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 2px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Communication</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 2px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">PersonalAllowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Bonus</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">Net Take Home(PerMonth)</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; background: yellow; font-size: 13px;"> [COMPENSATION] </span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">TOTAL COST TO THE COMPANY(PerAnnum)</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; background: yellow; font-size: 13px;">0000.00</span></strong></p>
  </td>
 </tr>
</tbody></table>



<br><br> <br><p> We look forward to your joining and a long association.</p><br><br>
<p style="text-align: center;"><strong style="font-size: 18px;">Appendix B</strong></p><br><p style="text-align: center;"><strong style="font-size: 16px;">General Terms &amp; Conditions
</strong></p><br><br><p><strong style="font-size: 14px;">1. Background Verification</strong></p><br><p>Your employment in the Company is subject to satisfactory verification of your certificates,
testimonials and personal particulars/ credentials. The Company reserves the right to get a
background check (including criminal history record search, education and employment; and
personal details verification) conducted on you through nominated third-party agencies. If such
verification or background check reveals any discrepancy in the statement(s) made in your
application or in the bio-data with the Company or in the declarations made by you in this
agreement, your services are liable to be terminated forthwith without any notice or
compensation.</p><br><p><strong style="font-size: 14px;">2. Date of Birth</strong>
</p><br><p>The date of birth declared by you is [DATEOFBIRTH]. You will be bound by such a declared
Date of birth in all service matters with the Company, including your retirement age.
</p><br><p><strong style="font-size: 14px;">3. Leave</strong>
</p><br><p>You will be eligible for [LEAVEALLOCATED] days’ annual leave per financial year (in addition to statutory holidays).
You will not be entitled to receive payment in lieu of any unused leave.</p><br><p>
<strong style="font-size: 14px;">4. Confidentiality</strong>
</p><br><p>Maintaining confidentiality is a condition of your employment. During your employment, you will
not store, possess, use or disclose confidential/ personal/ sensitive information or data (including
those from any of your previous employment(s) with other organizations) in an unauthorized
manner. You shall not bring any such information or data into the Company. You will not, either
during your employment with the Company or after the termination of such employment,
divulge to anyone any information, secret, accounts or dealings relating to the Company’s
business, its affairs or its client, service providers, sub-contractor or vendors, other than the
Directors of the Company or their authorized representatives.
</p><br><p>On discontinuation of your employment, you will return to the Company, all papers and
documents and all other property pertaining to the Company or affairs of the Company or its client
or any of its associates or branches, which may be in your possession and will not retain any copy
or extract therefrom.</p><br><p>You agree to sign engagement-specific non-disclosure/ confidentiality agreements, if so, required
by certain clients of the Company. In case of any breach of confidentiality caused by you, either
during or after the termination of your employment with us, you will be personally liable to our
clients or third parties. You also agree to keep the company and its directors indemnified for any
loss that may be caused by your failure to comply with confidentiality agreements</p><br><p><strong style="font-size: 14px;">5. People Handbook- Policies &amp; Procedure:</strong></p><br><p>
You acknowledge that the Company has or may from time to time adopt a people handbook,
restrictions, policies and procedures with respect to the conduct of its business and the financial
and investment affairs of its officers, directors and employees, and you agree to be bound by and
to adhere to all such handbooks, restrictions, policies and procedures. Without prejudice to the
above, you agree that you will during the course of your employment abide by all existing and
future India laws applicable to the performance of your duties, all applicable rules and regulations
set forth by regulatory agencies, exchanges and self-practices. You further agree to submit to such
supervision as may be necessary to ensure compliance therewith.</p><br><p>
<strong style="font-size: 14px;">6. Indemnity:</strong>
</p><br><p>You hereby agree to indemnify the Company, to the fullest extent permitted by law and to save
and hold harmless the Company, from and in respect of all reasonable fees, costs, loss, damages
and expenses, including legal fees paid in connection with or resulting from
any claim, action, or demand against the Company, that arises out of or in any way relates to any
action or omission on your part during the course of your employment with the
Company, where you were acting negligently or unlawfully or in breach of the terms of your
employment or in an unreasonable manner.
</p><br><p><strong style="font-size: 14px;">7. Intellectual Property:</strong></p><br><p>
The nature of the work to be assigned to you might be such that the clients may retain exclusive
ownership rights on the resulting work products on an unconditional basis. Further,
The Company may need to provide a client with the material without acknowledging each
individual who worked on it.</p><br><p>By signing this agreement, you:
</p><br><p>• Acknowledge and agree to the condition that all existing and future intellectual property rights
in any materials, information and technology of any nature created by you eithersingly or jointly
with other persons, are the exclusive property of the Company with unfettered rights for
utilization or disposal of the same; and</p><br><p>
• Consent the Company and/ or its clientsto use or adapt material to which you have contributed,
in any manner and without expressly acknowledging your individual contribution.</p><br><p><strong style="font-size: 14px;">8. Confidential and Proprietary Information</strong>
</p><br><p>Information and materials relating to the Company, its clients, licensors and suppliers that are not
publicly available must be treated as confidential and proprietary (“Confidential Information”) and
may only be used or disclosed for obligation purposes related to your employment duties with the
Company.</p><br><p>
You have an obligation to safeguard Confidential Information from unauthorized use and
disclosure. Confidential Information includes, but is not limited to, the Company's professional,
technical and administrative manuals; associated forms, processes, and computer systems
(including hardware, software, databases and Information technology systems); other
methodologies and systems; marketing and business development plans and strategies; client and
prospect files, lists and materials; research materials; investigative materials; and project notes
and plans.</p><br><p>
Because Confidential Information is extremely valuable, the Company takes measures to maintain
its confidentiality and guard its secrecy. Confidential Information may be copied, disclosed or used
by you during your employment with the Company only as necessary to carry out Company
business and, where applicable, only asrequired or authorized under the terms of any agreements
between the Company and its clients, licensors and suppliers.</p><br><p>
You agree not to take or keep any Confidential Information when you leave the Company. If you
are ever asked to disclose any information or materials that are subject to these confidentiality
restrictions, pursuant to legal process or otherwise, you must contact the business unit head or
directors to seek the Company's consent prior to any disclosure. These confidentiality restrictions
are permanent and do not lapse or cease upon your departure from the Company.
</p><p><strong style="font-size: 14px;"><br></strong></p><p><strong style="font-size: 14px;">9. Insider Information</strong></p><br><p>You are prohibited from using or sharing information, not publicly disclosed, which you obtain
during the course of your work for the Company, for your personal gain or advantage in securities
transactions, or for the personal gain or advantage of anyone with whom you improperly share
this information. This restriction applies to such information related to any company, not just the
Company's clients and their affiliates. The foregoing obligation is in addition to any obligation that
you have not to purchase or hold securities of entities with respect to which the Company must
maintain independence.
</p><br><p><strong style="font-size: 14px;">10. Protection of computersoftware/Company’s Asset</strong></p><br><p>The Company has a strict policy prohibiting the unauthorized reproduction or use of computer
software purchased or licensed from an outside vendor. You will not bring into the Company, or
use, any unauthorized or unlicensed software. You will be required to sign a declaration annually
that you are complying with this policy. All Company property/ assets, including any copies
thereof, must be returned to the Company on termination of employment or whenever requested
by the company</p><br><p>You will be provided with access to a computer for your business use in the office. If you are
allocated a portable computer for use with your work, you are required to take additional
responsibility for the physical security of the equipment as well as the information stored therein.
You must make yourself aware of and comply with Company’s relevant policies and procedures
applicable to usage of the Company’s computer equipment, including the Company’s policies on
the appropriate use of email and the internet.</p><br><p>
You acknowledge and agree that the Company reserves the right to monitor your usage of the
Company’s computer(s) and IT systems/resources towards ensuring that there is no unauthorized
usage thereof. In case of any damage due to Negligence apart from any wear &amp; tear the company
is entitled to recover 80% of the cost of damage from you.</p><br><p><strong style="font-size: 14px;">11. Exclusivity</strong>
</p><br><p>During the continuance of your employment with the Company, it is a condition of your
employment that you will not engage yourself in any other trade, business or occupation, including
private business and consulting, without obtaining prior permission from the director of the
Company.
</p><br><p><strong style="font-size: 14px;">12. Performance Management</strong>
</p><br><p>As a part of the People Growth Cycle, we follow an Annual Appraisal Cycle in the month of April
&amp; October of any given calendar year. We encourage outstanding performance consistently and
hence you may also be appraised at any time during the year. However, there is no standard
process of increments after completion of probation in the company. Such appraisals are
undertaken only in the event of outstanding performance and only unanimous management
decision.
</p><br><p><strong style="font-size: 14px;">13. Notice Period</strong>
</p><br><p>The Company or you may, at any time during the course of the employment by stating their
intention to do so in writing, terminate the employment by giving notice of 1 month or more or a
salary payment in lieu of that notice. The Company may require you to complete all operative parts
of the assignment or project that you may be involved in on the date of resignation as determined
by the Company. If, in exceptional cases, the Company may agree to your request for an early
release, the Company will recover the salary or part thereof equivalent to the balance notice
period.
</p><br><p>During the probation period, the company can terminate the employment forthwith without any
notice.</p><br><p><strong style="font-size: 14px;">14. Summary Termination:</strong>
</p><br><p>This Agreement and your employment may be terminated by the Company immediately without
prior notice if you at any time</p><br><p>(i) Commit any breach of your obligations under this Agreement;
</p><br><p>(ii) Disobey a lawful and reasonable order ofthe Company;
</p><br><p>(iii) Misconduct yourself under the influence of any substance abuse. If the company has
reasonable grounds of suspecting that you are under the influence of illegal substance
abuse while at work, the company may request you to undergo a noninvasive drug test
which will be conducted by a medical professional. If found guilty, your employment may
be terminated without any notice there.</p><br><p>
(iv) Are guilty of or attempted to commit fraud, dishonesty, theft or gross malfeasance,
including, without limitation, conduct of a disruptive, criminal nature, conduct involving
moral turpitude, embezzlement, or misappropriation of assets, misuse of the Company’s
property;
</p><br><p>(v) Are neglectful in your duties, despite being warned;</p><br><p>
(vi) Fail to report for work at the Company’s office by the Effective Date;
</p><br><p>(vii) Remain absent from duty for more than 3 days, without prior permission of a designated
senior</p><br><p>
(viii) Misrepresent any information to the Company or make any false declaration to the
Company or it is found that you suppressed any information from the Company. This
clause shall also be applicable to any information or declaration or act committed prior
to entering into the employment of the Company;
</p><br><p>(ix) You are deemed incapable of continuing in service or performing given work
satisfactorily, owing to any physical or mental infirmity/incapacity or any other reason
whatsoever.
</p><br><p>This list is not exhaustive. The Company shall also be entitled to terminate your employment
immediately without prior notice for any other cause recognized by applicable law.
</p><br><p>In the event of termination pursuant to the above provision the Company shall not be obliged to
make any further payment to you beyond the amount of any remuneration and payment in lieu
of untaken holiday actually accrued up to and including the date of such termination.</p><br><p>Further, the termination of employment under this Agreement shall be without prejudice to any
right that the Company may have in respect of any breach by you of any of the provisions of this
Agreement, which may have occurred prior to such termination.</p><br><p><strong style="font-size: 16px;">15. Exit formalities:</strong>
</p><br><p>Before termination of employment, you will be required to complete exit formalities and sign
the necessary forms in this regard, as per the policies of the Company. You will be required to
return all documents and property (including copies thereof) belonging to the Company before
your last working day to obtain release. You are also specifically restrained from keeping copies,
or forwarding any mails or extracts of any of the Company’s or client’s documents, codes,
or information with you, after your release from the services of the Company, except with
specific written permission from the Company.
As part of your exit formalities, you have to provide in writing to us that you will be personally
liable to us and/ or our clients for any data/ confidential information retained by you, in any
unauthorized manner or disclosed by you even after the tenure of your employment.
</p><br><p><strong style="font-size: 14px;">16. Non-Solicitation</strong>
</p><br><p>Upon leaving the Company you will not, without prior written consent of the Company, for 24
(twenty-four) months from the date of ceasing employment, canvass, solicit, interfere with or
entice away any person, Company or corporation who has, at any time during your employment
with the Company, been a client of the Company with whom you have had contact or been
involved in the provision of services, or an employee of the Company.
To prevent any potential conflict of interest or breach of confidentiality, you will not accept an
appointment offered by a client for whom an assignment is being performed by you or on which
you are working for twenty-four months after the last working day, unless appropriate written
consent is obtained from the Company. It is mandatory to immediately notify your director ofsuch
an offer.
</p><p><br></p><p><br></p><br><p style="text-align: center;"><strong style="font-size: 18px;">Declaration to be signed by the Employee</strong></p><br><p style="text-align: center;"><strong style="font-size: 18px;">DECLARATION</strong></p><br><br><br><p>By signing this agreement, I hereby acknowledge and agree that I have carefully read and
understood the above agreement (including the attached terms and conditions thereto) and
accept the same unconditionally. I will make myself fully aware of, and be bound by, the rules
and regulations of the Company as amended from time to time. In particular, I declare that:</p><br><p>
a) I will furnish original copies of my certificates, testimonials and other necessary documents,
on demand.</p><br><p>
b) I acknowledge and agree to the Company reserving the right to get a background check
conducted on me through a third-party agency. In furtherance thereof, I authorize the
Company to collect and retain copies of my personal particulars (including educational
certificates, copies of passport, driving license, PAN card, and voter-identification card) either
directly or through a third-party agency.
</p><br><p>c) There are no ongoing or pending criminal cases/ criminal liabilities on me.</p><br><p>
d) I am not in possession, in an unauthorized manner, of any confidential, sensitive or personal
information/ data/ material of any other Company or individual (collectively “Sensitive
Data”). I shall not bring any Sensitive Data into the Company, and shall not use any such
Sensitive Data in an unauthorized manner, during or after my tenure with the Company
</p><br><p>e) I shall not commit, or cause to commit, any act or omission, which I believe to be illegal or
against the Company’s policies and core values for the time being in force.
</p><br><p>f) In the case of any willful or intentional misconduct, fraud, dishonesty, or breach of
confidentiality on my part, I will be personally liable to the Company and/or its clients.
</p><p><br></p>`;

export const data8 = `<p><strong>Private &amp; Confidential</strong></p><p><br></p><p>
[SENDINGDATE] </p><p><br></p><p>
Dear [NAME],
</p><p>We are pleased to offer you the position of [POSITION] on a part-time basis at KUSHEL DIGI SOLUTIONS.&nbsp;We are excited about the prospect of you joining
our team and contributing your expertise to our organization.</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<br><br>1. <strong>Position:&nbsp;</strong>[POSITION]<br> <br> 2. <strong>Joining Date</strong>: [JOININGDATE]<br> <br> 3.&nbsp;<strong>Location</strong><strong>:&nbsp;</strong>[LOCATION]<br> <br>
4. <strong>Working Hours: </strong>[WORKHOUR]<br><br>5. <strong>Working Days: </strong>[WORKINGDAYS]<br></p><p><br></p><p><br></p><p><strong style="font-size: 16px;">Responsibilities</strong>:</p><p><br></p><p>
1. Identify and pursue new business opportunities to generate leads and increase revenue.
</p><p>2. Develop and maintain relationships with clients and key stakeholders.
</p><p>3. Collaborate with the sales and marketing teams to develop strategies for business
growth.
</p><p>4. Analyze market trends and competitor activities to identify potential areas for expansion.
</p><p>5. Prepare and deliver presentations to prospective clients.
6. Negotiate contracts and agreements with clients.</p><p><br></p><p><br></p><p><strong style="font-size: 16px;">Compensation</strong>: Your compensation for this position will be [COMPENSATION]/- PM + incentives based on
the target's achievements policies.</p><p><br></p><p><strong style="font-size: 16px;">Benefits</strong>: As a part-time employee, you will be eligible for the following benefits:
</p><p><br></p><p>1. Flexible work schedule.</p><p>
2. Opportunities for professional development and growth.</p><p><br></p><p><strong style="font-size: 16px;"><br></strong></p><p><strong style="font-size: 16px;">Terms of Employment:</strong>
<br><br>This offer of employment is contingent upon your acceptance of the terms outlined in this letter
and the successful completion of any background checks or screenings required by <strong>KUSHEL DIGI
SOLUTIONS.</strong><br><br>
Please indicate your acceptance of this offer by signing and returning a copy of this letter by [RETURNINGDATE]<br><br>
The above-mentioned offershall be valid if you join us on or before Monday, [JOININGDATE]<br><br>
Your annual gross emoluments will be Rs. [ANNUALINCOME]
including Basic, HRA, Conveyance Allowances, Medical, Communication and Personal Allowances. The
details of the salary are in the attached Salary Break up Annexure –A.<br><br>We are excited about the opportunity to work with you and believe that your skills and
experience will make a significant contribution to our team. If you have any questions or require
further clarification, please do not hesitate to contact me.
<br><br>To confirm your acceptance of this agreement, please initial all the pages and put your signature
on the declaration on the page of this agreement and return to us the duplicate copy of the
entire agreement duly initialed and signed. We look forward to a long and mutually beneficial
relationship.
<br><br>Yours faithfully,
<br>Priya Singh
HR Manager<br>
For and on behalf of
<br>Kushel Digi Solutions.<br><br><br>&nbsp; &nbsp;<br><h3 style="text-align:center;"><strong style="font-size: 16px;">Appendix A</strong></h3></p><p><br></p><p><strong>Name: </strong>[NAME]<br>
<strong>Designation:</strong> [DESIGNATION]
<br><strong>Location: </strong>[LOCATION]<br><br><br><br><strong style="font-size: 16px;">Compensation Details</strong>
</p><p><br>All the above amounts are based on a full year of service. The amount payable to you will be
determined on pro-rata based on the number of days that you serve with the Company during the
applicable financial year. The annual payable to you shall be liable to tax deduction at source as
per the applicable law for the time being in force.<br><br>


Please note that irrespective of whether you join KUSHEL DIGI SOLUTIONS or not, you
need to keep all the details contained in this letter confidential.





</p><table className="MsoNormalTable" border="1" cellspacing="0" cellpadding="0" align="left" width="701" style="margin-left: 9px; margin-right: 9px;">
 <tbody><tr style="height: 22px;">
  <td width="701" colspan="2" valign="top" style="width: 7.3in; padding: 0in; height: 22px;">
  <p className="TableParagraph" align="center" style="font-family: Inter, sans-serif; margin: 3px 335px 0px 0in; text-align: center; line-height: 87%; font-size: 15px;"><strong><span style="line-height: 87%; font-size: 13px;"><span>
  </span></span><span></span>Annexure–A</strong>.</p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; font-size: 13px;">PerMonthFixed</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;"> [COMPENSATION].00 </span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">SalaryBreak -upComponents</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">Monthly
  (INR)</span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Basic+DA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><br></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">HRA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">000.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Conveyance Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">000.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Medical
  Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Education Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 20px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 20px;">
  <p className="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">LTA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 20px;">
  <p className="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 2px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Communication</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 2px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">PersonalAllowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Inter, sans-serif; font-size: 13px;">Bonus</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Inter, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">Net Take Home(PerMonth)</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; background: yellow; font-size: 13px;"> [COMPENSATION] </span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; font-size: 13px;">TOTAL COST TO THE COMPANY (PerAnnum)</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p className="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Inter, sans-serif; color: black; background: yellow; font-size: 13px;">0000.00</span></strong></p>
  </td>
 </tr>
</tbody></table>



<br><br> <br><p> We look forward to your joining and a long association.</p><br><br>
<p style="text-align: center;"><strong style="font-size: 18px;">Appendix B</strong></p><br><p style="text-align: center;"><strong style="font-size: 16px;">General Terms &amp; Conditions
</strong></p><br><br><p><strong style="font-size: 14px;">1. Background Verification</strong></p><br><p>Your employment in the Company is subject to satisfactory verification of your certificates,
testimonials and personal particulars/ credentials. The Company reserves the right to get a
background check (including criminal history record search, education and employment; and
personal details verification) conducted on you through nominated third-party agencies. If such
verification or background check reveals any discrepancy in the statement(s) made in your
application or in the bio-data with the Company or in the declarations made by you in this
agreement, your services are liable to be terminated forthwith without any notice or
compensation.</p><br><p><strong style="font-size: 14px;">2. Date of Birth</strong>
</p><br><p>The date of birth declared by you is [DATEOFBIRTH]. You will be bound by such a declared
Date of birth in all service matters with the Company, including your retirement age.
</p><br><p><strong style="font-size: 14px;">3. Leave</strong>
</p><br><p>You will be eligible for [LEAVEALLOCATED] days’ annual leave per financial year (in addition to statutory holidays).
You will not be entitled to receive payment in lieu of any unused leave.</p><br><p>
<strong style="font-size: 14px;">4. Confidentiality</strong>
</p><br><p>Maintaining confidentiality is a condition of your employment. During your employment, you will
not store, possess, use or disclose confidential/ personal/ sensitive information or data (including
those from any of your previous employment(s) with other organizations) in an unauthorized
manner. You shall not bring any such information or data into the Company. You will not, either
during your employment with the Company or after the termination of such employment,
divulge to anyone any information, secret, accounts or dealings relating to the Company’s
business, its affairs or its client, service providers, sub-contractor or vendors, other than the
Directors of the Company or their authorized representatives.
</p><br><p>On discontinuation of your employment, you will return to the Company, all papers and
documents and all other property pertaining to the Company or affairs of the Company or its client
or any of its associates or branches, which may be in your possession and will not retain any copy
or extract therefrom.</p><br><p>You agree to sign engagement-specific non-disclosure/ confidentiality agreements, if so, required
by certain clients of the Company. In case of any breach of confidentiality caused by you, either
during or after the termination of your employment with us, you will be personally liable to our
clients or third parties. You also agree to keep the company and its directors indemnified for any
loss that may be caused by your failure to comply with confidentiality agreements</p><br><p><strong style="font-size: 14px;">5. People Handbook- Policies &amp; Procedure:</strong></p><br><p>
You acknowledge that the Company has or may from time to time adopt a people handbook,
restrictions, policies and procedures with respect to the conduct of its business and the financial
and investment affairs of its officers, directors and employees, and you agree to be bound by and
to adhere to all such handbooks, restrictions, policies and procedures. Without prejudice to the
above, you agree that you will during the course of your employment abide by all existing and
future India laws applicable to the performance of your duties, all applicable rules and regulations
set forth by regulatory agencies, exchanges and self-practices. You further agree to submit to such
supervision as may be necessary to ensure compliance therewith.</p><br><p>
<strong style="font-size: 14px;">6. Indemnity:</strong>
</p><br><p>You hereby agree to indemnify the Company, to the fullest extent permitted by law and to save
and hold harmless the Company, from and in respect of all reasonable fees, costs, loss, damages
and expenses, including legal fees paid in connection with or resulting from
any claim, action, or demand against the Company, that arises out of or in any way relates to any
action or omission on your part during the course of your employment with the
Company, where you were acting negligently or unlawfully or in breach of the terms of your
employment or in an unreasonable manner.
</p><br><p><strong style="font-size: 14px;">7. Intellectual Property:</strong></p><br><p>
The nature of the work to be assigned to you might be such that the clients may retain exclusive
ownership rights on the resulting work products on an unconditional basis. Further,
The Company may need to provide a client with the material without acknowledging each
individual who worked on it.</p><br><p>By signing this agreement, you:
</p><br><p>• Acknowledge and agree to the condition that all existing and future intellectual property rights
in any materials, information and technology of any nature created by you eithersingly or jointly
with other persons, are the exclusive property of the Company with unfettered rights for
utilization or disposal of the same; and</p><br><p>
• Consent the Company and/ or its clientsto use or adapt material to which you have contributed,
in any manner and without expressly acknowledging your individual contribution.</p><br><p><strong style="font-size: 14px;">8. Confidential and Proprietary Information</strong>
</p><br><p>Information and materials relating to the Company, its clients, licensors and suppliers that are not
publicly available must be treated as confidential and proprietary (“Confidential Information”) and
may only be used or disclosed for obligation purposes related to your employment duties with the
Company.</p><br><p>
You have an obligation to safeguard Confidential Information from unauthorized use and
disclosure. Confidential Information includes, but is not limited to, the Company's professional,
technical and administrative manuals; associated forms, processes, and computer systems
(including hardware, software, databases and Information technology systems); other
methodologies and systems; marketing and business development plans and strategies; client and
prospect files, lists and materials; research materials; investigative materials; and project notes
and plans.</p><br><p>
Because Confidential Information is extremely valuable, the Company takes measures to maintain
its confidentiality and guard its secrecy. Confidential Information may be copied, disclosed or used
by you during your employment with the Company only as necessary to carry out Company
business and, where applicable, only asrequired or authorized under the terms of any agreements
between the Company and its clients, licensors and suppliers.</p><br><p>
You agree not to take or keep any Confidential Information when you leave the Company. If you
are ever asked to disclose any information or materials that are subject to these confidentiality
restrictions, pursuant to legal process or otherwise, you must contact the business unit head or
directors to seek the Company's consent prior to any disclosure. These confidentiality restrictions
are permanent and do not lapse or cease upon your departure from the Company.
</p><p><strong style="font-size: 14px;"><br></strong></p><p><strong style="font-size: 14px;">9. Insider Information</strong></p><br><p>You are prohibited from using or sharing information, not publicly disclosed, which you obtain
during the course of your work for the Company, for your personal gain or advantage in securities
transactions, or for the personal gain or advantage of anyone with whom you improperly share
this information. This restriction applies to such information related to any company, not just the
Company's clients and their affiliates. The foregoing obligation is in addition to any obligation that
you have not to purchase or hold securities of entities with respect to which the Company must
maintain independence.
</p><br><p><strong style="font-size: 14px;">10. Protection of computersoftware/Company’s Asset</strong></p><br><p>The Company has a strict policy prohibiting the unauthorized reproduction or use of computer
software purchased or licensed from an outside vendor. You will not bring into the Company, or
use, any unauthorized or unlicensed software. You will be required to sign a declaration annually
that you are complying with this policy. All Company property/ assets, including any copies
thereof, must be returned to the Company on termination of employment or whenever requested
by the company</p><br><p>You will be provided with access to a computer for your business use in the office. If you are
allocated a portable computer for use with your work, you are required to take additional
responsibility for the physical security of the equipment as well as the information stored therein.
You must make yourself aware of and comply with Company’s relevant policies and procedures
applicable to usage of the Company’s computer equipment, including the Company’s policies on
the appropriate use of email and the internet.</p><br><p>
You acknowledge and agree that the Company reserves the right to monitor your usage of the
Company’s computer(s) and IT systems/resources towards ensuring that there is no unauthorized
usage thereof. In case of any damage due to Negligence apart from any wear &amp; tear the company
is entitled to recover 80% of the cost of damage from you.</p><br><p><strong style="font-size: 14px;">11. Exclusivity</strong>
</p><br><p>During the continuance of your employment with the Company, it is a condition of your
employment that you will not engage yourself in any other trade, business or occupation, including
private business and consulting, without obtaining prior permission from the director of the
Company.
</p><br><p><strong style="font-size: 14px;">12. Performance Management</strong>
</p><br><p>As a part of the People Growth Cycle, we follow an Annual Appraisal Cycle in the month of April
&amp; October of any given calendar year. We encourage outstanding performance consistently and
hence you may also be appraised at any time during the year. However, there is no standard
process of increments after completion of probation in the company. Such appraisals are
undertaken only in the event of outstanding performance and only unanimous management
decision.
</p><br><p><strong style="font-size: 14px;">13. Notice Period</strong>
</p><br><p>The Company or you may, at any time during the course of the employment by stating their
intention to do so in writing, terminate the employment by giving notice of 1 month or more or a
salary payment in lieu of that notice. The Company may require you to complete all operative parts
of the assignment or project that you may be involved in on the date of resignation as determined
by the Company. If, in exceptional cases, the Company may agree to your request for an early
release, the Company will recover the salary or part thereof equivalent to the balance notice
period.
</p><br><p>During the probation period, the company can terminate the employment forthwith without any
notice.</p><br><p><strong style="font-size: 14px;">14. Summary Termination:</strong>
</p><br><p>This Agreement and your employment may be terminated by the Company immediately without
prior notice if you at any time</p><br><p>(i) Commit any breach of your obligations under this Agreement;
</p><br><p>(ii) Disobey a lawful and reasonable order ofthe Company;
</p><br><p>(iii) Misconduct yourself under the influence of any substance abuse. If the company has
reasonable grounds of suspecting that you are under the influence of illegal substance
abuse while at work, the company may request you to undergo a noninvasive drug test
which will be conducted by a medical professional. If found guilty, your employment may
be terminated without any notice there.</p><br><p>
(iv) Are guilty of or attempted to commit fraud, dishonesty, theft or gross malfeasance,
including, without limitation, conduct of a disruptive, criminal nature, conduct involving
moral turpitude, embezzlement, or misappropriation of assets, misuse of the Company’s
property;
</p><br><p>(v) Are neglectful in your duties, despite being warned;</p><br><p>
(vi) Fail to report for work at the Company’s office by the Effective Date;
</p><br><p>(vii) Remain absent from duty for more than 3 days, without prior permission of a designated
senior</p><br><p>
(viii) Misrepresent any information to the Company or make any false declaration to the
Company or it is found that you suppressed any information from the Company. This
clause shall also be applicable to any information or declaration or act committed prior
to entering into the employment of the Company;
</p><br><p>(ix) You are deemed incapable of continuing in service or performing given work
satisfactorily, owing to any physical or mental infirmity/incapacity or any other reason
whatsoever.
</p><br><p>This list is not exhaustive. The Company shall also be entitled to terminate your employment
immediately without prior notice for any other cause recognized by applicable law.
</p><br><p>In the event of termination pursuant to the above provision the Company shall not be obliged to
make any further payment to you beyond the amount of any remuneration and payment in lieu
of untaken holiday actually accrued up to and including the date of such termination.</p><br><p>Further, the termination of employment under this Agreement shall be without prejudice to any
right that the Company may have in respect of any breach by you of any of the provisions of this
Agreement, which may have occurred prior to such termination.</p><br><p><strong style="font-size: 16px;">15. Exit formalities:&nbsp;</strong></p><br><p>Before termination of employment, you will be required to complete exit formalities and sign
the necessary forms in this regard, as per the policies of the Company. You will be required to
return all documents and property (including copies thereof) belonging to the Company before
your last working day to obtain release. You are also specifically restrained from keeping copies,
or forwarding any mails or extracts of any of the Company’s or client’s documents, codes,
or information with you, after your release from the services of the Company, except with
specific written permission from the Company.
As part of your exit formalities, you have to provide in writing to us that you will be personally
liable to us and/ or our clients for any data/ confidential information retained by you, in any
unauthorized manner or disclosed by you even after the tenure of your employment.
</p><br><p><strong style="font-size: 14px;">16. Non-Solicitation</strong>
</p><br><p>Upon leaving the Company you will not, without prior written consent of the Company, for 24
(twenty-four) months from the date of ceasing employment, canvass, solicit, interfere with or
entice away any person, Company or corporation who has, at any time during your employment
with the Company, been a client of the Company with whom you have had contact or been
involved in the provision of services, or an employee of the Company.
To prevent any potential conflict of interest or breach of confidentiality, you will not accept an
appointment offered by a client for whom an assignment is being performed by you or on which
you are working for twenty-four months after the last working day, unless appropriate written
consent is obtained from the Company. It is mandatory to immediately notify your director ofsuch
an offer.
</p><p><br></p><p><br></p><br><p style="text-align: center;"><strong style="font-size: 18px;">Declaration to be signed by the Employee</strong></p><br><p style="text-align: center;"><strong style="font-size: 18px;">DECLARATION</strong></p><br><br><br><p>By signing this agreement, I hereby acknowledge and agree that I have carefully read and
understood the above agreement (including the attached terms and conditions thereto) and
accept the same unconditionally. I will make myself fully aware of, and be bound by, the rules
and regulations of the Company as amended from time to time. In particular, I declare that:</p><br><p>
a) I will furnish original copies of my certificates, testimonials and other necessary documents,
on demand.</p><br><p>
b) I acknowledge and agree to the Company reserving the right to get a background check
conducted on me through a third-party agency. In furtherance thereof, I authorize the
Company to collect and retain copies of my personal particulars (including educational
certificates, copies of passport, driving license, PAN card, and voter-identification card) either
directly or through a third-party agency.
</p><br><p>c) There are no ongoing or pending criminal cases/ criminal liabilities on me.</p><br><p>
d) I am not in possession, in an unauthorized manner, of any confidential, sensitive or personal
information/ data/ material of any other Company or individual (collectively “Sensitive
Data”). I shall not bring any Sensitive Data into the Company, and shall not use any such
Sensitive Data in an unauthorized manner, during or after my tenure with the Company
</p><br><p>e) I shall not commit, or cause to commit, any act or omission, which I believe to be illegal or
against the Company’s policies and core values for the time being in force.
</p><br><p>f) In the case of any willful or intentional misconduct, fraud, dishonesty, or breach of
confidentiality on my part, I will be personally liable to the Company and/or its clients.</p>`;

const DocumentManagement = ({ setAlert, pop, setPop }) => {
  const {
    user,
    allEmployee,
    saveDocs,
    freelencerOfferApi,
    partTimeOfferApi,
    saveRelivingLetterapi,
    saveExperienceLetterapi,
    saveLORLetterApi,
    saveLetter1Api,
    saveOfferInterLetterapi,
  } = useMain();

  const [currEmp, setCurrEmp] = useState(0);
  const selectedEmpType = item[currEmp]?.title;

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const [allEmp, setAllEmp] = useState([]);
  const [SelectEmpId, setSelectEmpId] = useState("");

  const [currentPage, setCurrentPage] = useState(0);

  const allEmplget = async () => {
    const ans = await allEmployee();
    setAllEmp(ans?.emp);
  };

  const { role } = hrms_user;

  const quillRef = useRef();

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"], // remove formatting
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "page-break",
  ];

  const [content, setContent] = useState(data);
  const [content2, setContent2] = useState(data2);
  const [content3, setContent3] = useState(data3);
  const [content4, setContent4] = useState(data4);
  const [content5, setContent5] = useState(data5);
  const [content6, setContent6] = useState(data6);

  // for offer letter freelecncer
  const [content7, setContent7] = useState(data7);
  const [content8, setContent8] = useState(data8);

  const saveDocumentApi = async () => {
    
    if (SelectEmpId === "" || SelectEmpId === "Select") {
      toast.error("Please select the user");
      return;
    }
    const emptyFields = Object.entries(detail).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      toast.error('Please fill out all fields before saving!', {
        autoClose: 4000
      });
      return;
    }
    const toastid = toast.loading("Loading...");
    const ans = await saveDocs({ id: SelectEmpId, content });
    if (ans?.status) {
      toast.success("Successfuly created");
    } else {
      toast.error("Too large Content");
    }
    toast.dismiss(toastid);
  };

  const partTimeOffterLetter = async () => {
    if (SelectEmpId === "" || SelectEmpId === "Select") {
      toast.error("Please select the user");
      return;
    }
    const emptyFields = Object.entries(detail5).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      toast.error('Please fill out all fields before saving!', {
        autoClose: 4000
      });
      return;
    }
    const toastid = toast.loading("Loading...");
    const ans = await partTimeOfferApi({ id: SelectEmpId, content8 });
    if (ans?.status) {
      toast.success("Successfuly created");
    } else {
      toast.error("Too large Content");
    }
    toast.dismiss(toastid);
  };

  const freelencerOffterLetter = async () => {
    if (SelectEmpId === "" || SelectEmpId === "Select") {
      toast.error("Please select the user");
      return;
    }
    const emptyFields = Object.entries(detail4).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      toast.error('Please fill out all fields before saving!', {
        autoClose: 4000
      });
      return;
    }
    const toastid = toast.loading("Loading...");
    const ans = await freelencerOfferApi({ id: SelectEmpId, content7 });
    if (ans?.status) {
      toast.success("Successfuly created");
    } else {
      toast.error("Too large Content");
    }
    toast.dismiss(toastid);
  };

  const saveRelivingLetter = async () => {
    if (SelectEmpId === "" || SelectEmpId === "Select") {
      toast.error("Please select the user");
      return;
    }
    const emptyFields = Object.entries(reDetail).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      toast.error('Please fill out all fields before saving!', {
        autoClose: 4000
      });
      return;
    }
    const toastid = toast.loading("Loading...");
    const ans = await saveRelivingLetterapi({
      id: SelectEmpId,
      content: content2,
    });
    if (ans?.status) {
      toast.success("Successfuly created");
    }
    toast.dismiss(toastid);
  };

  const saveExperienceLetter = async () => {
    if (SelectEmpId === "" || SelectEmpId === "Select") {
      toast.error("Please select the user");
      return;
    }
    const emptyFields = Object.entries(expDetail).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      toast.error('Please fill out all fields before saving!', {
        autoClose: 4000
      });
      return;
    }
  
    const toastid = toast.loading("Loading...");
    const ans = await saveExperienceLetterapi({
      id: SelectEmpId,
      content: content3,
    });

    if (ans?.status) {
      toast.success("Successfuly created");
    }
    toast.dismiss(toastid);
  };

  const saveInterOfferLetter = async () => {
    if (SelectEmpId === "" || SelectEmpId === "Select") {
      toast.error("Please select the user");
      return;
    }
    const emptyFields = Object.entries(detail2).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      toast.error('Please fill out all fields before saving!', {
        autoClose: 4000
      });
      return;
    }
    const toastid = toast.loading("Loading...");
    const ans = await saveOfferInterLetterapi({
      id: SelectEmpId,
      content: content4,
    });

    if (ans?.status) {
      toast.success("Successfuly Saved");
    }
    toast.dismiss(toastid);
  };

  const saveLORLetter = async () => {
    const emptyFields = Object.entries(lorDetail).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      toast.error('Please fill out all fields before saving!', {
        autoClose: 4000
      });
      return;
    }
    if (SelectEmpId === "" || SelectEmpId === "Select") {
      toast.error("Please select the user");
      return;
    }
    const toastid = toast.loading("Loading...");
    const ans = await saveLORLetterApi({
      id: SelectEmpId,
      content: content5,
    });

    if (ans?.status) {
      toast.success("Successfuly Saved");
    }
    toast.dismiss(toastid);
  };

  const saveLetter2 = async () => {
    const emptyFields = Object.entries(detail3).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      toast.error('Please fill out all fields before saving!', {
        autoClose: 4000
      });
      return;
    }
    if (SelectEmpId === "" || SelectEmpId === "Select") {
      toast.error("Please select the user");
      return;
    }
    const toastid = toast.loading("Loading...");
    const ans = await saveLetter1Api({
      id: SelectEmpId,
      content: content6,
    });

    if (ans?.status) {
      toast.success("Successfuly Saved");
    }
    toast.dismiss(toastid);
  };

  const [replaceData, setReplaceData] = useState({
    name: "[NAME]",
    address: "[ADDRESS]",
    postOf: "[POSTOF]",
    dear: "[DEAR]",
    post: "[POST]",
    position: "[POSITION]",
    joiningDate: "[JOININGDATE]",
    employeeType: "[EMPLOYEETYPE]",
    workingHour: "[WORKHOUR]",
    workingDays: "[WORKINGDAYS]",
    compensation: "[COMPENSATION]",
    annualCompensation: "[ANNUALCOMPENSATION]",
    returningDay: "[RETURNINGDAY]",
    returningDate: "[RETURNINGDATE]",
    validJoin: "[VALIDJOIN]",
    empDateOfBirth: "[EMPLOYEEDATEOFBIRTH]",
    sendingDate: "[SENDINGDATE]",
    sendername: "[SENDERNAME]",
  });

  const [relReplaceData, setRelReplaceData] = useState({
    name: "[NAME]",
    address: "[ADDRESS]",
    postOf: "[POSTOF]",
  });

  const [lorReplaceData, setLorReplaceData] = useState({
    fullName: "[FULLNAME]",
    firstName: "[FIRSTNAME]",
    sendersName: "[SENDERSNAME]",
    designation:"[DESIGNATION]",
    skills:"[SKILLS]"
  });

  const [expReplaceData, setExpReplaceData] = useState({
    fullName: "[FULLNAME]",
    firstName: "[FIRSTNAME]",
    startDate: "[STARTDATE]",
    endDate: "[ENDDATE]",
    designation: "[DESIGNATION]",
    responsibility1: "[RESPONSIBILITY1]",
    responsibility2: "[RESPONSIBILITY2]",
    responsibility3: "[RESPONSIBILITY3]",
    sendingDate: "[DATE]",
    sendersName: "[SENDERSNAME]",
    guardianName: "[GUARDIANSNAME]",
});

  const [replaceData4, setReplaceData4] = useState({
    name: "[NAME]",
    address: "[ADDRESS]",
    position: "[POSITION]",
    joiningDate: "[JOININGDATE]",
    employeeType: "[EMPLOYEETYPE]",
    workingHour: "[WORKHOUR]",
    workingDays: "[WORKINGDAYS]",
    compensation: "[COMPENSATION]",
    returningDay: "[RETURNINGDAY]",
    returningDate: "[RETURNINGDATE]",
    validJoin: "[VALIDJOIN]",
    empDateOfBirth: "[DATEOFBIRTH]",
    sendingDate: "[SENDINGDATE]",
    sendername: "[SENDERNAME]",
    workscope: "[WORKSCOPE]",
    introduction: "[INTRODUCTION]",
    annualIncome: "[ANNUALINCOME]",
    designation: "[DESIGNATION]",
    location: "[LOCATION]",
    leave: "[LEAVEALLOCATED]",
  });

  const [replaceData5, setReplaceData5] = useState({
    name: "[NAME]",
    address: "[ADDRESS]",
    position: "[POSITION]",
    joiningDate: "[JOININGDATE]",
    employeeType: "[EMPLOYEETYPE]",
    workingHour: "[WORKHOUR]",
    workingDays: "[WORKINGDAYS]",
    compensation: "[COMPENSATION]",
    returningDay: "[RETURNINGDAY]",
    returningDate: "[RETURNINGDATE]",
    validJoin: "[VALIDJOIN]",
    empDateOfBirth: "[DATEOFBIRTH]",
    sendingDate: "[SENDINGDATE]",
    sendername: "[SENDERNAME]",
    workscope: "[WORKSCOPE]",
    introduction: "[INTRODUCTION]",
    annualIncome: "[ANNUALINCOME]",
    designation: "[DESIGNATION]",
    location: "[LOCATION]",
    leave: "[LEAVEALLOCATED]",
  });

  const [replaceData2, setReplaceData2] = useState({
    name: "[NAME]",
    position: "[POSITION]",
    workHour: "[WORKHOUR]",
    location: "[LOCATION]",
    duration: " [DURATION]",
    salary: "[SALARY]",
    effective: "[EFFECTIVE]",
    experienceat: "[EXPERIENCEAT]",
    acceptDate: "[ACCEPTDATE]",
    startDate: "[STARTDATE]",
    joiningDate: "[joiningDate]",
    issueDate: "[issueDate]",
  });

  const [replaceData3, setReplaceData3] = useState({
    date: "[DATE]",
    fullName: "[FULLNAME]",
    startDate: "[STARTDATE]",
    endDate: "[ENDDATE]",
    sendersName: "[SENDERSNAME]",
  });

  const [detail, setDetail] = useState({
    // name: "",
    address: "",
    postOf: "",
    dear: "",
    post: "",
    compensation: "",
    annualCompensation: "",
    joiningDate: "",
    employeeType: "Full-time Employee",
    workingHour: "",
    workingDays: "",
    returningDate: "",
    returningDay: "",
    validJoin: "",
    empDateOfBirth: "",
    sendingDate: "",
    sendername: "",
  });

  const [reDetail, setReDetail] = useState({
    name: "",
    address: "",
    postOf: "",
  });
  const [lorDetail, setLorDetail] = useState({
    fullName:"",
    firstName:"",
    sendersName:"",
    designation:"",
    skills:"",
  });

  const [expDetail, setExpDetail] = useState({
    fullName: "",
    firstName: "",
    sendingDate: "",
    startDate: "",
    endDate: "",
    guardianName: "",
    designation: "",
    responsibility1: "",
    responsibility2: "",
    responsibility3: "",
    sendersName: "",
  });

  const [detail2, setDetail2] = useState({
    name: "",
    position: "",
    workHour: "",
    location: "",
    duration: "",
    salary: "",
    effective: "",
    experienceat: "",
    acceptDate: "",
    startDate: "",
    joiningDate: "",
    issueDate: "",
  });

  const [detail3, setDetail3] = useState({
    date: "",
    fullName: "",
    startDate: "",
    endDate: "",
    sendersName: "",
  });

  const [detail4, setDetail4] = useState({
    name: "",
    // dear: "",
    position: "",
    compensation: "",
    joiningDate: "",
    employeeType: "Freelencer",
    workingHour: "",
    workingDays: "",
    returningDate: "",
    returningDay: "",
    validJoin: "",
    empDateOfBirth: "",
    sendingDate: "",
    sendername: "",
    workscope: "",
    introduction: "",
    annualIncome: "",
    designation: "",
    location: "",
    leave: "",
  });
  const [detail5, setDetail5] = useState({
    name: "",
    // dear: "",
    position: "",
    compensation: "",
    joiningDate: "",
    employeeType: "Freelencer",
    workingHour: "",
    workingDays: "",
    returningDate: "",
    returningDay: "",
    validJoin: "",
    empDateOfBirth: "",
    sendingDate: "",
    sendername: "",
    workscope: "",
    introduction: "",
    annualIncome: "",
    designation: "",
    location: "",
    leave: "",
  });

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const reHandleNameChange = (e) => {
    const { name, value } = e.target;
    setReDetail((prev) => ({ ...prev, [name]: value }));
  };
  const expHandleNameChange = (e) => {
    const { name, value } = e.target;
    setExpDetail((prev) => {
      const updated = { ...prev, [name]: value };
      console.log(updated);
      return updated;
    });
  };

  const handleNameChange4 = (e) => {
    const { name, value } = e.target;
    setDetail4((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleNameChange5 = (e) => {
    const { name, value } = e.target;
    setDetail5((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  const handleNameChange2 = (e) => {
    const { name, value } = e.target;
    setDetail2((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const insertPageBreak = () => {
    const editor = quillRef.current?.getEditor();
    console.log("Editor:", editor);

    const range = editor?.getSelection();
    console.log("Range:", range);

    if (range) {
      editor.insertEmbed(range.index, "page-break", true, "user");
      editor.setSelection(range.index + 1);
    }
  };

 
  const handleInsert1 = (which) => {
    if (which === "all") {
      const emptyFields = Object.entries(detail).filter(
        ([key, value]) => !value?.toString().trim()
      );
      if (emptyFields.length > 0) {
        // const fieldNames = emptyFields.map(([key]) => key).join(", ");
        toast.error(
          `Please fill out all fields before inserting.`
        );
        return;
      }

      let updatedContent = content;

      Object.keys(detail).forEach((key) => {
        const valueToInsert = detail[key];
        const valueReplace = replaceData[key];

        const escapedValueReplace = valueReplace?.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

        const regex = new RegExp(escapedValueReplace, "g");
        updatedContent = updatedContent?.replace(regex, valueToInsert);
      });

      setContent(updatedContent);
      setReplaceData({ ...detail });
    } else {
      const valueToInsert = detail[which];
      const valueReplace = replaceData[which];

      if (!valueToInsert?.toString().trim()) {
        alert(`Please fill out the ${which} field before inserting.`);
        return;
      }

      const escapedValueReplace = valueReplace?.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const regex = new RegExp(escapedValueReplace, "g");
      const updatedContent = content?.replace(regex, valueToInsert);
      setContent(updatedContent);

      setReplaceData((prevReplaceData) => ({
        ...prevReplaceData,
        [which]: valueToInsert,
      }));
    }
  };

  const relHandleInsert1 = (which) => {
    if (which === "all") {
      const emptyFields = Object.entries(reDetail).filter(
        ([, value]) => !value?.toString().trim()
      );

      if (emptyFields.length > 0) {
        // const fieldNames = emptyFields.map(([key]) => key).join(", ");
        toast.error(
          `Please fill out all fields before inserting.`
        );
        return;
      }

      let updatedContent = content2;

      Object.keys(reDetail).forEach((key) => {
        const valueToInsert = reDetail[key];
        const valueReplace = relReplaceData[key];

        if (!valueReplace || !valueToInsert) return;

        const escapedValueReplace = valueReplace.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );
        const regex = new RegExp(escapedValueReplace, "g");
        updatedContent = updatedContent.replace(regex, valueToInsert);
      });

      setContent2(updatedContent);
      setRelReplaceData({ ...reDetail });
    }
  };

  const expHandleInsert = (which) => {
  if (which === "all") {
    const emptyFields = Object.entries(expDetail).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      // const fieldNames = emptyFields.map(([key]) => key).join(", ");
      toast.error(
        `Please fill out all fields before inserting.`
      );
      return;
    }
    let updatedContent = content3;
    Object.keys(expDetail).forEach((key) => {
      const valueToInsert = expDetail[key];
      const valueReplace = expReplaceData[key]; 
      if (!valueReplace || !valueToInsert) return;
      const escapedValueReplace = valueReplace.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const regex = new RegExp(escapedValueReplace, "g");
      updatedContent = updatedContent.replace(regex, valueToInsert);
    });
    setContent3(updatedContent); 
    setExpReplaceData({ ...expDetail });
  }
};


  const handleInsert5 = (which) => {
    if (which === "all") {
      const emptyFields = Object.entries(detail4).filter(
        ([_, value]) => !value?.toString().trim()
      );

      if (emptyFields.length > 0) {
        // const fieldNames = emptyFields.map(([key]) => key).join(", ");
        toast.error(
          `Please fill out all fields before inserting.`
        );
        return;
      }

      let updatedContent = content5;

      Object.keys(detail4).forEach((key) => {
        const valueToInsert = detail4[key];
        const valueReplace = replaceData4[key];

        const escapedValueReplace = valueReplace?.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

        const regex = new RegExp(escapedValueReplace, "g");
        updatedContent = updatedContent?.replace(regex, valueToInsert);
      });

      setContent5(updatedContent);
      setReplaceData4({ ...detail4 });
    } else {
      const valueToInsert = detail4[which];
      const valueReplace = replaceData4[which];

      if (!valueToInsert?.toString().trim()) {
        alert(`Please fill out the ${which} field before inserting.`);
        return;
      }

      const escapedValueReplace = valueReplace?.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const regex = new RegExp(escapedValueReplace, "g");
      const updatedContent = content5?.replace(regex, valueToInsert);
      setContent5(updatedContent);

      setReplaceData4((prevReplaceData) => ({
        ...prevReplaceData,
        [which]: valueToInsert,
      }));
    }
  };

  const handleInsert6 = (which) => {
    if (which === "all") {
      const emptyFields = Object.entries(detail5).filter(
        ([_, value]) => !value?.toString().trim()
      );

      if (emptyFields.length > 0) {
        // const fieldNames = emptyFields.map(([key]) => key).join(", ");
        toast.error(
          `Please fill out all fields before inserting.`
        );
        return;
      }

      let updatedContent = content5;

      Object.keys(detail5).forEach((key) => {
        const valueToInsert = detail5[key];
        const valueReplace = replaceData5[key];

        const escapedValueReplace = valueReplace?.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

        const regex = new RegExp(escapedValueReplace, "g");
        updatedContent = updatedContent?.replace(regex, valueToInsert);
      });

      setContent8(updatedContent);
      setReplaceData5({ ...detail5 });
    } else {
      const valueToInsert = detail5[which];
      const valueReplace = replaceData5[which];

      if (!valueToInsert?.toString().trim()) {
        alert(`Please fill out the ${which} field before inserting.`);
        return;
      }

      const escapedValueReplace = valueReplace?.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const regex = new RegExp(escapedValueReplace, "g");
      const updatedContent = content8?.replace(regex, valueToInsert);
      setContent8(updatedContent);

      setReplaceData5((prevReplaceData) => ({
        ...prevReplaceData,
        [which]: valueToInsert,
      }));
    }
  };


  const handleInsert3 = (which) => {
    if (which === "all") {
      const emptyFields = Object.entries(detail2).filter(
        ([_, value]) => !value?.toString().trim()
      );

      if (emptyFields.length > 0) {
        // const fieldNames = emptyFields.map(([key]) => key).join(", ");
        toast.error(
          `Please fill out all fields before inserting.`
        );
        return;
      }

      let updatedContent = content4;

      Object.keys(detail2).forEach((key) => {
        const valueToInsert = detail2[key];
        const valueReplace = replaceData2[key];

        const escapedValueReplace = valueReplace?.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

        const regex = new RegExp(escapedValueReplace, "g");
        updatedContent = updatedContent?.replace(regex, valueToInsert);
      });

      setContent4(updatedContent);
      setReplaceData2({ ...detail2 });
    } else {
      const valueToInsert = detail2[which];
      const valueReplace = replaceData2[which];

      if (!valueToInsert?.toString().trim()) {
        alert(`Please fill out the ${which} field before inserting.`);
        return;
      }

      const escapedValueReplace = valueReplace?.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const regex = new RegExp(escapedValueReplace, "g");
      const updatedContent = content4?.replace(regex, valueToInsert);
      setContent4(updatedContent);

      setReplaceData2((prevReplaceData) => ({
        ...prevReplaceData,
        [which]: valueToInsert,
      }));
    }
  };

  const handleInsert2 = () => {
    const emptyFields = Object.entries(lorDetail).filter(
      ([, value]) => !value?.toString().trim()
    );
    if (emptyFields.length > 0) {
      toast.error("Please fill out all fields before Inserting."); 
      return;
    }
  
    let updatedContent = content5;
    Object.keys(lorDetail).forEach((key) => {
      const valueToInsert = lorDetail[key];
      const valueReplace = lorReplaceData[key];
      if (!valueReplace) return; 
      const escapedValueReplace = valueReplace.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const regex = new RegExp(escapedValueReplace, "g");
      updatedContent = updatedContent.replace(regex, valueToInsert);
    });
    setContent5(updatedContent);
    setLorReplaceData({ ...lorDetail }); // update last replaced values
  };

  const handleLORNameChange = (e) => {
    const { name, value } = e.target;
    setLorDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInsert4 = (which) => {
    if (which === "all") {
      // Validation: Ensure all fields are filled
      const emptyFields = Object.entries(detail3).filter(
        ([, value]) => !value?.toString().trim()
      );

      if (emptyFields.length > 0) {
        // const fieldNames = emptyFields.map(([key]) => key).join(", ");
        toast.error(
          // `Please fill out all fields before inserting. Missing: ${fieldNames}`
        );
        return;
      }

      let updatedContent = content6;
      Object.keys(detail3).forEach((key) => {
        const valueToInsert = detail3[key];
        const valueReplace = replaceData3[key];
        if (!valueReplace) return;

        const escapedValueReplace = valueReplace.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );
        const regex = new RegExp(escapedValueReplace, "g");
        updatedContent = updatedContent.replace(regex, valueToInsert);
      });

      setContent6(updatedContent);
      setReplaceData3({ ...detail3 });
    } else {
      // single field replacement
      const valueToInsert = detail3[which];
      const valueReplace = replaceData3[which];

      const escapedValueReplace = valueReplace?.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const regex = new RegExp(escapedValueReplace, "g");
      const updatedContent = content6?.replace(regex, valueToInsert);
      setContent6(updatedContent);

      setReplaceData3((prevReplaceData) => ({
        ...prevReplaceData,
        [which]: valueToInsert,
      }));
    }
  };

  const handleDetail3Change = (e) => {
    const { name, value } = e.target;
    setDetail3((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const completionLetterIndex = item2.findIndex(
    (e) => e.title === "Complition Letter"
  );

  useEffect(() => {
    allEmplget();
  }, []);

  useEffect(() => {
    handleInsert1("employeeType");
  }, [currEmp]);

  // Calculate yearly compensation

  return (
    <>
      <div className="employee-dash h-full">
       

        <div className="w-full bg-[#f5f5f5]">
         
          <div className="px-[20px] pt-[32px] pb-[32px] pl-[20px] relative w-full">
            <div className="flex-col">
              <div className="flex flex-col gap-4">
                <h2 className="text-[#101820] text-2xl font-semibold leading-8 text-left">Document Management</h2>

                {/* first sec */}
                <div className="flex w-[95%] items-center gap-6 border border-[#E8E9EB] rounded-[12px] bg-white p-3 overflow-x-scroll lg:overflow-x-hidden">
                  {item.map((e, index) => (
                    <div
                      onClick={() => {
                        setDetail((prev) => ({
                          ...prev,
                          employeeType: e.title,
                        }));
                        setCurrEmp(index);
                      }}
                      className="flex items-center gap-2 cursor-pointer min-w-fit"
                      key={index}
                    >
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640680/bx-user-pin_mef3ze.png" alt="" />

                      <p className={`${currEmp == index ? "text-[14px] font-normal leading-6 text-left text-[#0B56E4]" : "text-[14px] font-normal leading-6 text-left text-[#0F141C]"}`}>
                        {e.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* second sec */}
                <div className="flex w-[95%] items-center gap-6 border border-[#E8E9EB] rounded-[12px] bg-white p-3 overflow-x-scroll lg:overflow-x-hidden">
                  {item2.map((e, index) => (
                    <div
                      onClick={() => setCurrentPage(index)}
                      className="flex items-center gap-2 cursor-pointer min-w-fit"
                      key={index}
                    >
                      <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640680/bx-user-pin_mef3ze.png" alt="" />

                      <p
                        className={`${
                          currentPage == index ? "text-[14px] font-normal leading-6 text-left text-[#0B56E4]" : "text-[14px] font-normal leading-6 text-left text-[#0F141C]"
                        }`}
                      >
                        {e.title}
                      </p>
                    </div>
                  ))}
                </div>

                {currentPage === 0 && currEmp === 0 && (
                  <>
                    <div className="flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white p-3">
                      <div className="flex items-center gap-2">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640800/docSubfir_klxb0c.png" alt="" />
                        <span className="text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Offer Letter</span>
                      </div>

                      <hr />

                      <div className="doSubSs">
                        <span classname="text-[#2b2b2b] text-sm font-medium leading-5 tracking-[0.0025em] text-left">Placeholders</span>
                      </div>

                      <hr />

                      <div className="flex flex-col gap-[10px]">
                        <label className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em]" htmlFor="">Select Employee</label>
                        <select
                        className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em] px-4 py-2 rounded-[5px] border border-gray-300"
                          name="SelectEmpId"
                          value={SelectEmpId}
                          onChange={(e) => setSelectEmpId(e.target.value)}
                          id=""
                        >
                          <option value="Select">Select</option>
                          {allEmp?.map((emp, index) => (
                            <option key={index} value={emp?._id}>
                              {emp.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        // { name: "name", label: "Name", placeholder: "Enter Name" },
                        {
                          name: "dear",
                          label: "Employee Name",
                          placeholder: "Enter Employee Name",
                        },
                        {
                          name: "address",
                          label: "Address",
                          placeholder: "Enter Address",
                        },
                        {
                          name: "postOf",
                          label: "Post Of",
                          placeholder: "Enter Post Of",
                        },
                        {
                          name: "post",
                          label: "Post",
                          placeholder: "Enter Post",
                        },
                        {
                          name: "compensation",
                          label: "Monthly Compensation",
                          placeholder: "Enter Monthly Compensation",
                        },
                        {
                          name: "annualCompensation",
                          label: "Annual Compensation",
                          placeholder: "Enter Annual Compensation",
                        },
                        {
                          name: "joiningDate",
                          label: "Joining Date",
                          placeholder: "Enter Joining Date",
                          type: "date",
                        },
                        {
                          name: "employeeType",
                          label: "Employee Type",
                          placeholder: "Enter Employee Type",
                        },
                        {
                          name: "workingHour",
                          label: "Working Hour",
                          placeholder: "Enter Working Hour",
                          type: "time",
                        },
                        {
                          name: "workingDays",
                          label: "Working Days",
                          placeholder: "Enter Working Days",
                        },
                        {
                          name: "returningDate",
                          label: "Returning Date",
                          placeholder: "Enter Returning Date",
                          type: "date",
                        },
                        {
                          name: "returningDay",
                          label: "Returning Day",
                          placeholder: "Enter Returning Day",
                        },
                        {
                          name: "validJoin",
                          label: "Valid Join Date",
                          placeholder: "Enter Valid Join Date",
                          type: "date",
                        },
                        {
                          name: "empDateOfBirth",
                          label: "Date of Birth",
                          placeholder: "Enter Date of Birth",
                          type: "date",
                        },
                        {
                          name: "sendingDate",
                          label: "Sending Date",
                          placeholder: "Enter Sending Date",
                          type: "date",
                        },
                        {
                          name: "sendername",
                          label: "Sender Name",
                          placeholder: "Enter Sender Name",
                        },
                      ].map(({ name, label, placeholder, type = "text" }) => (
                        <div key={name} className="flex flex-col">
                          <label
                            htmlFor={name}
                            className="mb-1 font-medium text-gray-700"
                          >
                            {label}:
                          </label>
                          <input
                            type={type}
                            id={name}
                            name={name}
                            value={detail[name]}
                            onChange={handleNameChange}
                            placeholder={placeholder}
                            className="border border-gray-300 px-4 py-2 rounded"
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={
                          JSON.stringify(detail) === JSON.stringify(replaceData)
                        }
                        onClick={() => handleInsert1("all")}
                      >
                        Insert All
                      </button>
                    </div>

                    <div className="w-full bg-white rounded-[18px] p-5 mt-[65px]">
                      <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px]">OFFER CONFIRMATION LETTER</h2>
                      <div>
                        <div
                          className="offer-preview"
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                      </div>
                    </div>

                    <div className="h-inherit flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white">
                      <h3 className="px-3 pt-3 pb-0 font-inter text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Format</h3>
                      <hr />
                      <button onClick={insertPageBreak}>
                        Insert Page Break
                      </button>
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                        placeholder="Start writing your document..."
                      />
                    </div>

                    <button
                      className="disabled:bg-blue-400 w-[70px] h-[40px] rounded-[10px] bg-[#0B56E4] text-white font-inter text-[16px] font-semibold leading-[24px] tracking-[0.005em] text-white"
                      onClick={() => saveDocumentApi()}
                    >
                      <span className="text-white">Save</span>
                    </button>
                  </>
                )}

                {currentPage === 0 && currEmp === 1 && (
                  <>
                    <div className="flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white p-3">
                      <div className="flex items-center gap-2">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640800/docSubfir_klxb0c.png" alt="" />
                        <span className="text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Offer Letter</span>
                      </div>

                      <hr />

                      <div className="doSubSs">
                        <span className="text-[#2b2b2b] text-sm font-medium leading-5 tracking-[0.0025em] text-left">Placeholders</span>
                      </div>

                      <hr />

                      <div className="flex flex-col gap-[10px]">
                        <label htmlFor="" className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em]">Select Employee</label>
                        <select
                        className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em] px-4 py-2 rounded-[5px] border border-gray-300"
                          name="SelectEmpId"
                          value={SelectEmpId}
                          onChange={(e) => setSelectEmpId(e.target.value)}
                          id=""
                        >
                          <option value="Select">Select</option>
                          {allEmp?.map((emp, index) => (
                            <option key={index} value={emp?._id}>
                              {emp.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "name", label: "Intern Name", type: "text" },
                        { name: "position", label: "Position", type: "text" },
                        { name: "workHour", label: "Work Hour", type: "time" },
                        { name: "location", label: "Location", type: "text" },
                        { name: "duration", label: "Duration", type: "text" },
                        {
                          name: "salary",
                          label: "Salary (Paid/Unpaid)",
                          type: "text",
                        },
                        {
                          name: "effective",
                          label: "Effective Date",
                          type: "text",
                        },
                        {
                          name: "experienceat",
                          label: "Experience At",
                          type: "text",
                        },
                        {
                          name: "acceptDate",
                          label: "Acceptance Date",
                          type: "date",
                        },
                        {
                          name: "startDate",
                          label: "Start Date",
                          type: "date",
                        },
                        {
                          name: "joiningDate",
                          label: "Joining Date",
                          type: "date",
                        },
                        {
                          name: "issueDate",
                          label: "Issue Date",
                          type: "date",
                        },
                      ].map(({ name, label, type }) => (
                        <div key={name} className="flex flex-col">
                          <label
                            htmlFor={name}
                            className="mb-1 font-medium text-gray-700"
                          >
                            {label}:
                          </label>
                          <input
                            id={name}
                            type={type}
                            name={name}
                            value={detail2[name]}
                            onChange={handleNameChange2}
                            placeholder={`Enter ${label}`}
                            className="border border-gray-300 px-4 py-2 rounded"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={
                          JSON.stringify(detail2) ===
                          JSON.stringify(replaceData2)
                        }
                        onClick={() => handleInsert3("all")}
                      >
                        Insert All
                      </button>
                    </div>

                    <div className="print-root">
                      <img
                        className="offer_header11 print-header"
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png"
                        alt="Header"
                      />
                      <div className="print-content">
                        <div
                          className="offer-preview"
                          dangerouslySetInnerHTML={{ __html: content4 }}
                        />
                        <div className="footer-spacer" />
                      </div>
                      <img
                        className="offer_footer11 print-footer"
                        src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png"
                        alt="Footer"
                      />
                    </div>

                    <div className="h-inherit flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white">
                      <h3 className="px-3 pt-3 pb-0 font-inter text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Format</h3>

                      <hr />
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={content4}
                        onChange={setContent4}
                        modules={modules}
                        formats={formats}
                        placeholder="Start writing your document..."
                      />
                    </div>

                    <button
                      className="disabled:bg-blue-400 w-[70px] h-[40px] rounded-[10px] bg-[#0B56E4] font-inter text-[16px] font-semibold leading-[24px] tracking-[0.005em] text-white text-white"
                      onClick={() => saveInterOfferLetter()}
                    >
                      <span>Save</span>
                    </button>
                  </>
                )}

                {currentPage === 1 && (
                  <>
                    <div className="flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white p-3">
                      <div className="flex items-center gap-2">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640800/docSubfir_klxb0c.png" alt="" />
                        <span className="text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Relieving Letter</span>
                      </div>

                      <hr />

                      <div className="doSubSs">
                        <span className="text-[#2b2b2b] text-sm font-medium leading-5 tracking-[0.0025em] text-left">Placeholders</span>
                      </div>

                      <hr />

                      <div className="flex flex-col gap-[10px]">
                        <label htmlFor="" className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em]">Select Employee</label>
                        <select
                        className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em] px-4 py-2 rounded-[5px] border border-gray-300"
                          name="SelectEmpId"
                          value={SelectEmpId}
                          onChange={(e) => setSelectEmpId(e.target.value)}
                          id=""
                        >
                          <option value="Select">Select</option>
                          {allEmp?.map((emp, index) => (
                            <option key={index} value={emp?._id}>
                              {emp.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* for inputs  */}
                    {/* <div className="docInputs">
                      <label>
                        <input
                          type="text"
                          name="name"
                          value={detail.name}
                          onChange={handleNameChange}
                          placeholder="Enter name"
                        />
                        <button className="disabled:bg-blue-400"
                        disabled={detail.name === replaceData.name}
                        onClick={() => handleInsert("name")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="address"
                          value={detail.address}
                          onChange={handleNameChange}
                          placeholder="Enter Address"
                        />
                        <button className="disabled:bg-blue-400"
                        disabled={detail.address === replaceData.address}
                        onClick={() => handleInsert("address")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="postOf"
                          value={detail.postOf}
                          onChange={handleNameChange}
                          placeholder="Enter post"
                        />
                        <button className="disabled:bg-blue-400"
                        disabled={detail.postOf === replaceData.postOf}
                        onClick={() => handleInsert("postOf")}>
                          Insert
                        </button>
                      </label>
                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: "name",
                          label: "Employee Name",
                          placeholder: "Enter name",
                        },
                        {
                          name: "address",
                          label: "Address",
                          placeholder: "Enter address",
                        },
                        {
                          name: "postOf",
                          label: "Post Of",
                          placeholder: "Enter post",
                        },
                      ].map(({ name, label, placeholder }) => (
                        <div key={name} className="flex flex-col">
                          <label
                            htmlFor={name}
                            className="mb-1 font-medium text-gray-700"
                          >
                            {label}:
                          </label>
                          <input
                            id={name}
                            type="text"
                            name={name}
                            value={reDetail[name]}
                            onChange={reHandleNameChange}
                            placeholder={placeholder}
                            className="border border-gray-300 px-4 py-2 rounded"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={
                          JSON.stringify(reDetail) ===
                          JSON.stringify(relReplaceData)
                        }
                        onClick={() => relHandleInsert1("all")}
                      >
                        Insert All
                      </button>
                    </div>

                    {/* content */}

                    <div className="w-full bg-white rounded-[18px] p-5 mt-[65px]">
                      <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px]">RELIEVING LETTER</h2>

                      <div>
                        <div
                          className="py-2 px-7"
                          dangerouslySetInnerHTML={{ __html: content2 }}
                        />
                      </div>
                    </div>

                    {/* third  */}

                    <div className="h-inherit flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white">
                      <h3 className="px-3 pt-3 pb-0 font-inter text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Format</h3>

                      <hr />

                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={content2}
                        onChange={setContent2}
                        modules={modules}
                        formats={formats}
                        placeholder="Start writing your document..."
                      />
                    </div>

                    <button
                      className="disabled:bg-blue-400 w-[70px] h-[40px] rounded-[10px] bg-[#0B56E4] font-inter text-[16px] font-semibold leading-[24px] tracking-[0.005em] text-white text-white"
                      onClick={() => saveRelivingLetter()}
                    >
                      <span>Save</span>
                    </button>
                  </>
                )}

                {currentPage === 2 && (
                  <>
                    <div className="flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white p-3">
                      <div className="flex items-center gap-2">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640800/docSubfir_klxb0c.png" alt="" />
                        <span className="text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Experience Letter</span>
                      </div>

                      <hr />

                      <div className="doSubSs">
                        <span className="text-[#2b2b2b] text-sm font-medium leading-5 tracking-[0.0025em] text-left">Placeholders</span>
                      </div>

                      <hr />

                      <div className="flex flex-col gap-[10px]">
                        <label htmlFor="" className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em]">Select Employee</label>
                        <select
                        className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em] px-4 py-2 rounded-[5px] border border-gray-300"
                          name="SelectEmpId"
                          value={SelectEmpId}
                          onChange={(e) => setSelectEmpId(e.target.value)}
                          id=""
                        >
                          <option value="Select">Select</option>
                          {allEmp?.map((emp, index) => (
                            <option key={index} value={emp?._id}>
                              {emp.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* for inputs  */}
                    {/* <div className="docInputs">
                      <label>
                        <input
                          type="text"
                          name="dear"
                          value={detail.dear}
                          onChange={handleNameChange}
                          placeholder="Enter UserName"
                        />
                        <button className="disabled:bg-blue-400"
                        disabled={detail.dear === replaceData.dear}
                        onClick={() => handleInsert2("dear")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="post"
                          value={detail.post}
                          onChange={handleNameChange}
                          placeholder="Enter post"
                        />
                        <button className="disabled:bg-blue-400"
                        disabled={detail.post === replaceData.post}
                        onClick={() => handleInsert2("post")}>
                          Insert
                        </button>
                      </label>
                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                         {
                          name: "fullName",
                          label: "Employee Full Name",
                          placeholder: "Enter Full Name",
                        },
                        {
                          name: "firstName",
                          label: "Employee First Name",
                          placeholder: "Enter Employee First Name",
                        },
                        {
                          name: "sendingDate",
                          label: "Sending Date",
                          placeholder: "Enter Sending Date",
                          type: "date",
                        },
                        {
                          name: "guardianName",
                          label: "Guardian Name",
                          placeholder: "Enter Guardian Name",
                        },
                        {
                          name: "designation",
                          label: "Designation",
                          placeholder: "Enter Designation",
                        },
                        {
                          name: "startDate",
                          label: "Joining Date",
                          placeholder: "Enter Joining Date",
                          type: "date",
                        },
                        {
                          name: "endDate",
                          label: "Complition Date",
                          placeholder: "Enter Completion Date",
                          type: "date",
                        },
                        {
                          name: "responsibility1",
                          label: "Responsibility 1",
                          placeholder: "Enter First Responsibity ",
                        },
                        {
                          name: "responsibility2",
                          label: "Responsibility 2",
                          placeholder: "Enter Second Responsibity ",
                        },
                        {
                          name: "responsibility3",
                          label: "Responsibility 3",
                          placeholder: "Enter Three Responsibity ",
                        },
                        {
                          name: "sendersName",
                          label: "Sender Name",
                          placeholder: "Enter Sender Name ",
                        },
                      ].map(({ name, label, placeholder,type }) => (
                        <div key={name} className="flex flex-col">
                          <label
                            htmlFor={name}
                            className="mb-1 font-medium text-gray-700"
                          >
                            {label}:
                          </label>
                          <input
                            id={name}
                            type={type || "text"}
                            name={name}
                            value={expDetail[name]}
                            onChange={expHandleNameChange}
                            placeholder={placeholder}
                            className="border border-gray-300 px-4 py-2 rounded"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={JSON.stringify(expDetail) === JSON.stringify(expReplaceData)}
                        onClick={() => expHandleInsert("all")}
                      >
                        Insert All
                      </button>
                    </div>

                    {/* content */}

                    <div className="w-full bg-white rounded-[18px] p-5 mt-[65px]">
                      <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px]">EXPERIENCE LETTER</h2>

                      <div>
                        <div
                          className="py-2 px-7"
                          dangerouslySetInnerHTML={{ __html: content3 }}
                        />
                      </div>
                    </div>

                    {/* third  */}

                    <div className="h-inherit flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white">
                      <h3 className="px-3 pt-3 pb-0 font-inter text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Format</h3>

                      <hr />

                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={content3}
                        onChange={setContent3}
                        modules={modules}
                        formats={formats}
                        placeholder="Start writing your document..."
                      />
                    </div>

                    <button
                      className="disabled:bg-blue-400 w-[70px] h-[40px] rounded-[10px] bg-[#0B56E4] font-inter text-[16px] font-semibold leading-[24px] tracking-[0.005em] text-white text-white"
                      onClick={() => saveExperienceLetter()}
                    >
                      <span>Save</span>
                    </button>
                  </>
                )}

                {currentPage === 3 && (
                  <>
                    <div className="flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white p-3">
                      <div className="flex items-center gap-2">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640800/docSubfir_klxb0c.png" alt="" />
                        <span className="text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">LETTER OF RECOMMENDATION</span>
                      </div>

                      <hr />

                      <div className="doSubSs">
                        <span className="text-[#2b2b2b] text-sm font-medium leading-5 tracking-[0.0025em] text-left">Placeholders</span>
                      </div>

                      <hr />

                      <div className="flex flex-col gap-[10px]">
                        <label htmlFor="" className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em]">Select Employee</label>
                        <select
                        className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em] px-4 py-2 rounded-[5px] border border-gray-300"
                          name="SelectEmpId"
                          value={SelectEmpId}
                          onChange={(e) => setSelectEmpId(e.target.value)}
                          id="">
                          <option value="Select">Select</option>
                          {allEmp?.map((emp, index) => (
                            <option key={index} value={emp?._id}>
                              {emp.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>


                    {/* content */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            name: "fullName",
                            label: "Employee Full Name",
                            placeholder: "Enter Full Name",
                          },
                          {
                            name: "firstName",
                            label: "Employee First Name",
                            placeholder: "Enter First Name",
                          },
                          {
                            name: "designation",
                            label: "Designation",
                            placeholder: "Enter Designation",
                          },
                          {
                            name: "skills",
                            label: "Employee Skills",
                            placeholder: "Enter Skills",
                          },
                          {
                            name: "sendersName",
                            label: "Senders Name",
                            placeholder: "Enter Senders Name",
                          },
                        ].map(({ name, label, placeholder }) => (
                          <div key={name} className="flex flex-col">
                            <label
                              htmlFor={name}
                              className="mb-1 font-medium text-gray-700"
                            >
                              {label}:
                            </label>
                            <input
                              id={name}
                              type= "text"
                              name={name}
                              value={lorDetail[name]}
                              onChange={handleLORNameChange}
                              placeholder={placeholder}
                              className="border border-gray-300 px-4 py-2 rounded"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <button
                          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                          disabled={
                            JSON.stringify(lorDetail) ===
                            JSON.stringify(lorReplaceData)
                          }
                          onClick={() => handleInsert2("all")}
                        >
                          Insert All
                        </button>
                      </div>

                    <div className="w-full bg-white rounded-[18px] p-5 mt-[65px]">
                      <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px]">LETTER OF RECOMMENDATION</h2>

                      <div>
                        <div
                          className="py-2 px-7"
                          dangerouslySetInnerHTML={{ __html: content5 }}
                        />
                      </div>
                    </div>

                    

                    {/* third  */}

                    <div className="h-inherit flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white">
                      <h3 className="px-3 pt-3 pb-0 font-inter text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Format</h3>

                      <hr />

                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={content5}
                        onChange={setContent5}
                        modules={modules}
                        formats={formats}
                        placeholder="Start writing your document..."
                      />
                    </div>

                    <button
                      className="disabled:bg-blue-400 w-[70px] h-[40px] rounded-[10px] bg-[#0B56E4] font-inter text-[16px] font-semibold leading-[24px] tracking-[0.005em] text-white text-white"
                      onClick={() => saveLORLetter()}
                    >
                      <span>Save</span>
                    </button>
                  </>
                )}

                {selectedEmpType === "Intern Employee" &&
                  currentPage === completionLetterIndex && (
                    <>
                      <div className="flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white p-3">
                        <div className="flex items-center gap-2">
                          <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640800/docSubfir_klxb0c.png" alt="" />
                          <span className="text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">CERTIFICATE OF COMPLETION</span>
                        </div>

                        <hr />

                        <div className="doSubSs">
                          <span className="text-[#2b2b2b] text-sm font-medium leading-5 tracking-[0.0025em] text-left">Placeholders</span>
                        </div>

                        <hr />

                        <div className="flex flex-col gap-[10px]">
                          <label htmlFor="" className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em]">Select Employee</label>
                          <select
                          className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em] px-4 py-2 rounded-[5px] border border-gray-300"
                            name="SelectEmpId"
                            value={SelectEmpId}
                            onChange={(e) => setSelectEmpId(e.target.value)}
                            id=""
                          >
                            <option value="Select">Select</option>
                            {allEmp?.map((emp, index) => (
                              <option key={index} value={emp?._id}>
                                {emp.fullName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            name: "date",
                            label: "Sending Date",
                            placeholder: "Date",
                            type: "date",
                          },
                          {
                            name: "fullName",
                            label: "Full Name",
                            placeholder: "Enter Your Full Name",
                          },
                          {
                            name: "startDate",
                            label: "Joining Date",
                            placeholder: "Enter Joining Date",
                            type: "date",
                          },
                          {
                            name: "endDate",
                            label: "Completion Date",
                            placeholder: "Enter Completion Date",
                            type: "date",
                          },
                          {
                            name: "sendersName",
                            label: "Sender Name",
                            placeholder: "Sender Name",
                          },
                        ].map(({ name, label, placeholder, type }) => (
                          <div key={name} className="flex flex-col">
                            <label
                              htmlFor={name}
                              className="mb-1 font-medium text-gray-700"
                            >
                              {label}:
                            </label>
                            <input
                              id={name}
                              type={type || "text"}
                              name={name}
                              value={detail3[name]}
                              onChange={handleDetail3Change}
                              placeholder={placeholder}
                              className="border border-gray-300 px-4 py-2 rounded"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <button
                          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                          disabled={
                            JSON.stringify(detail3) ===
                            JSON.stringify(replaceData3)
                          }
                          onClick={() => handleInsert4("all")}
                        >
                          Insert All
                        </button>
                      </div>

                      {/* content */}

                      <div className="w-full bg-white rounded-[18px] p-5 mt-[65px]">
                        <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px]">CERTIFICATE OF COMPLETION</h2>

                        <div>
                          <div
                            className="py-2 px-7"
                            dangerouslySetInnerHTML={{ __html: content6 }}
                          />
                        </div>
                      </div>

                      {/* third  */}

                      <div className="h-inherit flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white">
                        <h3 className="px-3 pt-3 pb-0 font-inter text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Format</h3>

                        <hr />

                        <ReactQuill
                          ref={quillRef}
                          theme="snow"
                          value={content6}
                          onChange={setContent6}
                          modules={modules}
                          formats={formats}
                          placeholder="Start writing your document..."
                        />
                      </div>

                      <button
                        className="disabled:bg-blue-400 w-[70px] h-[40px] rounded-[10px] bg-[#0B56E4] font-inter text-[16px] font-semibold leading-[24px] tracking-[0.005em] text-white text-white"
                        onClick={() => saveLetter2()}
                      >
                        <span>Save</span>
                      </button>
                    </>
                  )}

                {currentPage === 0 && currEmp === 2 && (
                  <>
                    <div className="flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white p-3">
                      <div className="flex items-center gap-2">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640800/docSubfir_klxb0c.png" alt="" />
                        <span className="text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Offer Letter</span>
                      </div>

                      <hr />

                      <div className="doSubSs">
                        <span className="text-[#2b2b2b] text-sm font-medium leading-5 tracking-[0.0025em] text-left">Placeholders</span>
                      </div>

                      <hr />

                      <div className="flex flex-col gap-[10px]">
                        <label htmlFor="" className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em]">Select Employee</label>
                        <select
                        className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em] px-4 py-2 rounded-[5px] border border-gray-300"
                          name="SelectEmpId"
                          value={SelectEmpId}
                          onChange={(e) => setSelectEmpId(e.target.value)}
                          id=""
                        >
                          <option value="Select">Select</option>
                          {allEmp?.map((emp, index) => (
                            <option key={index} value={emp?._id}>
                              {emp.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* for inputs  */}
                    {/* <div className="docInputs">
                      <label>
                        <input
                          type="text"
                          name="name"
                          value={detail4.name}
                          onChange={handleNameChange4}
                          placeholder="Enter Employee Name"
                        />
                        <button className="disabled:bg-blue-400"
                        disabled={detail4.name === replaceData4.name}
                        onClick={() => handleInsert5("name")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="position"
                          value={detail4.position}
                          onChange={handleNameChange4}
                          placeholder="Enter Position"
                        />
                        <button className="disabled:bg-blue-400"
                         disabled={detail4.position === replaceData4.position}
                        onClick={() => handleInsert5("position")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="compensation"
                          value={detail4.compensation}
                          onChange={handleNameChange4}
                          placeholder="Enter compensation"
                        />
                        <button className="disabled:bg-blue-400"
                            disabled={detail4.compensation === replaceData4.compensation}
                        onClick={() => handleInsert5("compensation")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="annualIncome"
                          value={detail4.annualIncome}
                          onChange={handleNameChange4}
                          placeholder="Enter annual Income "
                        />
                        <button className="disabled:bg-blue-400"
                          disabled={detail4.annualIncome === replaceData4.annualIncome}
                        onClick={() => handleInsert5("annualIncome")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="designation"
                          value={detail4.designation}
                          onChange={handleNameChange4}
                          placeholder="Enter designation"
                        />
                        <button className="disabled:bg-blue-400"
                          disabled={detail4.designation === replaceData4.designation}
                        onClick={() => handleInsert5("designation")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="location"
                          value={detail4.location}
                          onChange={handleNameChange4}
                          placeholder="Enter location"
                        />
                        <button className="disabled:bg-blue-400"
                        disabled={detail4.location === replaceData4.location}
                        onClick={() => handleInsert5("location")}>
                          Insert
                        </button>
                      </label>


                      <label>
                        <div className="joindatewrap">
                          <input
                            type="date"
                            name="joiningDate"
                            value={detail4.joiningDate}
                            onChange={handleNameChange4}
                            placeholder="Enter joining Date"
                          />

                          <p>Joining Date</p>
                        </div>

                        <button className="disabled:bg-blue-400"
                         disabled={detail4.joiningDate === replaceData4.joiningDate}
                        onClick={() => handleInsert5("joiningDate")}>
                          Insert
                        </button>
                      </label>


                      <label>
                        <input
                          type="text"
                          name="leave"
                          value={detail4.leave}
                          onChange={handleNameChange4}
                          placeholder="Enter Leave Allocated"
                        />
                        <button className="disabled:bg-blue-400"
                           disabled={detail4.leave === replaceData4.leave}
                        onClick={() => handleInsert5("leave")}>
                          Insert
                        </button>
                      </label>


                      <label>
                        <input
                          type="text"
                          name="returningDate"
                          value={detail4.returningDate}
                          onChange={handleNameChange4}
                          placeholder="Offer Letter Returning Date"
                        />
                        <button className="disabled:bg-blue-400"
                          disabled={detail4.returningDate === replaceData4.returningDate}
                        onClick={() => handleInsert5("returningDate")}>
                          Insert
                        </button>
                      </label>
      

                      <label>
                        <div className="joindatewrap">
                          <input
                            type="date"
                            name="empDateOfBirth"
                            value={detail4.empDateOfBirth}
                            onChange={handleNameChange4}
                            placeholder="Enter Employee Date of Birth"
                          />

                          <p>DOB</p>
                        </div>

                        <button className="disabled:bg-blue-400"
                         disabled={detail4.empDateOfBirth === replaceData4.empDateOfBirth}
                        onClick={() => handleInsert5("empDateOfBirth")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <div className="joindatewrap">
                          <input
                            type="date"
                            name="sendingDate"
                            value={detail4.sendingDate}
                            onChange={handleNameChange4}
                          />

                          <p>Sending Date</p>
                        </div>

                        <button className="disabled:bg-blue-400"
                            disabled={detail4.sendingDate === replaceData4.sendingDate}
                        onClick={() => handleInsert5("sendingDate")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <div className="joindatewrap">
                          <input
                            type="text"
                            name="introduction"
                            value={detail4.introduction}
                            onChange={handleNameChange4}
                            placeholder="After reviewing your skills and experience, we are confident that your expertise aligns with our company's goals to deliver exceptional digital marketing services."
                          />

                          <p>Introduction</p>
                        </div>

                        <button className="disabled:bg-blue-400"
                            disabled={detail4.introduction === replaceData4.introduction}
                        onClick={() => handleInsert5("introduction")}>
                          Insert
                        </button>
                      </label>
                      <label>
                        <div className="joindatewrap">
                          <input
                            type="text"
                            name="workscope"
                            value={detail4.workscope}
                            onChange={handleNameChange4}
                          />

                          <p>Work Scope</p>
                        </div>

                        <button className="disabled:bg-blue-400"
                             disabled={detail4.workscope === replaceData4.workscope}
                        onClick={() => handleInsert5("workscope")}>
                          Insert
                        </button>
                      </label>
                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "name", label: "Employee Name", type: "text" },
                        // { name: "dear", label: "Dear", type: "text" },
                        { name: "position", label: "Position", type: "text" },
                        {
                          name: "compensation",
                          label: "Compensation",
                          type: "text",
                        },
                        {
                          name: "joiningDate",
                          label: "Joining Date",
                          type: "date",
                        },
                        {
                          name: "employeeType",
                          label: "Employee Type",
                          type: "text",
                        },
                        {
                          name: "workingHour",
                          label: "Working Hour",
                          type: "text",
                        },
                        {
                          name: "workingDays",
                          label: "Working Days",
                          type: "text",
                        },
                        {
                          name: "returningDate",
                          label: "Returning Date",
                          type: "text",
                        },
                        {
                          name: "returningDay",
                          label: "Returning Day",
                          type: "text",
                        },
                        {
                          name: "validJoin",
                          label: "Valid Join",
                          type: "text",
                        },
                        {
                          name: "empDateOfBirth",
                          label: "Date of Birth",
                          type: "date",
                        },
                        {
                          name: "sendingDate",
                          label: "Sending Date",
                          type: "date",
                        },
                        {
                          name: "sendername",
                          label: "Sender Name",
                          type: "text",
                        },
                        {
                          name: "workscope",
                          label: "Work Scope",
                          type: "text",
                        },
                        {
                          name: "introduction",
                          label: "Introduction",
                          type: "text",
                        },
                        {
                          name: "annualIncome",
                          label: "Annual Income",
                          type: "text",
                        },
                        {
                          name: "designation",
                          label: "Designation",
                          type: "text",
                        },
                        { name: "location", label: "Location", type: "text" },
                        {
                          name: "leave",
                          label: "Leave Allocated",
                          type: "text",
                        },
                      ].map(({ name, label, type }) => (
                        <div key={name} className="flex flex-col">
                          <label
                            htmlFor={name}
                            className="mb-1 font-medium text-gray-700"
                          >
                            {label}:
                          </label>
                          <input
                            id={name}
                            type={type}
                            name={name}
                            value={detail4[name]}
                            onChange={handleNameChange4}
                            placeholder={`Enter ${label}`}
                            className="border border-gray-300 px-4 py-2 rounded"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={
                          JSON.stringify(detail4) ===
                          JSON.stringify(replaceData4)
                        }
                        onClick={() => handleInsert5("all")}
                      >
                        Insert All
                      </button>
                    </div>

                    {/* content */}

                    <div className="w-full bg-white rounded-[18px] p-5 mt-[65px]">
                      <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px]">OFFER CONFIRMATION LETTER</h2>

                      <div>
                        <div
                          className="py-2 px-7"
                          dangerouslySetInnerHTML={{ __html: content7 }}
                        />
                      </div>
                    </div>

                    {/* third  */}

                    <div className="h-inherit flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white">
                      <h3 className="px-3 pt-3 pb-0 font-inter text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Format</h3>

                      <hr />
                      <button onClick={insertPageBreak}>
                        Insert Page Break
                      </button>

                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={content7}
                        onChange={setContent7}
                        modules={modules}
                        formats={formats}
                        placeholder="Start writing your document..."
                      />
                    </div>

                    <button
                      className="disabled:bg-blue-400 w-[70px] h-[40px] rounded-[10px] bg-[#0B56E4] font-inter text-[16px] font-semibold leading-[24px] tracking-[0.005em] text-white text-white"
                      onClick={() => freelencerOffterLetter()}
                    >
                      <span>Save</span>
                    </button>
                  </>
                )}

                {currentPage === 0 && currEmp === 3 && (
                  <>
                    <div className="flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white p-3">
                      <div className="flex items-center gap-2">
                        <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1747640800/docSubfir_klxb0c.png" alt="" />
                        <span className="text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Offer Letter</span>
                      </div>

                      <hr />

                      <div className="doSubSs">
                        <span className="text-[#2b2b2b] text-sm font-medium leading-5 tracking-[0.0025em] text-left">Placeholders</span>
                      </div>

                      <hr />

                      <div className="flex flex-col gap-[10px]">
                        <label htmlFor="" className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em]">Select Employee</label>
                        <select
                        className="text-[#1B2533] text-[15px] font-medium leading-5 tracking-[0.0025em] px-4 py-2 rounded-[5px] border border-gray-300"
                          name="SelectEmpId"
                          value={SelectEmpId}
                          onChange={(e) => setSelectEmpId(e.target.value)}
                          id=""
                        >
                          <option value="Select">Select</option>
                          {allEmp?.map((emp, index) => (
                            <option key={index} value={emp?._id}>
                              {emp.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* for inputs  */}
                    {/* <div className="docInputs">
                      <label>
                        <input
                          type="text"
                          name="name"
                          value={detail5.name}
                          onChange={handleNameChange5}
                          placeholder="Enter Employee Name"
                        />
                        <button className="disabled:bg-blue-400"
                           disabled={detail5.name === replaceData5.name}
                        onClick={() => handleInsert6("name")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="position"
                          value={detail5.position}
                          onChange={handleNameChange5}
                          placeholder="Enter Position"
                        />
                        <button className="disabled:bg-blue-400" 
                            disabled={detail5.position === replaceData5.position}
                        onClick={() => handleInsert6("position")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="compensation"
                          value={detail5.compensation}
                          onChange={handleNameChange5}
                          placeholder="Enter compensation"
                        />
                        <button className="disabled:bg-blue-400" 
                         disabled={detail5.compensation === replaceData5.compensation}
                        onClick={() => handleInsert6("compensation")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="annualIncome"
                          value={detail5.annualIncome}
                          onChange={handleNameChange5}
                          placeholder="Enter annual Income"
                        />
                        <button className="disabled:bg-blue-400" 
                         disabled={detail5.annualIncome === replaceData5.annualIncome}
                        onClick={() => handleInsert6("annualIncome")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="designation"
                          value={detail5.designation}
                          onChange={handleNameChange5}
                          placeholder="Enter designation"
                        />
                        <button className="disabled:bg-blue-400"
                            disabled={detail5.designation === replaceData5.designation}
                        onClick={() => handleInsert6("designation")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <input
                          type="text"
                          name="location"
                          value={detail5.location}
                          onChange={handleNameChange5}
                          placeholder="Enter location"
                        />
                        <button className="disabled:bg-blue-400"
                        disabled={detail5.location === replaceData5.location}
                        onClick={() => handleInsert6("location")}>
                          Insert
                        </button>
                      </label>


                      <label>
                        <div className="joindatewrap">
                          <input
                            type="date"
                            name="joiningDate"
                            value={detail5.joiningDate}
                            onChange={handleNameChange5}
                            placeholder="Enter joining Date"
                          />

                          <p>Joining Date</p>
                        </div>

                        <button className="disabled:bg-blue-400"
                           disabled={detail5.joiningDate === replaceData5.joiningDate}
                        onClick={() => handleInsert6("joiningDate")}>
                          Insert
                        </button>
                      </label>


                      <label>
                        <input
                          type="text"
                          name="leave"
                          value={detail5.leave}
                          onChange={handleNameChange5}
                          placeholder="Enter Leave Allocated"
                        />
                        <button className="disabled:bg-blue-400"
                            disabled={detail5.leave === replaceData5.leave}
                        onClick={() => handleInsert6("leave")}>
                          Insert
                        </button>
                      </label>


                      <label>
                        <input
                          type="text"
                          name="returningDate"
                          value={detail5.returningDate}
                          onChange={handleNameChange5}
                          placeholder="Offer Letter Returning Date"
                        />
                        <button className="disabled:bg-blue-400" 
                           disabled={detail5.returningDate === replaceData5.returningDate}
                        onClick={() => handleInsert6("returningDate")}>
                          Insert
                        </button>
                      </label>
      

                      <label>
                        <div className="joindatewrap">
                          <input
                            type="date"
                            name="empDateOfBirth"
                            value={detail5.empDateOfBirth}
                            onChange={handleNameChange5}
                            placeholder="Enter Employee Date of Birth"
                          />

                          <p>DOB</p>
                        </div>

                        <button className="disabled:bg-blue-400"
                          disabled={detail5.empDateOfBirth === replaceData5.empDateOfBirth}
                        onClick={() => handleInsert6("empDateOfBirth")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <div className="joindatewrap">
                          <input
                            type="date"
                            name="sendingDate"
                            value={detail5.sendingDate}
                            onChange={handleNameChange5}
                          />

                          <p>Sending Date</p>
                        </div>

                        <button className="disabled:bg-blue-400" 
                         disabled={detail5.sendingDate === replaceData5.sendingDate}
                        onClick={() => handleInsert6("sendingDate")}>
                          Insert
                        </button>
                      </label>

                      <label>
                        <div className="joindatewrap">
                          <input
                            type="text"
                            name="introduction"
                            value={detail5.introduction}
                            onChange={handleNameChange5}
                            placeholder="After reviewing your skills and experience, we are confident that your expertise aligns with our company's goals to deliver exceptional digital marketing services."
                          />

                          <p>Introduction</p>
                        </div>

                        <button className="disabled:bg-blue-400"
                          disabled={detail5.introduction === replaceData5.introduction}
                        onClick={() => handleInsert6("introduction")}>
                          Insert
                        </button>
                      </label>
                      <label>
                        <div className="joindatewrap">
                          <input
                            type="number"
                            name="workingDays"
                            value={detail5.workingDays}
                            onChange={handleNameChange5}
                          />

                          <p>working Days</p>
                        </div>

                        <button className="disabled:bg-blue-400"
                          disabled={detail5.workingDays === replaceData5.workingDays}
                        onClick={() => handleInsert6("workingDays")}>
                          Insert
                        </button>
                      </label>
                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "name", label: "Employee Name", type: "text" },
                        // { name: "dear", label: "Dear", type: "text" },
                        { name: "position", label: "Position", type: "text" },
                        {
                          name: "compensation",
                          label: "Compensation",
                          type: "text",
                        },
                        {
                          name: "joiningDate",
                          label: "Joining Date",
                          type: "date",
                        },
                        {
                          name: "employeeType",
                          label: "Employee Type",
                          type: "text",
                        },
                        {
                          name: "workingHour",
                          label: "Working Hour",
                          type: "text",
                        },
                        {
                          name: "workingDays",
                          label: "Working Days",
                          type: "number",
                        },
                        {
                          name: "returningDate",
                          label: "Returning Date",
                          type: "text",
                        },
                        {
                          name: "returningDay",
                          label: "Returning Day",
                          type: "text",
                        },
                        {
                          name: "validJoin",
                          label: "Valid Join",
                          type: "text",
                        },
                        {
                          name: "empDateOfBirth",
                          label: "Date of Birth",
                          type: "date",
                        },
                        {
                          name: "sendingDate",
                          label: "Sending Date",
                          type: "date",
                        },
                        {
                          name: "sendername",
                          label: "Sender Name",
                          type: "text",
                        },
                        {
                          name: "workscope",
                          label: "Work Scope",
                          type: "text",
                        },
                        {
                          name: "introduction",
                          label: "Introduction",
                          type: "text",
                        },
                        {
                          name: "annualIncome",
                          label: "Annual Income",
                          type: "text",
                        },
                        {
                          name: "designation",
                          label: "Designation",
                          type: "text",
                        },
                        { name: "location", label: "Location", type: "text" },
                        {
                          name: "leave",
                          label: "Leave Allocated",
                          type: "text",
                        },
                      ].map(({ name, label, type }) => (
                        <div key={name} className="flex flex-col">
                          <label
                            htmlFor={name}
                            className="mb-1 font-medium text-gray-700"
                          >
                            {label}:
                          </label>
                          <input
                            id={name}
                            type={type}
                            name={name}
                            value={detail5[name]}
                            onChange={handleNameChange5}
                            placeholder={`Enter ${label}`}
                            className="border border-gray-300 px-4 py-2 rounded"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={
                          JSON.stringify(detail5) ===
                          JSON.stringify(replaceData5)
                        }
                        onClick={() => handleInsert6("all")}
                      >
                        Insert All
                      </button>
                    </div>

                    {/* content */}

                    <div className="w-full bg-white rounded-[18px] p-5 mt-[65px]">
                      <h2 className="text-[#101820] text-[24px] font-semibold leading-[32px]">OFFER CONFIRMATION LETTER</h2>

                      <div>
                        <div
                          className="py-2 px-7"
                          dangerouslySetInnerHTML={{ __html: content8 }}
                        />
                      </div>
                    </div>

                    {/* third  */}

                    <div className="h-inherit flex flex-col gap-3 border border-[#e8e9eb] rounded-[12px] bg-white">
                      <h3 className="px-3 pt-3 pb-0 font-inter text-[#1b2533] text-base font-semibold leading-6 tracking-[0.0015em] text-left">Format</h3>

                      <hr />

                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={content8}
                        onChange={setContent8}
                        modules={modules}
                        formats={formats}
                        placeholder="Start writing your document..."
                      />
                    </div>

                    <button
                      className="disabled:bg-blue-400 w-[70px] h-[40px] rounded-[10px] bg-[#0B56E4] font-inter text-[16px] font-semibold leading-[24px] tracking-[0.005em] text-white text-white"
                      onClick={() => partTimeOffterLetter()}
                    >
                      <span>Save</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DocumentManagement;