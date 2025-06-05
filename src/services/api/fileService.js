import filesData from '../mockData/files.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let files = [...filesData]

const fileService = {
  async getAll() {
    await delay(300)
    return [...files]
  },

  async getById(id) {
    await delay(250)
    const file = files.find(f => f.id === id)
    return file ? { ...file } : null
  },

  async create(fileData) {
    await delay(400)
    const newFile = {
      ...fileData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      path: `/files/${fileData.name}`,
      parentFolderId: null
    }
    files.push(newFile)
    return { ...newFile }
  },

  async update(id, updates) {
    await delay(350)
    const index = files.findIndex(f => f.id === id)
    if (index === -1) throw new Error('File not found')
    
    files[index] = {
      ...files[index],
      ...updates,
      modifiedAt: new Date().toISOString()
    }
    return { ...files[index] }
  },

  async delete(id) {
    await delay(300)
    const index = files.findIndex(f => f.id === id)
    if (index === -1) throw new Error('File not found')
    
    files.splice(index, 1)
    return true
  }
}

export default fileService