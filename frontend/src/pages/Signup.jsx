import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-stone-300 flex h-screen justify-center ">
        <div className=" flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center flex-col p-2 px-4">
                <Heading label={"Sign up"}></Heading>
                <SubHeading label={"Enter your information to create an accout"}></SubHeading>
                <InputBox onchange={(e) => {
                    setFirstName(e.target.value);
                }} label={"First Name"} placeholder={"John"}></InputBox>
                <InputBox onchange={(e) => {
                    setLastName(e.target.value);
                }} label={"Last Name"} placeholder={"Deo"}></InputBox>
                <InputBox onchange={(e) => {
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"johndeo@gmail.com"}></InputBox>
                <InputBox onchange={(e) => {
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={""}></InputBox>
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            firstName : firstName,
                            lastName : lastName,
                            username : username,
                            password : password
                        })
                        localStorage.setItem("token" , response.data.token);
                        navigate("/dashboard");
                    }} label={"Sign Up"} ></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
}