import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Input from '../atoms/Input';
      import Button from '../atoms/Button';
      import Text from '../atoms/Text';

      const Header = ({ viewMode, setViewMode }) => {
        return (
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                      <Icon name="Folder" className="w-5 h-5 text-white" />
                    </div>
                    <Text as="h1" className="text-xl font-bold text-gray-900">
                      SwiftFiles
                    </Text>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative hidden sm:block">
                    <Icon
                      name="Search"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    />
                    <Input
                      type="text"
                      placeholder="Search coming soon..."
                      className="pl-10 pr-4 py-2 w-64"
                      disabled
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Icon name="List" className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Icon name="Grid3X3" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.header>
        );
      };

      export default Header;