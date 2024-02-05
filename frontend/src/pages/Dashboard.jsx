import axios from "axios";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react";
export const Dashboard = () => {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers:{
                Authorization : "Bearer "+ localStorage.getItem("token")
            }
        })
            .then(response => {
                setAmount(response.data.balance);
            })
        
    }, [amount])

    return <div>
        <Appbar></Appbar>
        <div>
            <Balance value={amount}></Balance>
            {/* <Balance value={"10,000"}></Balance> */}
            <Users></Users>
        </div>
    </div>
}