import {Link} from "react-router-dom";

export function BottomWarning({label, buttonText, to}){
    return <div className=" flex justify-center font-semibold text-sm py-3">
        <div>
            {label}
        </div>
        <Link className="underline pl-1 corsor-pointer" to={to}>
            {buttonText}
        </Link>
    </div>
}