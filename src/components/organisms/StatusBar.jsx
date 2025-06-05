import { motion } from 'framer-motion';
      import Text from '../atoms/Text';

      const StatusBar = ({ filesCount, totalStorage }) => {
        return (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-600"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Text as="span">{filesCount} files</Text>
              <Text as="span">{(totalStorage / (1024 * 1024)).toFixed(1)} MB used</Text>
            </div>
          </motion.div>
        );
      };

      export default StatusBar;