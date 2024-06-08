import React from "react";

export default function InputLabel({htmlFor, label} : {htmlFor:string, label:string}) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
    );
};

