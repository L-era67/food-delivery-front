"use client";

import { FooterButtons } from "@/components/auth";
import { DynamicCardHeader } from "@/components/card";
import { FormInput } from "@/components/dynamic-inputs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoginFooter } from "./LoginFooter";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const LoginSchema = Yup.object({
  password: Yup.string().required(),
  email: Yup.string().email().required(),
});

export const Login = () => {
  const { push } = useRouter();


  const submitLogin = async (email: string, password: string)=> {
    const response = await axios.post<{ sucess: true; accessToken: string }>(
      "http://localhost:4000/user/login",
      {
        email: email,
        password: password,
      }
    );

    console.log("response LOGIN: ", response.data);
    localStorage.setItem("token", response.data.accessToken);

    push("/");
    // return 
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await submitLogin(values.email, values.password);
      console.log("LOGIN:", values);
    },
  });

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    formik;

  const loginEmailInput = {
    name: "email",
    placeholder: "email",
    value: values.email,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: touched.email && errors.email,
    inputErrorMessage: errors.email,
  };

  const loginPasswordInput = {
    name: "password",
    placeholder: "password",
    value: values.password,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: touched.password && errors.password,
    inputErrorMessage: errors.password,
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Log in"
        description="Log in to enjoy your favorite dishes."
      />

      <CardContent className="p-0">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid items-start w-full gap-4">
            <FormInput {...loginEmailInput} />
            <FormInput {...loginPasswordInput} />
            <Button variant="link" className="p-0 underline w-fit">
              Forgot password ?
            </Button>
          </div>
          <div onClick={submitLogin}>
            <FooterButtons buttonText="Let`s Go" />
          </div>
        </form>
      </CardContent>
      <LoginFooter />
    </Card>
  );
};
