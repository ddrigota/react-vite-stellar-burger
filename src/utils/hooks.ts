import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../services/store";
import { useState } from "react";

type DispatchFunc = () => AppDispatch;
type FormValues = { [key: string]: string };

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useForm = (inputValues: FormValues = {}) => {
  const [values, setValues] = useState(inputValues);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setIsFormChanged(true);
  };

  const resetForm = () => {
    setValues(inputValues);
    setIsFormChanged(false);
  };

  return { values, handleChange, setValues, isFormChanged, resetForm };
};
