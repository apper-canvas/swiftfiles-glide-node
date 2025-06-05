import { useState } from 'react';
      import Icon from '../atoms/Icon';
      import Button from '../atoms/Button';
      import Input from '../atoms/Input';
      import Text from '../atoms/Text';
      import { toast } from 'react-toastify';
      import { format } from 'date-fns';

      const FileListItem = ({ file, getFileIcon, formatFileSize, onRename, onFileRename, onDelete, editingFile, newFileName, setNewFileName, setEditingFile }) => {
        const handleSaveRename = async () => {
          if (newFileName.trim()) {
            await onFileRename(file.id, newFileName.trim());
            setEditingFile(null);
            setNewFileName('');
          }
        };

        const handleCancelRename = () => {
          setEditingFile(null);
          setNewFileName('');
        };

        return (
          <div className="flex items-center hover:bg-gray-50 transition-colors group">
            <div className="py-4 px-6 flex-1">
              <div className="flex items-center space-x-3">
                <Icon name={getFileIcon(file.type)} className="w-5 h-5 text-gray-500 flex-shrink-0" />
                {editingFile === file.id ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <Input
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveRename();
                        if (e.key === 'Escape') handleCancelRename();
                      }}
                    />
                    <Button onClick={handleSaveRename} className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Icon name="Check" className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleCancelRename} className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Icon name="X" className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Text
                    as="span"
                    className="text-gray-900 font-medium cursor-pointer hover:text-primary transition-colors truncate"
                    onDoubleClick={() => onRename(file)}
                    title="Double-click to rename"
                  >
                    {file.name || 'Untitled'}
                  </Text>
                )}
              </div>
            </div>
            <div className="py-4 px-4 text-sm text-gray-600 hidden sm:table-cell w-32">
              {formatFileSize(file.size || 0)}
            </div>
            <div className="py-4 px-4 text-sm text-gray-600 hidden md:table-cell w-32">
              {file.type?.split('/')[1]?.toUpperCase() || 'Unknown'}
            </div>
            <div className="py-4 px-4 text-sm text-gray-600 hidden lg:table-cell w-32">
              {file.modifiedAt ? format(new Date(file.modifiedAt), 'MMM d, yyyy') : 'Unknown'}
            </div>
            <div className="py-4 px-6 w-auto">
              <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  onClick={() => toast.info("Download feature coming soon")}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Download"
                >
                  <Icon name="Download" className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onRename(file)}
                  className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                  title="Rename"
                >
                  <Icon name="Edit2" className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => toast.info("File sharing launching soon")}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                  title="Share - Coming Soon"
                >
                  <Icon name="Share2" className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onDelete(file)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete"
                >
                  <Icon name="Trash2" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      };

      export default FileListItem;