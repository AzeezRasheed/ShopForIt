import React from "react";
import Stack from "../../components/Stack/Stack";
import Typography from "../../components/Typography/Typography";
import SuccessImage from "../../assets/Success.png";

const Success = () => {
  return (
    <Stack alignItems="center" className={"mt-10 gap-[4rem] px-4 "}>
      <div className="flex flex-col text-center items-center m-auto   ">
        <div className="w-[121px] h-[121px] mb-6">
          <img src={SuccessImage} alt="success" className="w-full h-full" />
        </div>

        <h2 className=" text-[#000] text-[36px] font-OpenSans font-[600] mb-4    ">
          Thank you for shopping with us!
        </h2>
        <Stack
          alignItems="start"
          className={" text-start border-y border-y-[#645f5f] py-5  mb-6"}
        >
          <h2 className=" text-[#000] text-[16px] font-OpenSans font-normal text-start w-full max-w-[644px]   ">
            Your order is confirmed Thanks for ordering from shopforit, the
            customer service will call you to confirm order info within 1-24
            hours, please keep your phone open . You will receive an email with
            tracking number once your order is ready to be couriered. Your order
            will be delivered in 3-5 business day. Kindly wait for it!
          </h2>
        </Stack>

        <Stack
          direction="column"
          className="gap-4 py-12 border-b border-[#645f5f]"
        >
          <InformationRow
            label="Customer information"
            value="divinex2y@gmail.com"
          />
          <InformationRow
            label="Shipping address"
            value="Lagos Alimosho 10 ajoke council"
          />
          <InformationRow label="Shipping Rate" value="Shipping Rate" />
          <InformationRow label="Payment method" value="Test" />
        </Stack>
      </div>
    </Stack>
  );
};

const InformationRow = ({ label, value }) => (
  <div className="w-full flex gap-6 items-start text-start max-w-[450px]">
    <Typography className="text-[16px] text-[#000] font-[400] w-[170px] font-Poppins">
      {label}
    </Typography>
    <Typography className="text-[16px] text-[#000] font-[400] font-Poppins">
      {value}
    </Typography>
  </div>
);

export default Success;
