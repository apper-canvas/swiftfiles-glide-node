import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';

      const LinkButton = ({ icon, text, onClick, disabled = false, className = '', ...props }) => {
        return (
          <Button
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors ${className}`}
            disabled={disabled}
            {...props}
          >
            <Icon name={icon} className="w-4 h-4" />
            <Text as="span">{text}</Text>
          </Button>
        );
      };

      export default LinkButton;