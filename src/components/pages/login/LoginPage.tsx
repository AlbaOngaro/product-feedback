import * as Form from "@radix-ui/react-form";
import { FormEventHandler, useState } from "react";

import { useAuth } from "providers/auth/AuthProvider";

import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { Input } from "components/atoms/input/Input";

export function LoginPage() {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await login(credentials);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <main className="h-full w-full max-w-[540px] m-auto flex flex-col justify-center items-center py-14 px-9 lg:py-24">
      <h1 className="text-[#3A4374] text-2xl font-bold mb-6">Login</h1>
      <Card className="w-full">
        <Form.Root
          name="login"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials((curr) => ({
                ...curr,
                email: e.target.value,
              }))
            }
            required
            validations={{
              typeMismatch: "Please enter a valid email",
              valueMissing: "Field is required",
            }}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((curr) => ({
                ...curr,
                password: e.target.value,
              }))
            }
            required
            validations={{
              valueMissing: "Field is required",
            }}
          />
          <Button>Login</Button>
        </Form.Root>
      </Card>
    </main>
  );
}
