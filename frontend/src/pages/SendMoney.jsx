import { useState } from "react";
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
    const [searchParms] = useSearchParams();
    const firstName = searchParms.get("firstName");
    const lastName = searchParms.get("lastName");
    const id = searchParms.get("id");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    console.log("amount-"+amount)
    console.log("to-"+id)


    return <div className="bg-stone-300 h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
            <div className="bg-white w-96 flex flex-col px-8 rounded-lg py-4">
                <div className="text-center pb-10">
                    <Heading label={"Send Money"}></Heading>           
                </div>
                <div className="flex gap-1 font-semibold text-2xl">
                    <div className="bg-green-400 text-white h-10 w-10 flex justify-center rounded-full items-center">
                        <span>{firstName[0].toUpperCase()}</span>
                    </div>
                    <div className="mt-1">
                        {firstName+" "+lastName}
                    </div>
                </div>
                <div>
                    <InputBox onchange={(e) => {
                        setAmount(e.target.value);
                    }} label={"Amount (in Rs)"} placeholder={"Enter amount"}></InputBox>
                </div>
                <div >
                    <button onClick={() => {
                        axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to : id,
                            amount : amount
                        }, {
                            headers:{
                                Authorization : "Bearer "+ localStorage.getItem("token")
                            }
                        })
                        navigate("/dashboard")
                    }} className="bg-green-400 w-full rounded-lg text-white text-lg py-1 my-2 font-semibold hover:bg-green-700">Initiate Transfer</button>
                </div>
            </div>
        </div>
    </div>
}