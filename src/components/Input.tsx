import { Listbox, Transition } from "@headlessui/react";
import {
  IconCheck,
  IconExclamationCircle,
  IconSquareRoundedChevronDown,
} from "@tabler/icons-react";
import clsx from "clsx";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  className?: string;
};

type InputNumberProps = InputProps & {
  min?: number;
  max?: number;
  step?: number;
};

type OptionProps = { value: string; label: string };
type OptionsProps = { options: OptionProps[] };

type SelectInputProps = InputProps & OptionsProps;

export const Input = {
  Text: function (props: InputProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = errors[props.name]?.message as string;

    return (
      <div className={props.className ?? ""}>
        <label
          htmlFor={props.id}
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          {props.label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type={props.type ?? "text"}
            id={props.id}
            className={clsx(
              `block w-full rounded-md border-gray-600 bg-gray-800 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-900 disabled:text-gray-400 sm:text-sm`,
              error &&
                "border-red-500 pr-10 text-red-500 placeholder-red-500 focus:border-red-700 focus:outline-none focus:ring-red-700"
            )}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            aria-invalid={!!error}
            aria-describedby={`${props.name}-error`}
            {...register(props.name)}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <IconExclamationCircle
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${props.name}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  },

  Number: function (props: InputNumberProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = errors[props.name]?.message as string;

    return (
      <div className={props.className ?? ""}>
        <label
          htmlFor={props.id}
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          {props.label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="number"
            id={props.id}
            className={clsx(
              `block w-full rounded-md border-gray-600 bg-gray-800 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm`,
              error &&
                "border-red-500 pr-10 text-red-500 placeholder-red-500 focus:border-red-700 focus:outline-none focus:ring-red-700"
            )}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            min={props.min}
            max={props.max}
            step={props.step}
            aria-invalid={!!error}
            aria-describedby={`${props.name}-error`}
            {...register(props.name)}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <IconExclamationCircle
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${props.name}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  },

  Date: function (props: InputProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = errors[props.name]?.message as string;

    return (
      <div className={props.className ?? ""}>
        <label
          htmlFor={props.id}
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          {props.label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="date"
            id={props.id}
            className={clsx(
              `block w-full rounded-md border-gray-600 bg-gray-800 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm`,
              error &&
                "border-red-500 pr-10 text-red-500 placeholder-red-500 focus:border-red-700 focus:outline-none focus:ring-red-700"
            )}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            aria-invalid={!!error}
            aria-describedby={`${props.name}-error`}
            {...register(props.name)}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <IconExclamationCircle
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${props.name}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  },

  Textarea: function (props: InputProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = errors[props.name]?.message as string;

    return (
      <div className={props.className ?? ""}>
        <label
          htmlFor={props.id}
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          {props.label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <textarea
            id={props.id}
            rows={4}
            className={clsx(
              `block w-full rounded-md border-gray-600 bg-gray-800 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm`,
              error &&
                "border-red-500 pr-10 text-red-500 placeholder-red-500 focus:border-red-700 focus:outline-none focus:ring-red-700"
            )}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            aria-invalid={!!error}
            aria-describedby={`${props.name}-error`}
            {...register(props.name)}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <IconExclamationCircle
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${props.name}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  },

  Select: function (props: SelectInputProps) {
    const { control } = useFormContext();

    return (
      <Controller
        control={control}
        name={props.name}
        defaultValue={props.options[0]?.value}
        render={({ field: { onChange, value } }) => {
          return (
            <Listbox value={value as string} onChange={onChange}>
              {({ open }) => (
                <>
                  <Listbox.Label className="mb-2 block text-sm font-medium text-gray-200">
                    {props.label}
                  </Listbox.Label>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-600 bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm">
                      <span className="block truncate capitalize text-gray-200">
                        {(value as string)?.toLowerCase() ?? "Select option"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <IconSquareRoundedChevronDown
                          className="h-5 w-5 text-gray-600"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {props.options.map((option) => (
                          <Listbox.Option
                            key={option.value}
                            className={({ active }) =>
                              clsx(
                                active
                                  ? "bg-teal-500 text-white"
                                  : "text-gray-300",
                                "relative cursor-default select-none py-2 pl-3 pr-9"
                              )
                            }
                            value={option.value}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={clsx(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {option.label}
                                </span>

                                {selected ? (
                                  <span
                                    className={clsx(
                                      active ? "text-white" : "text-teal-500",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <IconCheck
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          );
        }}
      />
    );
  },

  Checkbox: function (props: InputProps) {
    const { register } = useFormContext();

    return (
      <div className={clsx(`relative flex items-start`, props.className ?? "")}>
        <div className="flex h-5 items-center">
          <input
            id={props.id}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-teal-600 focus:ring-teal-500"
            {...register(props.name)}
          />
        </div>
        <div className="ml-2 text-sm">
          <label htmlFor={props.id} className="font-medium text-gray-200">
            {props.label}
          </label>
        </div>
      </div>
    );
  },
};
