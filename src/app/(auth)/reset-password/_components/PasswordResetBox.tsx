"use client";

import { FooterButtons } from "@/components/auth";
import { DynamicCardHeader } from "@/components/card";
import { useRouter } from "next/navigation";
import { FormInput } from "../../../../components/dynamic-inputs";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { database } from "@/lib/utils/database";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const resetPasswordSchema = Yup.object({
  password: Yup.string().required(),
});

export const PasswordResetBox = () => {
  const { push } = useRouter();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  console.log("log:", token);

  const handleResetPassword = async (password: string, token: string) => {
    const response = await database("user/reset-password", "POST", {
      password: password,
      token: token,
    });
    console.log("RESET TOKEN", response);
    push("/login");
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      console.log("RESET PASSWORD:", values);
      await handleResetPassword(values.password, token);
    },
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    formik;

  const resetPassInputvalues = {
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
        title="Create new password"
        description="Set a new password with a combination of letters and numbers for better security."
      />

      <CardContent className="p-0">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid items-center w-full gap-6">
            <div className="flex flex-col space-y-1.5 gap-4">
              <FormInput {...resetPassInputvalues} />
              {/* <FormInput /> */}

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

          <div onClick={handleResetPassword}>
            <FooterButtons buttonText="Let`s Go" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
