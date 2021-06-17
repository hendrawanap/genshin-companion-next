import { useState } from "react";

export default function Input(props) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isFocused, setIsFocused] = useState();

  const handleChange = (event) => {
    const condition = event.target.value === "";
    condition !== isEmpty ? setIsEmpty(condition) : null;
    props.setValue ? props.setValue(event.target.value) : null;
  };

  return (
    <div className={`border rounded-md px-4 h-12 flex items-center ${isFocused ? "border-primary bg-primary bg-opacity-10" : "border-dark-25"}`}>
      <div className={`${props.isFull ? "w-full" : ""}`}>
        <div
          className={`text-2xs leading-none text-white text-opacity-disabled ${
            isEmpty ? "hidden" : ""
          }`}
        >
          {props.placeholder}
        </div>
        <input
          onChange={handleChange}
          value={props.value}
          className="block bg-transparent text-sm text leading-none text-white text-opacity-high placeholder-white placeholder-opacity-disabled w-full focus:ring-0 focus:outline-none"
          type={props.type}
          placeholder={props.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></input>
      </div>
      {props.icon}
    </div>
  );
}
