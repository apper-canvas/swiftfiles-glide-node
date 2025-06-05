import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import UploadInput from '../molecules/UploadInput';

      const UploadZone = ({ isDragOver, handleDragOver, handleDragLeave, handleDrop, handleFileSelect }) => {
        return (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
              isDragOver
                ? 'border-primary bg-primary bg-opacity-5 scale-102'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon name="Upload" className={`w-8 h-8 ${isDragOver ? 'text-primary' : 'text-gray-400'}`} />
              </div>
              <Text as="h3" className="text-lg font-medium text-gray-900 mb-2">
                Drop files here or click to browse
              </Text>
              <Text className="text-gray-600 mb-6">
                Support for multiple file formats and batch uploads
              </Text>
              <UploadInput onFileSelect={handleFileSelect} />
            </div>
          </motion.div>
        );
      };

      export default UploadZone;