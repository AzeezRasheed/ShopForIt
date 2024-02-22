import React from "react";
import Stack from "../../components/Stack/Stack";
import ContactUsForm from "../../components/ContactUsForm";
import { HiLocationMarker } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

const ContactUs = () => {
  return (
    <Stack alignItems="center" className={"mt-10 gap-[4rem] px-4 "}>
      <div className="flex flex-col text-center ">
        <h2 className=" text-[#000] text-[36px] font-OpenSans font-[600] mb-4    ">
          Get In Touch With Us
        </h2>
        <h2 className=" text-[#9F9F9F] text-[16px] font-OpenSans font-normal w-full max-w-[644px]   ">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!{" "}
        </h2>
      </div>

      <Stack
        direction="row"
        alignItems="start"
        className={"gap-10  lg:justify-between  flex-wrap m-auto max-w-[900px] "}
        justifyContent="center"
      >
        {/* Left */}

        <div className="flex flex-col gap-[3rem] items-start">
          {/* Location */}
          <Stack alignItems="start" direction="row" className={"gap-5"}>
            <span>
              <HiLocationMarker size={30} />
            </span>
            <Stack alignItems="start" className={"gap-1"}>
              <h2 className=" text-[#222] text-[24px] font-OpenSans font-[500]   ">
                Address
              </h2>
              <h2 className="w-full max-w-[212px] text-[#222] text-[16px] font-OpenSans font-normal   ">
                Gods Own Plaza No 4 Ibeh Road okota isolo Lagos, Nigeria.
              </h2>
            </Stack>
          </Stack>

          {/* Phone */}
          <Stack alignItems="start" direction="row" className={"gap-5"}>
            <span>
              <FaPhoneAlt size={30} />
            </span>
            <Stack alignItems="start" className={"gap-1"}>
              <h2 className=" text-[#222] text-[24px] font-OpenSans font-[500]   ">
                Phone
              </h2>
              <div className="flex flex-col gap-1">
                <h2 className="w-full max-w-[212px] text-[#222] text-[16px] font-OpenSans font-normal   ">
                  Mobile: +(234) 8179-7323-92
                </h2>
                <h2 className="w-full max-w-[212px] text-[#222] text-[16px] font-OpenSans font-normal   ">
                  Mobile: +(234) 8179-7323-92
                </h2>
              </div>
            </Stack>
          </Stack>

          {/* Clock/ Working Time */}
          <Stack alignItems="start" direction="row" className={"gap-5"}>
            <span>
              <FaClock size={30} />
            </span>
            <Stack alignItems="start" className={"gap-1"}>
              <h2 className=" text-[#222] text-[24px] font-OpenSans font-[500]   ">
                Working Time
              </h2>
              <div className="flex flex-col gap-1">
                <h2 className=" text-[#222] text-[16px] font-OpenSans font-normal   ">
                  Monday-Friday: 9:00 - 18:00
                </h2>
                <h2 className=" text-[#222] text-[16px] font-OpenSans font-normal   ">
                  Saturday-Sunday: 9:00 - 16:00
                </h2>
              </div>
            </Stack>
          </Stack>
        </div>
        <ContactUsForm />
      </Stack>
    </Stack>
  );
};

export default ContactUs;
