import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    return <div className="bg-stone-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg text-center px-4 text-sm w-80">
                    <Heading label={"Sign in"}></Heading>
                    <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                    <InputBox onchange={(e) => {
                        setUsername(e.target.value);
                    }} label={"Email"} placeholder={"johndoe@gmail.com"}></InputBox>
                    <InputBox onchange={(e) => {
                        setPassword(e.target.value);
                    }} label={"Password"} ></InputBox>
                    <div className="pt-2">
                        <Button onClick={async() => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username,
                                password
                            })
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        }} label={"Sign in"}></Button>
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></BottomWarning>
                </div>
            </div>
    </div>
}