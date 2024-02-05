

export function Button({label, onClick }) {
    return <button onClick={onClick}  type="button" className="bg-slate-950 text-white w-full rounded text-sm py-2">{label}</button>
}