import clsx from "clsx";
import { forwardRef, useImperativeHandle, useRef } from "react";

// import style from './InputField.module.css'

function InputFinal({ label, id, value, placeholder, min, max, onChange, name }, ref) {

  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus()
    },
    select() {
      inputRef.current.select()
    }
  }))

  return (
    <div className="row">
      <div className="col-xl-12">
        <label htmlFor={id} className="pt-lg-2">
          {label}
        </label>
      </div>
      <div className="col-xl-12 mb-2">
        <input
          id={id}
          type="number"
          className={clsx('form-control')}
          placeholder={placeholder}
          value={value}
          name={name}
          min={min}
          max={max}
          onChange={onChange}
          required
          ref={inputRef}
        />
      </div>
    </div>
  );
}

export default forwardRef(InputFinal)