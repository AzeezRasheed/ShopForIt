import React from "react";
import Modal from "./Modal";
import { useRef } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import tw from "twin.macro";

const InputWrapper = styled.div`
  ${tw`
  mb-3 md:mb-6 mt-2 lg:mt-0
`}
`;

const Input = styled.input`
  ${tw`
  
  block
  w-full
  px-3
  py-4
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
`}
`;

const TextArea = styled.textarea`
  ${tw`
  block
  w-full
  px-3
  py-6
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
`}
`;

const Button = styled.button`
  ${tw`
font-inter
w-full
px-6
py-4
bg-[#041706]
text-white
lg:text-[24px]
text-[18px]
leading-[32px]
capitalize
font-normal
rounded
shadow-md
 hover:shadow-lg
focus:bg-blue-400
focus:shadow-lg
focus:outline-none
focus:ring-0
active:bg-blue-300
active:shadow-lg
transition
duration-150
ease-in-out
`}
`;
function ModalContactUs(props) {
  const { open, setOpen } = props;
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        // "service_p102o41",
        // "template_4idm26d",
        // form.current,
        // "Zi06-R-MsyzuIaHca"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    toast.success("Message Sent Successfully");
    e.target.reset();
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Contact Us"  >
      <div className="flex flex-col  justify-center m-auto w-full  ">
        <div className="block px-2 lg:p-10 md:p-10 md:w-[768px] m-auto  w-[350px] ">
          <form ref={form} onSubmit={sendEmail}>
            <InputWrapper>
              <Input
                type="text"
                className=""
                name="firstName"
                required
                placeholder="Your First Name"
              />
            </InputWrapper>

            <InputWrapper>
              <Input
                type="text"
                name="lastName"
                required
                placeholder="Your Last Name"
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                type="email"
                placeholder="Your Email"
                name="email"
                required
              />
            </InputWrapper>

            <div className="flex justify-between items-center mb-6">
              <TextArea name="message" rows="7" placeholder="Your Message" />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default ModalContactUs;
