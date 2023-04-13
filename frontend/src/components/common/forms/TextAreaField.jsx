export const TextAreaField = ({label, value, setValue}) => {
    return <>
        <div className="form-group mb-3">
            <label className="pb-2" htmlFor={ label }>{label}</label>
            <textarea rows="5" id={label} name={label}
                className="form-control"
                value={value}
                onChange={event => setValue(event.target.value)} />
        </div>
    </>;
}