


export function Balance({value}) {
    return <div className="flex px-4 ">
        <div className="font-bold py-4  text-lg">
            Your Balance
        </div>
        <div className="font-bold py-4 ml-4 text-lg">
            ₹{value}
        </div>
    </div>
}