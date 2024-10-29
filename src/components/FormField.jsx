import React from 'react';

const FormField = ({ label, name, type, value, onChange, placeholder, options, checked }) => {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md";

  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <select name={name} value={value} onChange={onChange} className={`${baseClasses} bg-white`}>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseClasses} h-32 bg-white`}
          />
        );
      case 'checkbox':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              name={name}
              checked={checked}
              onChange={onChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseClasses}  bg-white`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      {type !== 'checkbox' && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      {renderField()}
    </div>
  );
};

export default FormField;