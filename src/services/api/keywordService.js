import keywordsData from '@/services/mockData/keywords.json'
import keywordVariationsData from '@/services/mockData/keywordVariations.json'

class KeywordService {
  constructor() {
    this.keywords = [...keywordsData]
    this.keywordVariations = [...keywordVariationsData]
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getKeywordMetrics(keyword) {
    await this.delay(400)
    
    // Find existing keyword or generate metrics
    const existingKeyword = this.keywords.find(k => 
      k.keyword.toLowerCase() === keyword.toLowerCase()
    )
    
    if (existingKeyword) {
      return {
        searchVolume: existingKeyword.searchVolume,
        difficulty: existingKeyword.difficulty,
        cpc: existingKeyword.cpc,
        competition: existingKeyword.competition
      }
    }
    
    // Generate realistic metrics for new keywords
    const metrics = this.generateKeywordMetrics(keyword)
    return metrics
  }

  async getKeywordVariations(keyword) {
    await this.delay(600)
    
    // Get existing variations or generate new ones
    const existingVariations = this.keywordVariations.filter(v => 
      v.parentId.toLowerCase() === keyword.toLowerCase()
    )
    
    if (existingVariations.length > 0) {
      return existingVariations.map(v => ({
        id: v.Id.toString(),
        keyword: v.keyword,
        searchVolume: v.searchVolume,
        difficulty: v.difficulty,
        cpc: v.cpc,
        competition: v.competition
      }))
    }
    
    // Generate variations for new keywords
    const variations = this.generateKeywordVariations(keyword)
    return variations
  }

  generateKeywordMetrics(keyword) {
    // Generate realistic metrics based on keyword characteristics
    const wordCount = keyword.split(' ').length
    const baseVolume = Math.floor(Math.random() * 50000) + 5000
    
    return {
      searchVolume: Math.floor(baseVolume / wordCount),
      difficulty: Math.floor(Math.random() * 80) + 20,
      cpc: +(Math.random() * 8 + 1).toFixed(2),
      competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
    }
  }

  generateKeywordVariations(seedKeyword) {
    const modifiers = [
      'best', 'top', 'free', 'online', 'guide', 'tips', 'tools', 'strategy',
      'examples', 'course', 'training', 'software', 'services', 'agency',
      'consultant', 'expert', 'plan', 'campaign', 'automation', 'trends'
    ]
    
    const suffixes = [
      'for beginners', 'for small business', '2024', 'checklist', 'template',
      'best practices', 'case study', 'tutorial', 'comparison', 'review'
    ]
    
    const variations = []
    
    // Generate modifier variations
    modifiers.slice(0, 8).forEach((modifier, index) => {
      const keyword = `${modifier} ${seedKeyword}`
      variations.push({
        id: (index + 1).toString(),
        keyword: keyword,
        searchVolume: Math.floor(Math.random() * 25000) + 2000,
        difficulty: Math.floor(Math.random() * 70) + 15,
        cpc: +(Math.random() * 7 + 1.5).toFixed(2),
        competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
      })
    })
    
    // Generate suffix variations
    suffixes.slice(0, 7).forEach((suffix, index) => {
      const keyword = `${seedKeyword} ${suffix}`
      variations.push({
        id: (index + 9).toString(),
        keyword: keyword,
        searchVolume: Math.floor(Math.random() * 15000) + 1000,
        difficulty: Math.floor(Math.random() * 60) + 10,
        cpc: +(Math.random() * 6 + 1).toFixed(2),
        competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
      })
    })
    
    return variations
  }

  async getAll() {
    await this.delay()
    return this.keywords.map(keyword => ({
      id: keyword.Id.toString(),
      keyword: keyword.keyword,
      searchVolume: keyword.searchVolume,
      difficulty: keyword.difficulty,
      cpc: keyword.cpc,
      competition: keyword.competition,
      timestamp: keyword.timestamp
    }))
  }

  async getById(id) {
    await this.delay()
    const keyword = this.keywords.find(k => k.Id === parseInt(id))
    if (!keyword) {
      throw new Error(`Keyword with id ${id} not found`)
    }
    return {
      id: keyword.Id.toString(),
      keyword: keyword.keyword,
      searchVolume: keyword.searchVolume,
      difficulty: keyword.difficulty,
      cpc: keyword.cpc,
      competition: keyword.competition,
      timestamp: keyword.timestamp
    }
  }

  async create(keywordData) {
    await this.delay()
    const newId = Math.max(...this.keywords.map(k => k.Id)) + 1
    const newKeyword = {
      Id: newId,
      keyword: keywordData.keyword,
      searchVolume: keywordData.searchVolume,
      difficulty: keywordData.difficulty,
      cpc: keywordData.cpc,
      competition: keywordData.competition,
      timestamp: new Date().toISOString()
    }
    
    this.keywords.push(newKeyword)
    return {
      id: newKeyword.Id.toString(),
      keyword: newKeyword.keyword,
      searchVolume: newKeyword.searchVolume,
      difficulty: newKeyword.difficulty,
      cpc: newKeyword.cpc,
      competition: newKeyword.competition,
      timestamp: newKeyword.timestamp
    }
  }

  async update(id, keywordData) {
    await this.delay()
    const index = this.keywords.findIndex(k => k.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Keyword with id ${id} not found`)
    }
    
    this.keywords[index] = {
      ...this.keywords[index],
      ...keywordData,
      Id: parseInt(id)
    }
    
    return {
      id: this.keywords[index].Id.toString(),
      keyword: this.keywords[index].keyword,
      searchVolume: this.keywords[index].searchVolume,
      difficulty: this.keywords[index].difficulty,
      cpc: this.keywords[index].cpc,
      competition: this.keywords[index].competition,
      timestamp: this.keywords[index].timestamp
    }
  }

  async delete(id) {
    await this.delay()
    const index = this.keywords.findIndex(k => k.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Keyword with id ${id} not found`)
    }
    
this.keywords.splice(index, 1)
    return true
  }

  async getSerpResults(keyword) {
    await this.delay(500)
    
    // Generate mock SERP results
    const serpResults = this.generateSerpResults(keyword)
    return serpResults
  }

  generateSerpResults(keyword) {
    const domains = [
      'wikipedia.org', 'hubspot.com', 'moz.com', 'ahrefs.com', 'searchengineland.com',
      'neil-patel.com', 'backlinko.com', 'semrush.com', 'wordstream.com', 'contentmarketinginstitute.com'
    ]
    
    const titleTemplates = [
      `${keyword} - Complete Guide 2024`,
      `Best ${keyword} Strategies That Actually Work`,
      `The Ultimate ${keyword} Guide for Beginners`,
      `${keyword}: Everything You Need to Know`,
      `How to Master ${keyword} in 2024`,
      `${keyword} Best Practices and Tips`,
      `Advanced ${keyword} Techniques`,
      `${keyword} vs Alternatives: Complete Comparison`,
      `Free ${keyword} Tools and Resources`,
      `${keyword} Case Studies and Examples`
    ]
    
    const descriptionTemplates = [
      `Learn everything about ${keyword} with our comprehensive guide. Discover proven strategies, best practices, and expert tips to get started today.`,
      `Master ${keyword} with step-by-step tutorials and real-world examples. Our expert-backed approach helps you achieve better results faster.`,
      `Get the most complete ${keyword} resource online. Includes templates, checklists, and case studies from industry leaders.`,
      `Transform your ${keyword} strategy with actionable insights from top experts. Free tools and resources included.`,
      `The definitive guide to ${keyword} success. Learn from 100+ case studies and implement proven strategies that work.`,
      `Everything you need to know about ${keyword} in one place. From basics to advanced techniques, we've got you covered.`,
      `Discover the latest ${keyword} trends and best practices. Updated regularly with new insights and strategies.`,
      `Join thousands who've improved their ${keyword} results. Get instant access to our complete toolkit and resources.`
    ]
    
    const results = []
    const numResults = Math.floor(Math.random() * 5) + 5 // 5-9 results
    
    for (let i = 0; i < numResults; i++) {
      const domain = domains[Math.floor(Math.random() * domains.length)]
      const title = titleTemplates[Math.floor(Math.random() * titleTemplates.length)]
      const description = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)]
      
      results.push({
        id: (i + 1).toString(),
        title: title,
        url: `https://${domain}/${keyword.toLowerCase().replace(/\s+/g, '-')}`,
        description: description,
        position: i + 1
      })
    }
    
    return results
  }
}

export const keywordService = new KeywordService()