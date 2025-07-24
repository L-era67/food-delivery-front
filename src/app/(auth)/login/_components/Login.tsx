"use client";

import { FooterButtons } from "@/components/auth";
import { DynamicCardHeader } from "@/components/card";
import { FormInput } from "@/components/dynamic-inputs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { LoginFooter } from "./LoginFooter";
import axios from "axios";

export const Login = () => {
  const { push } = useRouter();

  const Login = async () => {
    const response = await axios.post<{ sucess: true; accessToken: string }>(
      "http://localhost:4000/user/login",
      {
        email: "test2@gmail.com",
        password: "123",
      }
    );

    console.log("response LOGIN: ", response.data);
    localStorage.setItem("token", response.data.accessToken)

    push("/")
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Log in"
        description="Log in to enjoy your favorite dishes."
      />

      <CardContent className="p-0">
        <div className="flex flex-col gap-6">
          <div className="grid items-start w-full gap-4">
            {/* <FormInput />
            <FormInput /> */}
            <Button variant="link" className="p-0 underline w-fit">
              Forgot password ?
            </Button>
          </div>
          <div onClick={Login}>
            <FooterButtons buttonText="Let`s Go" />
          </div>
        </div>
      </CardContent>
      <LoginFooter />
    </Card>
  );
};
