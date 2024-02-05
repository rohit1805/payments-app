

export function InputBox({label, placeholder, onchange}) {
    return <div className="text-sm font-medium text-left py-2">
        <div className="pb-2">{label}</div>
        <input onChange={onchange} type="text" placeholder={placeholder} className="border rounded w-full px-2 py-1"/>
    </div>
}