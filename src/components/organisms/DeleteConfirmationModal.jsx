import { motion, AnimatePresence } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Button from '../atoms/Button';
      import Text from '../atoms/Text';

      const DeleteConfirmationModal = ({ deleteConfirm, setDeleteConfirm, confirmDelete }) => {
        return (
          <AnimatePresence>
            {deleteConfirm && (
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
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Icon name="AlertTriangle" className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <Text as="h3" className="text-lg font-semibold text-gray-900">
                        Delete File
                      </Text>
                      <Text className="text-sm text-gray-600">This action cannot be undone</Text>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-6">
                    <Text className="text-sm text-gray-700">
                      <span className="font-medium">File:</span> {deleteConfirm.name}
                    </Text>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={confirmDelete}
                      className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg"
                    >
                      Delete
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };

      export default DeleteConfirmationModal;