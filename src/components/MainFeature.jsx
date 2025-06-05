import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = ({ 
  files = [], 
  onFileUpload, 
  onFileDelete, 
  onFileRename, 
  viewMode = 'list',
  sortBy = 'name',
  onSortChange 
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState([])
  const [editingFile, setEditingFile] = useState(null)
  const [newFileName, setNewFileName] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const fileInputRef = useRef(null)

  // File operations
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      await simulateUpload(droppedFiles)
    }
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length > 0) {
      simulateUpload(selectedFiles)
    }
  }

  const simulateUpload = async (filesToUpload) => {
    const uploadTasks = filesToUpload.map(file => ({
      id: Date.now() + Math.random(),
      fileName: file.name,
      progress: 0,
      status: 'uploading',
      file: file
    }))

    setUploadProgress(uploadTasks)

    // Simulate upload progress
    for (const task of uploadTasks) {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        setUploadProgress(prev => 
          prev.map(t => t.id === task.id ? { ...t, progress } : t)
        )
      }
    }

    // Complete upload
    await onFileUpload(filesToUpload)
    setUploadProgress([])
  }

  const handleRename = (file) => {
    setEditingFile(file.id)
    setNewFileName(file.name)
  }

  const saveRename = async () => {
    if (newFileName.trim() && editingFile) {
      await onFileRename(editingFile, newFileName.trim())
      setEditingFile(null)
      setNewFileName('')
    }
  }

  const cancelRename = () => {
    setEditingFile(null)
    setNewFileName('')
  }

  const handleDelete = (file) => {
    setDeleteConfirm(file)
  }

  const confirmDelete = async () => {
    if (deleteConfirm) {
      await onFileDelete(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type) => {
    if (type?.includes('image')) return 'Image'
    if (type?.includes('video')) return 'Video'
    if (type?.includes('audio')) return 'Music'
    if (type?.includes('pdf')) return 'FileText'
    if (type?.includes('document') || type?.includes('word')) return 'FileText'
    if (type?.includes('spreadsheet') || type?.includes('excel')) return 'Sheet'
    if (type?.includes('zip') || type?.includes('archive')) return 'Archive'
    return 'File'
  }

  const sortedFiles = [...files].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '')
      case 'size':
        return (b.size || 0) - (a.size || 0)
      case 'date':
        return new Date(b.modifiedAt || b.createdAt || 0) - new Date(a.modifiedAt || a.createdAt || 0)
      case 'type':
        return (a.type || '').localeCompare(b.type || '')
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-xl shadow-soft border border-gray-200 p-4"
      >
        <div className="flex items-center space-x-3">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
            <option value="size">Sort by Size</option>
            <option value="type">Sort by Type</option>
          </select>

          <button 
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative group"
            title="Advanced filtering coming soon"
          >
            <ApperIcon name="Filter" className="w-4 h-4" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Advanced filtering coming soon
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative group"
            title="Folders coming soon"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="FolderPlus" className="w-4 h-4" />
              <span>New Folder</span>
            </div>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Folders coming soon
            </span>
          </button>
        </div>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
          isDragOver 
            ? 'border-primary bg-primary bg-opacity-5 scale-102' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 sm:p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ApperIcon name="Upload" className={`w-8 h-8 ${isDragOver ? 'text-primary' : 'text-gray-400'}`} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drop files here or click to browse
          </h3>
          <p className="text-gray-600 mb-6">
            Support for multiple file formats and batch uploads
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center space-x-2"
          >
            <ApperIcon name="FolderOpen" className="w-4 h-4" />
            <span>Choose Files</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </motion.div>

      {/* File List */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden"
      >
        {files.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ApperIcon name="FileX" className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files yet</h3>
            <p className="text-gray-600">Upload your first file to get started</p>
          </div>
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
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <ApperIcon 
                            name={getFileIcon(file.type)} 
                            className="w-5 h-5 text-gray-500 flex-shrink-0" 
                          />
                          {editingFile === file.id ? (
                            <div className="flex items-center space-x-2 flex-1">
                              <input
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveRename()
                                  if (e.key === 'Escape') cancelRename()
                                }}
                              />
                              <button
                                onClick={saveRename}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                              >
                                <ApperIcon name="Check" className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelRename}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <ApperIcon name="X" className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <span 
                              className="text-gray-900 font-medium cursor-pointer hover:text-primary transition-colors truncate"
                              onDoubleClick={() => handleRename(file)}
                              title="Double-click to rename"
                            >
                              {file.name || 'Untitled'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 hidden sm:table-cell">
                        {formatFileSize(file.size || 0)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 hidden md:table-cell">
                        {file.type?.split('/')[1]?.toUpperCase() || 'Unknown'}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 hidden lg:table-cell">
                        {file.modifiedAt ? format(new Date(file.modifiedAt), 'MMM d, yyyy') : 'Unknown'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toast.info("Download feature coming soon")}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <ApperIcon name="Download" className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRename(file)}
                            className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Rename"
                          >
                            <ApperIcon name="Edit2" className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toast.info("File sharing launching soon")}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Share - Coming Soon"
                          >
                            <ApperIcon name="Share2" className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(file)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Upload Progress Modal */}
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
                <h3 className="text-lg font-semibold text-gray-900">Uploading Files</h3>
                <ApperIcon name="Upload" className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-3">
                {uploadProgress.map((task) => (
                  <div key={task.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 truncate">{task.fileName}</span>
                      <span className="text-gray-500">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300 progress-shimmer"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
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
                  <ApperIcon name="AlertTriangle" className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete File</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">File:</span> {deleteConfirm.name}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature