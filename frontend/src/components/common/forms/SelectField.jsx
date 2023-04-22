export const SelectField = ({ id, label, value, setValue, options, optionValueKey, optionLabelKey, hideBlankOption, isRequired=false, inline=false, isDisabled=false }) => {
    return <>
    {!inline?
        <div className="form-group mb-3">
            <label className="pb-2" htmlFor={id}>{label}</label>
            <select id={id}
                name={id}
                value={value}
                onChange={event => setValue(event.target.value)}
                className="form-control"
                required={isRequired}
                disabled={isDisabled}>
                { !hideBlankOption && <option></option> }
                {
                    options.map((option, index) => <option key={index}
                        value={ optionValueKey ? option[optionValueKey] : option }>
                        { optionLabelKey ? option[optionLabelKey] : optionValueKey
                            ? option[optionValueKey] : option }
                    </option>)
                }
            </select>
        </div>:
        <div className="form-group row align-items-center">
            <div className="col-auto">
                <label className="" htmlFor={id}><h5>{label}:</h5></label>
            </div>
            <div className="col-md">
                <select id={id}
                    name={id}
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    className="form-control"
                    required={isRequired}
                    style={{"text-align-last": "center"}}>
                    { !hideBlankOption && <option></option> }
                    {
                        options.map((option, index) => <option key={index}
                            value={ optionValueKey ? option[optionValueKey] : option }>
                            { optionLabelKey ? option[optionLabelKey] : optionValueKey
                                ? option[optionValueKey] : option }
                        </option>)
                    }
                </select>
            </div>
        </div>
    }
    </>;
}