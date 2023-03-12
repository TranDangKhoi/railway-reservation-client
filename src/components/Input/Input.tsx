import React, { InputHTMLAttributes, useState } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";
export type InputPropsType<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  className?: string;
  containerClassName?: string;
  errorClassName?: string;
  name?: string;
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>;

function Input<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  type,
  onChange,
  value = "",
  className,
  containerClassName,
  errorClassName,
}: InputPropsType<TFieldValues, TName>) {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
  });
  const [localValue, setLocalValue] = useState<string>(field.value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isNumberType = type === "number" && (/^\d+$/.test(inputValue) || inputValue === "");
    if (isNumberType || type !== "number") {
      // Cập nhật localValue state
      setLocalValue(inputValue);
      // Gọi field.onChange để cập nhật vào state của React Hook Form
      field.onChange(e);
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(e);
    }
  };
  return <></>;
}

export default Input;
