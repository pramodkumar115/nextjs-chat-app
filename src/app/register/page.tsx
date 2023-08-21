'use client'

import { useRouter } from 'next/navigation';
import { useState } from "react";
import Button from "../commons/Button";
import Card from "../commons/Card";
import CardContent from "../commons/CardContent";
import CardFooter from "../commons/CardFooter";
import CardHeader from "../commons/CardHeader";
import InputPassword from "../commons/InputPassword";
import InputText from "../commons/InputText";
import { toast } from "../commons/Toast";

const Register = () => {
    const [err, setErr] = useState("");
    const [fieldErrors, setFieldErrors] = useState<any | null>(null);
    const {push} = useRouter();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if ((e.target.password as any).value !== (e.target.confirmPassword as any).value) {
            setErr("Password and Confirm Password do not match")
        } else {
            const formData = new URLSearchParams();
            formData.append("firstName", (e.target.firstName as any).value);
            formData.append("lastName", (e.target.lastName as any).value);
            formData.append("emailId", (e.target.emailId as any).value);
            formData.append("password", (e.target.password as any).value);

            fetch(`api/controllers/User`, {
                body: formData.toString(),
                method: "post",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            }).then(async (result) => result.json())
            .then((result: any) => {
                console.log(result);
                if (result.message === "SUCCESS") {
                    toast("success", "Registration Successful", "top-right");
                    push("/login");
                } else {
                    toast("error", "Registration failed. Please check", "top-right");
                }
            });
        }
    };
    const checkEmailIdUnique = (event: any) => {
        fetch(`api/controllers/User/checkEmailId?emailId=${event.target.value}`, {
            method: "get",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        }).then(res => res.json())
        .then((res: any) => {
            console.log("res", res);
            if (res.statusCode !== 200) {
                setErr(res.message)
            } else {
                setErr("")
            }
        })
    }
    return <Card>
        <form onSubmit={handleSubmit}>
            <CardHeader title={"Register / Sign Up"} />
            <CardContent>
                <InputText inputLabel={"First Name"} required name="firstName"></InputText>
                <InputText inputLabel={"Last Name"} required name="lastName"></InputText>
                <InputText inputLabel={"Email"} required name="emailId" onBlur={checkEmailIdUnique}></InputText>
                {fieldErrors}
                <InputPassword inputLabel="Password" required name="password"></InputPassword>
                <InputPassword inputLabel="Confirm Password" required name="confirmPassword"></InputPassword>
            </CardContent>
            <CardFooter className="flex gap-2">
                {err != '' && <span className={"text-red-700"}>{err}</span>}
                <Button size="sm" disabled={err !== ""} variant="primary" type="submit">Register</Button>
                <Button size="sm" variant="secondary">Cancel</Button>
            </CardFooter>
        </form>
    </Card>
}

export default Register;