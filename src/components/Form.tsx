import React, { FC, useState } from "react";
import { FormProps } from "../models/models";

const Form: FC<FormProps> = ({ title, handleSubmit,errorMessages }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="form">
      {title === "Sign up" && (
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div className="input-container">
        <label>Email </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <label>Password </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="error">{errorMessages}</div>
      </div>

      <div className="button-container">
        <button
          type="button"
          onClick={() => handleSubmit(email, password, name)}
        >
          {title}
        </button>
      </div>
    </div>
  );
};

export default Form;
