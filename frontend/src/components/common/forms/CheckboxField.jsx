export const CheckboxField = ({ id, label, checked, setChecked }) => {
    return <>
        <div className="form-group mb-3">
            <label htmlFor={id}>
                <input id={id} name={id}
                    className="me-2"
                    type="checkbox"
                    checked={checked}
                    onChange={event => setChecked(event.target.checked)} />
                {label}
            </label>
        </div>
    </>;
}