import Button, { ButtonProps } from "components/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary text-base m-0 disabled:bg-opacity-70 bg-primary-600 hover:bg-primary-700 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
