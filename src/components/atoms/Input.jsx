const Input = ({ type = 'text', placeholder, value, onChange, className = '', disabled, ...props }) => {
        return (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 ${className}`}
            disabled={disabled}
            {...props}
          />
        );
      };

      export default Input;