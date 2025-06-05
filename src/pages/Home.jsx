import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import fileService from '../services/api/fileService'
import folderService from '../services/api/folderService'

const Home = () => {
  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('list')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [filesResult, foldersResult] = await Promise.all([
          fileService.getAll(),
          folderService.getAll()
        ])
        setFiles(filesResult || [])
        setFolders(foldersResult || [])
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load files")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleFileUpload = async (uploadedFiles) => {
    try {
      const newFiles = []
      for (const file of uploadedFiles) {
        const fileData = {
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
          mimeType: file.type || 'application/octet-stream'
        }
        const createdFile = await fileService.create(fileData)
        newFiles.push(createdFile)
      }
      setFiles(prev => [...(prev || []), ...newFiles])
      toast.success(`Successfully uploaded ${newFiles.length} file(s)`)
    } catch (err) {
      toast.error("Failed to upload files")
    }
  }

  const handleFileDelete = async (fileId) => {
    try {
      await fileService.delete(fileId)
      setFiles(prev => (prev || []).filter(file => file.id !== fileId))
      toast.success("File deleted successfully")
    } catch (err) {
      toast.error("Failed to delete file")
    }
  }

  const handleFileRename = async (fileId, newName) => {
    try {
      const updatedFile = await fileService.update(fileId, { name: newName })
      setFiles(prev => (prev || []).map(file => 
        file.id === fileId ? updatedFile : file
      ))
      toast.success("File renamed successfully")
    } catch (err) {
      toast.error("Failed to rename file")
    }
  }

  const totalStorage = (files || []).reduce((sum, file) => sum + (file.size || 0), 0)
  const usedStoragePercent = Math.min((totalStorage / (10 * 1024 * 1024 * 1024)) * 100, 100) // 10GB limit

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="Loader2" className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading your files...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                  <ApperIcon name="Folder" className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">SwiftFiles</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search coming soon..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  disabled
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <ApperIcon name="List" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <ApperIcon name="Grid3X3" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-60 flex-shrink-0"
          >
            <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Access</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <ApperIcon name="Clock" className="w-4 h-4" />
                      <span>Recent</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <ApperIcon name="Star" className="w-4 h-4" />
                      <span>Favorites</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Folders</h3>
                  <div className="text-sm text-gray-500 px-3 py-2">
                    Folder organization coming soon
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Storage</h3>
                  <div className="px-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Used</span>
                      <span>{usedStoragePercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${usedStoragePercent}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Analytics coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <MainFeature 
              files={files || []}
              onFileUpload={handleFileUpload}
              onFileDelete={handleFileDelete}
              onFileRename={handleFileRename}
              viewMode={viewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-600"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>{(files || []).length} files</span>
          <span>
            {(totalStorage / (1024 * 1024)).toFixed(1)} MB used
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default Home