"use client";

import { FooterButtons } from "@/components/auth";
import { DynamicCardHeader } from "@/components/card";
import { useRouter } from "next/navigation";
import { FormInput } from "../../../../components/dynamic-inputs";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { database } from "@/lib/utils/database";

export const PasswordResetBox = () => {
  const { push } = useRouter();

  const handleResetPassword = async () => {
    const response = await database("/user/reset-password", "POST", {
      resetPassword: "000",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTM0MjEzMjYsInVzZXJEYXRhIjp7InVzZXJJZCI6IjY4ODJlMjhiN2M0MzFlNDk3MWU3ZmZjMiIsInJvbGUiOiJVc2VyIiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20ifSwiaWF0IjoxNzUzNDE3NzI2fQ.42KhUk63kowyD7O1LZvPISDzLreumaxGKS9oHqSkFCA",
    });
    console.log("RESET TOKEN", response);
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Create new password"
        description="Set a new password with a combination of letters and numbers for better security."
      />

      <CardContent className="p-0">
        <form className="flex flex-col gap-6">
          <div className="grid items-center w-full gap-6">
            <div className="flex flex-col space-y-1.5 gap-4">
              {/* <FormInput />
              <FormInput /> */}

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
