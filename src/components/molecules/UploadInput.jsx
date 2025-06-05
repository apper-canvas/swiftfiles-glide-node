import { useRef } from 'react';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';

      const UploadInput = ({ onFileSelect }) => {
        const fileInputRef = useRef(null);

        return (
          <>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors inline-flex items-center space-x-2"
            >
              <Icon name="FolderOpen" className="w-4 h-4" />
              <Text as="span">Choose Files</Text>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={onFileSelect}
              className="hidden"
            />
          </>
        );
      };

      export default UploadInput;