import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";

const ErrorModal = forwardRef(function ErrorModal(props, ref) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      showModal() {
        dialog?.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      <h1 className="mb-4 text-stone-500">Please ensure all fields are populated</h1>
      <form method="dialog" className="text-right">
        <button className="rounded-md bg-stone-700 px-8 py-2 text-xs text-stone-400 hover:bg-stone-600 hover:text-stone-100 md:text-base mt-6">
          OK
        </button>
      </form>
    </dialog>,
    document.body,
  );
});

export default ErrorModal;