import { useForm, FormProvider } from "react-hook-form";

export const useReserveForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handlePhoneInput = (event) => {
    const input = event.target.value;
    const formattedInput = input.replace(/[^\d+()-]/g, "");
    setValue("guestContact", formattedInput);
  };

  const validatePhone = (input) => /^[+\d]{1}[\d\-\(\) ]{10,14}$/i.test(input);

  return {
    handlePhoneInput,
    validatePhone,
  
  }
};