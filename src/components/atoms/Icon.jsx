import ApperIcon from '../ApperIcon';

      const Icon = ({ name, className = '', ...props }) => {
        return <ApperIcon name={name} className={className} {...props} />;
      };

      export default Icon;