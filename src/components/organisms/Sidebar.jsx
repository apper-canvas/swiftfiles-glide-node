import { motion } from 'framer-motion';
      import LinkButton from '../molecules/LinkButton';
      import SidebarSection from '../molecules/SidebarSection';
      import ProgressBar from '../atoms/ProgressBar';
      import Text from '../atoms/Text';
      import Label from '../atoms/Label';

      const Sidebar = ({ usedStoragePercent }) => {
        return (
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-60 flex-shrink-0"
          >
            <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-4">
              <div className="space-y-6">
                <SidebarSection title="Quick Access">
                  <LinkButton icon="Clock" text="Recent" />
                  <LinkButton icon="Star" text="Favorites" />
                </SidebarSection>

                <SidebarSection title="Folders">
                  <Text className="text-sm text-gray-500 px-3 py-2">
                    Folder organization coming soon
                  </Text>
                </SidebarSection>

                <SidebarSection title="Storage">
                  <div className="px-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <Text as="span">Used</Text>
                      <Text as="span">{usedStoragePercent.toFixed(1)}%</Text>
                    </div>
                    <ProgressBar progress={usedStoragePercent} />
                    <Text as="p" className="text-xs text-gray-500 mt-1">
                      Analytics coming soon
                    </Text>
                  </div>
                </SidebarSection>
              </div>
            </div>
          </motion.aside>
        );
      };

      export default Sidebar;