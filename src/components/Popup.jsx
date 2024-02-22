import React, { useEffect, useRef } from "react";

const Modal = ({ onClose, isOpen, title, children, cancelIcon, onAccept }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose, handleClickOutside]);

  return (
    <div>
      {isOpen && (
        <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-opacity-30 bg-[#fff]">
          <div
            ref={modalRef}
            className="min-[576px] mx-auto mt-7 max-w-[500px]"
          >
            <div className="relative flex flex-col items-center rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
              <div className="flex items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                {title && (
                  <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                    {title}
                  </h5>
                )}
                {cancelIcon && (
                  <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {children}

              <div className="flex flex-wrap gap-2 items-center justify-center opacity-100 p-4">
                <button
                  type="button"
                  style={{
                    padding: "3px 11px 3px 8px",
                    justifyContent: "center",
                    display: "flex",
                    borderRadius: "3px",
                    border: "1px solid #9F9F9F",
                    background: "#DEDEDE",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  style={{
                    padding: "3px 8px 3px 6px",
                    justifyContent: "center",
                    display: "flex",
                    borderRadius: "3px",
                    background: "#079627",
                    fontSize: "10px",
                    fontWeight: "500",
                  }}
                  onClick={onAccept}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
