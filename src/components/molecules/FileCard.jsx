import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Button from '../atoms/Button';
      import { toast } from 'react-toastify';
      import { format } from 'date-fns';

      const FileCard = ({ file, getFileIcon, formatFileSize, onRename, onDelete }) => {
        return (
          <div className="bg-white rounded-lg shadow-soft border border-gray-200 p-4 flex flex-col items-center text-center group">
            <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
              <Icon name={getFileIcon(file.type)} className="w-10 h-10 text-primary" />
            </div>
            <Text className="text-gray-900 font-medium text-sm truncate w-full mb-1" title={file.name}>
              {file.name || 'Untitled'}
            </Text>
            <Text className="text-xs text-gray-500 mb-3">
              {formatFileSize(file.size || 0)} | {format(new Date(file.modifiedAt || file.createdAt || 0), 'MMM d, yyyy')}
            </Text>
            <div className="flex space-x-2 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
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
                onClick={() => onDelete(file)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                title="Delete"
              >
                <Icon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      };

      export default FileCard;