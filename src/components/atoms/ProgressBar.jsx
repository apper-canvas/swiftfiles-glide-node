const ProgressBar = ({ progress, className = '', barClassName = '' }) => {
        return (
          <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
            <div
              className={`bg-primary h-2 rounded-full transition-all duration-500 ${barClassName}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        );
      };

      export default ProgressBar;