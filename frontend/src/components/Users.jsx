import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
            .then(response => {
                setUsers(response.data.user);
            })
         
    }, [filter])

    return <div className="px-4">
        <div className="font-bold pt-3 pb-1 text-lg">
            Users
        </div>
        <div className="w-full ">
            <input onChange={(e) => {
                const inputs = e.target.value;
                inputs.toLowerCase();
                setFilter(inputs);
            }} className="w-full p-1 border text-sm" type="text" placeholder="Search users . . . ." />
        </div>
        <div className="mt-2">
            {users.map(user => <User user={user}></User>)}
        </div>
    </div>
}


function User({user}) {
    const navigate = useNavigate();
    return <div className="flex justify-between py-1 ">
        <div className="flex font-semibold">
            <div className="px-3 pt-1 bg-slate-300 rounded-full  mr-2">
                {user.firstName[0]}
            </div>
            <div className="pt-1">
                {user.firstName} {user.lastName}
            </div>   
        </div>
        <div className="w-28 ">
            <Button onClick={(e) => {
                navigate("/send?id="+user._id+"&firstName="+user.firstName+"&lastName="+user.lastName);
            }} label={"Send Money"} ></Button>
        </div>
    </div>
}


// {
//     firstName : "Rohit",
//     lastName : "Nandavdekar",
//     _id : 1
// },{
//     firstName : "Ashitosh",
//     lastName : "Waghmera",
//     _id : 2
// },{
//     firstName : "Pooja",
//     lastName : "Shirsat",
//     _id : 3
// },{
//     firstName : "Rohan",
//     lastName : "Nandavdekar",
//     _id : 4
// }