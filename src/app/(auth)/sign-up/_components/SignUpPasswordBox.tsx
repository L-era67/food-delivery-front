"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { FormInput } from "../../../../components/dynamic-inputs";
import { SignUpFooter } from "./SignUpFooter";
import { DynamicCardHeader } from "@/components/card";
import { BackButton } from "@/components/button";
import { FooterButtons } from "@/components/auth";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { database } from "@/lib/utils/database";

type PasswordBoxProps = {
  // values: { password: string; passwordConfirmation: string };
  // errors: { password?: string; passwordConfirmation?: string };
  // touched: { password?: boolean; passwordConfirmation?: boolean };
  // handleChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  // handleCreateAccount: () => void;
  handleBack: () => void;
  email: string;
};
const PasswordSchema = Yup.object({
  password: Yup.string().required("hooson baina"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required(),
});

const handleSignUp = async (email: string, password: string) => {
  const response = await database("user", "POST", {
    email,
    password,
    phoneNumber: "7777",
    address: "han-uul",
  });
  console.log("create user", response);
};

export const SignUpPasswordBox = ({ handleBack, email }: PasswordBoxProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await handleSignUp(email, values.password);
        console.log(values);
        router.push("/login");
      } catch (error) {
        console.log("try again");
      }
      setLoading(false);
    },
  });

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    formik;

  const passwordInputProps = {
    name: "password",
    placeholder: "password",
    value: values.password,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: touched.password && errors.password,
    inputErrorMessage: errors.password,
  };

  const confirmPasswordInputProps = {
    name: "confirmPassword",
    placeholder: "confirmPassword",
    value: values.confirmPassword,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: touched.confirmPassword && errors.confirmPassword,
    inputErrorMessage: errors.confirmPassword,
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <BackButton handleClick={handleBack} />

      <DynamicCardHeader
        title="Create a strong password"
        description="Create a strong password with letters, numbers."
      />

      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid items-center w-full gap-6">
            <div className="flex flex-col space-y-1.5 gap-4">
              <FormInput {...passwordInputProps} />
              <FormInput {...confirmPasswordInputProps} />

              <div className="flex items-center space-x-2">
                <Checkbox id="showPass" />
                <label
                  htmlFor="showPass"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                >
                  Show password
                </label>
              </div>
            </div>
          </div>
          <FooterButtons buttonDisable={loading} buttonText="Let`s Go" />
        </form>
      </CardContent>

      <SignUpFooter />
    </Card>
  );
};
