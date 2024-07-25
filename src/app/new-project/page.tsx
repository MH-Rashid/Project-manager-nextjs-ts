"use client"

import { useRouter } from "next/navigation";

import { LegacyRef, useRef } from "react";
import { FormEvent } from "react";

import ErrorModal from "../../components/ErrorModal";

const InputForm: React.FC<{ onCancel: () => void, onAddProject: (data: {}) => void }> = (props) => {
  const router = useRouter();

  // const title = useRef<HTMLInputElement | LegacyRef<any>>();
  // const description = useRef<HTMLInputElement>();
  // const dueDate = useRef<HTMLInputElement>();
  
  const dialog = useRef<HTMLDialogElement>();

  const handleCancel = () => {
    router.push('/');
  };
  
  function handleSubmit(event: any) {
    event.preventDefault();

    // const enteredTitle = title?.current?.value;
    // const enteredDescription = description?.current?.value;
    // const enteredDate: any = dueDate?.current?.value;

    const fd = new FormData(event.target);
    const data: any = Object.fromEntries(fd.entries());

    // if (
    //   enteredTitle?.trim() === "" ||
    //   enteredDescription?.trim() === "" ||
    //   enteredDate?.trim() === ""
    // ) {
    //   dialog?.current?.showModal();
    //   return;
    // }
    
    if (
      data.title?.trim() === "" ||
      data.description?.trim() === "" ||
      data.dueDate?.trim() === ""
    ) {
      dialog?.current?.showModal();
      return;
    }

    const projectData = {
      id: Math.random().toString(),
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
    };

    // props.onAddProject(projectData);
    router.push('/')
  }

  return (
    <>
      <ErrorModal ref={dialog} />
      <form onSubmit={handleSubmit} className="mt-32 mx-auto w-[45rem]">
        <div>
          <h1 className="text-xl font-normal uppercase mb-8 text-stone-500">New Project</h1>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-base font-bold uppercase text-stone-500" htmlFor="title">
              Title
            </label>
            <input
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              type="text"
              id="title"
              name="title"
              // ref={title}
            />
          </p>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-base font-bold uppercase text-stone-500" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              id="description"
              name="description"
              // ref={description}
            />
          </p>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-base font-bold uppercase text-stone-500" htmlFor="dueDate">
              Due date
            </label>
            <input
              className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              type="date"
              id="dueDate"
              name="dueDate"
              // ref={dueDate}
            />
          </p>
        </div>
        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            className="text-stone-800 hover:font-semibold hover:text-stone-950"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-stone-800 px-6 py-2 text-stone-50 hover:bg-stone-950"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default InputForm;