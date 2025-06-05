import { useState, useEffect } from 'react';
      import { toast } from 'react-toastify';
      import fileService from '../services/api/fileService';
      import folderService from '../services/api/folderService';
      import MainLayout from '../components/templates/MainLayout';
      import Toolbar from '../components/organisms/Toolbar';
      import UploadZone from '../components/organisms/UploadZone';
      import FileTable from '../components/organisms/FileTable';
      import UploadProgressModal from '../components/organisms/UploadProgressModal';
      import DeleteConfirmationModal from '../components/organisms/DeleteConfirmationModal';

      const HomePage = () => {
        const [files, setFiles] = useState([]);
        const [folders, setFolders] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [viewMode, setViewMode] = useState('list');
        const [sortBy, setSortBy] = useState('name');
        const [isDragOver, setIsDragOver] = useState(false);
        const [uploadProgress, setUploadProgress] = useState([]);
        const [editingFile, setEditingFile] = useState(null);
        const [newFileName, setNewFileName] = useState('');
        const [deleteConfirm, setDeleteConfirm] = useState(null);

        useEffect(() => {
          const loadData = async () => {
            setLoading(true);
            try {
              const [filesResult, foldersResult] = await Promise.all([
                fileService.getAll(),
                folderService.getAll(),
              ]);
              setFiles(filesResult || []);
              setFolders(foldersResult || []);
            } catch (err) {
              setError(err.message);
              toast.error('Failed to load files');
            } finally {
              setLoading(false);
            }
          };
          loadData();
        }, []);

        const simulateUpload = async (filesToUpload) => {
          const uploadTasks = filesToUpload.map((file) => ({
            id: Date.now() + Math.random(),
            fileName: file.name,
            progress: 0,
            status: 'uploading',
            file: file,
          }));

          setUploadProgress(uploadTasks);

          for (const task of uploadTasks) {
            for (let progress = 0; progress <= 100; progress += 10) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              setUploadProgress((prev) =>
                prev.map((t) => (t.id === task.id ? { ...t, progress } : t))
              );
            }
          }

          await handleFileUpload(filesToUpload);
          setUploadProgress([]);
        };

        const handleFileUpload = async (uploadedFiles) => {
          try {
            const newFiles = [];
            for (const file of uploadedFiles) {
              const fileData = {
                name: file.name,
                size: file.size,
                type: file.type || 'application/octet-stream',
                mimeType: file.type || 'application/octet-stream',
              };
              const createdFile = await fileService.create(fileData);
              newFiles.push(createdFile);
            }
            setFiles((prev) => [...(prev || []), ...newFiles]);
            toast.success(`Successfully uploaded ${newFiles.length} file(s)`);
          } catch (err) {
            toast.error('Failed to upload files');
          }
        };

        const handleFileDelete = async (fileId) => {
          try {
            await fileService.delete(fileId);
            setFiles((prev) => (prev || []).filter((file) => file.id !== fileId));
            toast.success('File deleted successfully');
          } catch (err) {
            toast.error('Failed to delete file');
          }
        };

        const handleFileRename = async (fileId, newName) => {
          try {
            const updatedFile = await fileService.update(fileId, { name: newName });
            setFiles((prev) =>
              (prev || []).map((file) => (file.id === fileId ? updatedFile : file))
            );
            toast.success('File renamed successfully');
          } catch (err) {
            toast.error('Failed to rename file');
          }
        };

        const handleRename = (file) => {
          setEditingFile(file.id);
          setNewFileName(file.name);
        };

        const handleDelete = (file) => {
          setDeleteConfirm(file);
        };

        const confirmDelete = async () => {
          if (deleteConfirm) {
            await handleFileDelete(deleteConfirm.id);
            setDeleteConfirm(null);
          }
        };

        const handleDragOver = (e) => {
          e.preventDefault();
          setIsDragOver(true);
        };

        const handleDragLeave = (e) => {
          e.preventDefault();
          setIsDragOver(false);
        };

        const handleDrop = async (e) => {
          e.preventDefault();
          setIsDragOver(false);

          const droppedFiles = Array.from(e.dataTransfer.files);
          if (droppedFiles.length > 0) {
            await simulateUpload(droppedFiles);
          }
        };

        const handleFileSelect = (e) => {
          const selectedFiles = Array.from(e.target.files);
          if (selectedFiles.length > 0) {
            simulateUpload(selectedFiles);
          }
        };

        const formatFileSize = (bytes) => {
          if (bytes === 0) return '0 Bytes';
          const k = 1024;
          const sizes = ['Bytes', 'KB', 'MB', 'GB'];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        const getFileIcon = (type) => {
          if (type?.includes('image')) return 'Image';
          if (type?.includes('video')) return 'Video';
          if (type?.includes('audio')) return 'Music';
          if (type?.includes('pdf')) return 'FileText';
          if (type?.includes('document') || type?.includes('word')) return 'FileText';
          if (type?.includes('spreadsheet') || type?.includes('excel')) return 'Sheet';
          if (type?.includes('zip') || type?.includes('archive')) return 'Archive';
          return 'File';
        };

        const sortedFiles = [...(files || [])].sort((a, b) => {
          switch (sortBy) {
            case 'name':
              return (a.name || '').localeCompare(b.name || '');
            case 'size':
              return (b.size || 0) - (a.size || 0);
            case 'date':
              return (
                new Date(b.modifiedAt || b.createdAt || 0) -
                new Date(a.modifiedAt || a.createdAt || 0)
              );
            case 'type':
              return (a.type || '').localeCompare(b.type || '');
            default:
              return 0;
          }
        });

        const totalStorage = (files || []).reduce((sum, file) => sum + (file.size || 0), 0);
        const usedStoragePercent = Math.min(
          (totalStorage / (10 * 1024 * 1024 * 1024)) * 100,
          100
        ); // 10GB limit

        return (
          <MainLayout
            loading={loading}
            filesCount={(files || []).length}
            totalStorage={totalStorage}
            usedStoragePercent={usedStoragePercent}
            viewMode={viewMode}
            setViewMode={setViewMode}
          >
            <div className="space-y-6">
              <Toolbar sortBy={sortBy} onSortChange={setSortBy} />

              <UploadZone
                isDragOver={isDragOver}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleFileSelect={handleFileSelect}
              />

              <FileTable
                files={files}
                getFileIcon={getFileIcon}
                formatFileSize={formatFileSize}
                onRename={handleRename}
                onFileRename={handleFileRename}
                onDelete={handleDelete}
                editingFile={editingFile}
                newFileName={newFileName}
                setNewFileName={setNewFileName}
                setEditingFile={setEditingFile}
                sortedFiles={sortedFiles}
              />
            </div>

            <UploadProgressModal uploadProgress={uploadProgress} />

            <DeleteConfirmationModal
              deleteConfirm={deleteConfirm}
              setDeleteConfirm={setDeleteConfirm}
              confirmDelete={confirmDelete}
            />
          </MainLayout>
        );
      };

      export default HomePage;