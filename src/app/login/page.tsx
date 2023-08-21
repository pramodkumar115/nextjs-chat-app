'use client'
import { useRouter } from 'next/navigation';
import React from "react";
import { useCookies } from 'react-cookie';
import Button from "../commons/Button";
import Card from "../commons/Card";
import CardContent from "../commons/CardContent";
import CardFooter from "../commons/CardFooter";
import CardHeader from "../commons/CardHeader";
import InputPassword from "../commons/InputPassword";
import InputText from "../commons/InputText";
import { toast } from '../commons/Toast';

const Login: React.FC = () => {
  const { push } = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // 👇 encode the data to application/x-www-form-urlencoded type
    const formData = new URLSearchParams();
    formData.append("email", (e.target as any).emailId.value);
    formData.append("password", (e.target as any).password.value);
    


    // 👇 call backend endpoint using fetch api
    fetch(`api/controllers/User?emailId=${(e.target as any).emailId.value}&password=${(e.target as any).password.value}`, {
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
      .then(async (result) => result.json())
      .then((result: any) => {
        console.log("result", result);
        // 👇 modify the state to show the result
        if (result.statusMessage === 'SUCCESS' && result.message === 'SUCCESS' ) {
          toast("success", "Logged In", "top-right");
          // setCookie("loggedInUser", result.data[0]);
          setCookie('user', result.data[0]);
          push("/");
        }
        else {
          toast("error", "Invalid Email ID or Password", "top-right");
        }
      });
  };

  return <Card>
    <form onSubmit={handleSubmit}>
      <CardHeader title={"Login to Chat App"} />
      <CardContent>
        <InputText inputLabel={"Email ID"} name="emailId" required={true} />
        <InputPassword inputLabel={"Password"} name='password' required={true} />
      </CardContent>
      <CardFooter className={"flex gap-2"}>
        <Button size="sm" variant="primary" type="submit">Login</Button>
        <Button size="sm" variant="secondary" onClick={() => {
          console.log("In register click");
          push("/register")
        }
        }>Register</Button>
      </CardFooter>
    </form>
  </Card>
}

export default Login;