import searchHistoryData from '@/services/mockData/searchHistory.json'

class SearchHistoryService {
  constructor() {
    this.searchHistory = [...searchHistoryData]
  }

  async delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return this.searchHistory
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5)
      .map(item => ({
        id: item.Id.toString(),
        seedKeyword: item.seedKeyword,
        timestamp: item.timestamp,
        resultsCount: item.resultsCount
      }))
  }

  async getById(id) {
    await this.delay()
    const item = this.searchHistory.find(h => h.Id === parseInt(id))
    if (!item) {
      throw new Error(`Search history item with id ${id} not found`)
    }
    return {
      id: item.Id.toString(),
      seedKeyword: item.seedKeyword,
      timestamp: item.timestamp,
      resultsCount: item.resultsCount
    }
  }

  async create(historyData) {
    await this.delay()
    const newId = Math.max(...this.searchHistory.map(h => h.Id)) + 1
    const newItem = {
      Id: newId,
      seedKeyword: historyData.seedKeyword,
      timestamp: historyData.timestamp,
      resultsCount: historyData.resultsCount
    }
    
    this.searchHistory.push(newItem)
    return {
      id: newItem.Id.toString(),
      seedKeyword: newItem.seedKeyword,
      timestamp: newItem.timestamp,
      resultsCount: newItem.resultsCount
    }
  }

  async update(id, historyData) {
    await this.delay()
    const index = this.searchHistory.findIndex(h => h.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Search history item with id ${id} not found`)
    }
    
    this.searchHistory[index] = {
      ...this.searchHistory[index],
      ...historyData,
      Id: parseInt(id)
    }
    
    return {
      id: this.searchHistory[index].Id.toString(),
      seedKeyword: this.searchHistory[index].seedKeyword,
      timestamp: this.searchHistory[index].timestamp,
      resultsCount: this.searchHistory[index].resultsCount
    }
  }

  async delete(id) {
    await this.delay()
    const index = this.searchHistory.findIndex(h => h.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Search history item with id ${id} not found`)
    }
    
    this.searchHistory.splice(index, 1)
    return true
  }
}

export const searchHistoryService = new SearchHistoryService()