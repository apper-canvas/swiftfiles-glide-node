import { motion, AnimatePresence } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import ProgressBar from '../atoms/ProgressBar';

      const UploadProgressModal = ({ uploadProgress }) => {
        return (
          <AnimatePresence>
            {uploadProgress.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 glass-morphism"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Text as="h3" className="text-lg font-semibold text-gray-900">
                      Uploading Files
                    </Text>
                    <Icon name="Upload" className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-3">
                    {uploadProgress.map((task) => (
                      <div key={task.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <Text as="span" className="text-gray-700 truncate">
                            {task.fileName}
                          </Text>
                          <Text as="span" className="text-gray-500">
                            {task.progress}%
                          </Text>
                        </div>
                        <ProgressBar progress={task.progress} barClassName="progress-shimmer" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };

      export default UploadProgressModal;