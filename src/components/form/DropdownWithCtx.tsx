// Drop down input using react-hook-form context
import { Fragment, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Item } from "@/interfaces/DropdownItems";
import UpDownIcon from "@/pageComponents/booking/bookingForm/UpDownIcon";
import { BsCheckLg } from "react-icons/bs";
import { useFormContext } from "react-hook-form";
import { InputItem } from "@/interfaces/InputItem";
import ErrorForm from "./ErrorForm";

interface DropdownWithCtxProps extends InputItem {
  items: Item[];
}

export default function DropdownWithCtx({ items, name, label, option }: DropdownWithCtxProps) {
  const [selected, setSelected] = useState<Item | null>(null);
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <>
      <p className="font-bold mt-2">{label}</p>
      <div className="w-full min-w-[256px]">
        <Listbox
          {...register(name, option)}
          value={selected}
          onChange={(v) => {
            setValue(name, v?.value)
            setSelected(v)
          }}
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-200 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate text-black">{selected ? selected.tag : "Select"}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <UpDownIcon />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 z-30 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item, itemIdx) => (
                  <Listbox.Option
                    key={itemIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-200 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                        >
                          {item.tag}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <BsCheckLg />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {errors[name] && (
        <ErrorForm
          message={
            errors[name]?.type == "required"
              ? "This field is required"
              : (errors[name]?.message as string)
          }
        />
      )}
    </>
  );
}
