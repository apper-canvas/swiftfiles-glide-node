import { motion } from 'framer-motion';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import SortDropdown from '../molecules/SortDropdown';

      const Toolbar = ({ sortBy, onSortChange }) => {
        return (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-xl shadow-soft border border-gray-200 p-4"
          >
            <div className="flex items-center space-x-3">
              <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />

              <Button
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative group"
                title="Advanced filtering coming soon"
              >
                <Icon name="Filter" className="w-4 h-4" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Advanced filtering coming soon
                </span>
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative group"
                title="Folders coming soon"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="FolderPlus" className="w-4 h-4" />
                  <Text as="span">New Folder</Text>
                </div>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Folders coming soon
                </span>
              </Button>
            </div>
          </motion.div>
        );
      };

      export default Toolbar;