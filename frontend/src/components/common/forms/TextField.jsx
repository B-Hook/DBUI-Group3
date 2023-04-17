import { useEffect, useRef } from "react";

export const TextField = ({id, label, value, setValue, isFocused, type="text"}) => {
    const refInput = useRef();

    useEffect(() => {
        if(isFocused) {
            refInput.current.focus();
        }
    }, [ isFocused ]);

    return <>
        <div className="form-group mb-3">
            <label className="pb-2" htmlFor={ id }>{label}</label>
            {type === "number"?
                <input id={id} name={id}
                    className="form-control"
                    type={type}
                    value={value}
                    onChange={event => setValue(event.target.valueAsNumber)}
                    ref={refInput} />:
                <input id={id} name={id}
                    className="form-control"
                    type={type}
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    ref={refInput} />
            }
        </div>
    </>;
}