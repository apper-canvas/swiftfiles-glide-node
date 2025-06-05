import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';

      const InfoBox = ({ iconName, title, description, iconClass = 'w-8 h-8 text-gray-400' }) => {
        return (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon name={iconName} className={iconClass} />
            </div>
            <Text as="h3" className="text-lg font-medium text-gray-900 mb-2">
              {title}
            </Text>
            <Text className="text-gray-600">{description}</Text>
          </div>
        );
      };

      export default InfoBox;