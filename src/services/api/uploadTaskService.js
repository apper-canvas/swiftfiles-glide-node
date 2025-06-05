import uploadTasksData from '../mockData/uploadTasks.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let uploadTasks = [...uploadTasksData]

const uploadTaskService = {
  async getAll() {
    await delay(200)
    return [...uploadTasks]
  },

  async getById(id) {
    await delay(150)
    const task = uploadTasks.find(t => t.id === id)
    return task ? { ...task } : null
  },

  async create(taskData) {
    await delay(300)
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      progress: 0,
      status: 'pending'
    }
    uploadTasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(200)
    const index = uploadTasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Upload task not found')
    
    uploadTasks[index] = {
      ...uploadTasks[index],
      ...updates
    }
    return { ...uploadTasks[index] }
  },

  async delete(id) {
    await delay(200)
    const index = uploadTasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Upload task not found')
    
    uploadTasks.splice(index, 1)
    return true
  }
}

export default uploadTaskService