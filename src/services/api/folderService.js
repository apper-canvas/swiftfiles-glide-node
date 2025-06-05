import foldersData from '../mockData/folders.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let folders = [...foldersData]

const folderService = {
  async getAll() {
    await delay(280)
    return [...folders]
  },

  async getById(id) {
    await delay(250)
    const folder = folders.find(f => f.id === id)
    return folder ? { ...folder } : null
  },

  async create(folderData) {
    await delay(400)
    const newFolder = {
      ...folderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      childCount: 0,
      path: folderData.parentId ? 
        `/folders/${folderData.parentId}/${folderData.name}` : 
        `/folders/${folderData.name}`
    }
    folders.push(newFolder)
    return { ...newFolder }
  },

  async update(id, updates) {
    await delay(350)
    const index = folders.findIndex(f => f.id === id)
    if (index === -1) throw new Error('Folder not found')
    
    folders[index] = {
      ...folders[index],
      ...updates
    }
    return { ...folders[index] }
  },

  async delete(id) {
    await delay(300)
    const index = folders.findIndex(f => f.id === id)
    if (index === -1) throw new Error('Folder not found')
    
    folders.splice(index, 1)
    return true
  }
}

export default folderService