import React, { useRef } from "react";
import Button from "./Button/Button";
import Typography from "./Typography/Typography";

const ConfirmDelete = ({ isModalOpen, closeModal, handleDelete }) => {
  const modalRef = useRef(null);

  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       closeModal();
  //     }
  //   };

  //   useEffect(() => {
  //     if (isModalOpen) {
  //       document.addEventListener("click", handleClickOutside);
  //     }

  //     return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   }, [isModalOpen, closeModal, handleClickOutside]);

  return (
    <div className=" fixed left-0 bg-opacity-50 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div ref={modalRef} className="min-[576px] mx-auto mt-7 max-w-[800px]">
        <div className="relative flex flex-col items-center rounded-md border-none bg-[#E5EFE5] bg-clip-padding text-current shadow-lg outline-none">
          <div className="flex flex-col items-center text-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <h5>
              Are you sure you would like to remove this item from the shopping
              cart?
            </h5>
            <div className="flex flex-wrap gap-7 items-center mt-4">
              <Button ripple onClick={handleDelete} className="w-full">
                <div
                  className={`py-2 px-2 w-full  bg-[${"#033514"}]  rounded-[5px] items-center text-center`}
                >
                  <Typography variant={"white"} size="buttons">
                    Accept
                  </Typography>
                </div>
              </Button>
              <Button ripple onClick={closeModal} className="w-full">
                <div
                  className={`py-2 px-2 w-full  bg-[${"#033514"}]  rounded-[5px] items-center text-center`}
                >
                  <Typography variant={"white"} size="buttons">
                    Cancel
                  </Typography>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
