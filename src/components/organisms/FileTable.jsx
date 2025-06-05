import { motion, AnimatePresence } from 'framer-motion';
      import FileListItem from '../molecules/FileListItem';
      import InfoBox from '../molecules/InfoBox';

      const FileTable = ({
        files,
        getFileIcon,
        formatFileSize,
        onRename,
        onFileRename,
        onDelete,
        editingFile,
        newFileName,
        setNewFileName,
        setEditingFile,
        sortedFiles
      }) => {
        return (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden"
          >
            {files.length === 0 ? (
              <InfoBox
                iconName="FileX"
                title="No files yet"
                description="Upload your first file to get started"
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 hidden sm:table-cell">Size</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 hidden md:table-cell">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">Modified</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <AnimatePresence>
                      {sortedFiles.map((file) => (
                        <motion.tr
                          key={file.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <FileListItem
                            file={file}
                            getFileIcon={getFileIcon}
                            formatFileSize={formatFileSize}
                            onRename={onRename}
                            onFileRename={onFileRename}
                            onDelete={onDelete}
                            editingFile={editingFile}
                            newFileName={newFileName}
                            setNewFileName={setNewFileName}
                            setEditingFile={setEditingFile}
                          />
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        );
      };

      export default FileTable;