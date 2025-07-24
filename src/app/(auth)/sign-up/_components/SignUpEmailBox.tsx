"use client";

import { FooterButtons } from "@/components/auth";
import { DynamicCardHeader } from "@/components/card";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "../../../../components/dynamic-inputs";
import { SignUpFooter } from "./SignUpFooter";

import { useFormik } from "formik";
import * as Yup from "yup";

type EmailBoxProps = {
  // values: { email: string };
  // errors: { email?: string };
  // touched: { email?: boolean };
  // handleChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  handleNext: () => void;
  onChangeEmail: (inputEmail: string) => void;
};

const EmailSchema = Yup.object({
  email: Yup.string().email().required(),
});

export const SignUpEmailBox = ({
  // values,
  // errors,
  // touched,
  // handleChange,
  // handleBlur,
  handleNext,
  onChangeEmail,
}: EmailBoxProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: EmailSchema,
    onSubmit: (values) => {
      console.log(values);
      onChangeEmail(values.email);
      handleNext();
    },
  });

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    formik;

  const formError = touched.email && errors.email;

  const emailInputProps = {
    name: "email",
    placeholder: "Email",
    value: values.email,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: formError,
    inputErrorMessage: errors.email,
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Create your account"
        description="Sign up to explore your favorite dishes."
      />
      <CardContent className="p-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid items-center w-full gap-6">
              <FormInput {...emailInputProps} />
            </div>
            <FooterButtons buttonText="Let`s Go" />
          </div>
        </form>
      </CardContent>
      <SignUpFooter />
    </Card>
  );
};
