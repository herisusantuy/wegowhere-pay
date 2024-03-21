import React, { useEffect } from "react";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";
import TextField from "./text-field";

type Props = React.ComponentProps<typeof TextField> & {
  name: string;
  rules: RegisterOptions;
  validationLength?: number;
  formatter?: (oldValue: string, newValue: string) => string;
};

const FormTextField: React.FC<Props> = (props) => {
  const {
    name,
    rules,
    validationLength = 1,
    formatter,
    ...restOfProps
  } = props;
  const {
    control,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();
  const value = watch(name);

  useEffect(() => {
    if (value.length >= validationLength) {
      trigger(name);
    }
  }, [value, name, validationLength, trigger]);

  return (
    <Controller
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        formState,
        fieldState,
      }) => (
        <TextField
          {...restOfProps}
          errorText={errors[name]?.message as string}
          onBlur={onBlur}
          onChangeText={(text) => {
            const newValue = formatter ? formatter(value, text) : text;
            onChange(newValue);
          }}
          value={value}
        />
      )}
      name={name}
      rules={rules}
    />
  );
};
export default FormTextField;
