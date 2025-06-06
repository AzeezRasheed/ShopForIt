import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal(props) {
  const { open, setOpen, title, size } = props;

  const cancelButtonRef = useRef(null);

  const getSizeClasses = (size) => {
    let utilities = "";
    switch (size) {
      case "xs":
        utilities = "h-fit sm:max-w-md rounded-lg";
        break;
      case "lg":
        utilities =
          "h-5/6 max-h-[52rem] sm:max-w-6xl rounded-md rounded-l-none";
        break;
      default:
        utilities = "h-4/5 sm:max-w-screen-md rounded-lg";
        break;
    }

    return utilities;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 flex items-center justify-center inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Dialog.Overlay className="fixed inset-0 bg-neutral-800 bg-opacity-95 transition-opacity" />

        <div
          href="#"
          className={`absolute right-6 top-4 text-white text-2xl`}
          onClick={() => setOpen(false)}
        >
          <AiOutlineClose icon={"x"} />
        </div>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0 sm:scale-150"
          enterTo="opacity-100 sm:scale-100"
        >
          <div
            className={`flex items-center justify-center bg-white overflow-hidden shadow-xl transform transition-all align-middle sm:w-full ${
              title ? "pt-10" : ""
            } ${getSizeClasses(size)}`}
          >
            {title && (
              <div className="absolute top-0 w-full text-center border-b py-2 font-semibold">
                <Dialog.Title className="inline-block">{title}</Dialog.Title>
              </div>
            )}
            <div className="w-full h-full">{props.children}</div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
