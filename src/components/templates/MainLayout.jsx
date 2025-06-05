import { motion } from 'framer-motion';
      import Header from '../organisms/Header';
      import Sidebar from '../organisms/Sidebar';
      import StatusBar from '../organisms/StatusBar';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';

      const MainLayout = ({
        children,
        loading,
        filesCount,
        totalStorage,
        usedStoragePercent,
        viewMode,
        setViewMode,
      }) => {
        if (loading) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <Icon name="Loader2" className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <Text className="text-gray-600">Loading your files...</Text>
              </div>
            </div>
          );
        }

        return (
          <div className="min-h-screen bg-gray-50">
            <Header viewMode={viewMode} setViewMode={setViewMode} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <Sidebar usedStoragePercent={usedStoragePercent} />

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">{children}</div>
              </div>
            </div>

            <StatusBar filesCount={filesCount} totalStorage={totalStorage} />
          </div>
        );
      };

      export default MainLayout;