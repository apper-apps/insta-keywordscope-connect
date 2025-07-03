import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import SearchBar from '@/components/molecules/SearchBar'
import KeywordMetrics from '@/components/organisms/KeywordMetrics'
import KeywordTable from '@/components/organisms/KeywordTable'
import SearchHistory from '@/components/molecules/SearchHistory'
import ExportButton from '@/components/molecules/ExportButton'
import SerpPreview from '@/components/organisms/SerpPreview'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { keywordService } from '@/services/api/keywordService'
import { searchHistoryService } from '@/services/api/searchHistoryService'

const KeywordResearch = () => {
  const [keywords, setKeywords] = useState([])
  const [currentKeyword, setCurrentKeyword] = useState('')
  const [currentMetrics, setCurrentMetrics] = useState(null)
  const [searchHistory, setSearchHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedKeyword, setSelectedKeyword] = useState('')
  const [serpResults, setSerpResults] = useState([])
  const [serpLoading, setSerpLoading] = useState(false)
  const [serpError, setSerpError] = useState('')
  useEffect(() => {
    loadSearchHistory()
  }, [])
  
  const loadSearchHistory = async () => {
    try {
      const history = await searchHistoryService.getAll()
      setSearchHistory(history)
    } catch (err) {
      console.error('Failed to load search history:', err)
    }
  }
  
  const handleSearch = async (keyword) => {
    setLoading(true)
    setError('')
    
    try {
      // Get keyword metrics
      const metrics = await keywordService.getKeywordMetrics(keyword)
      setCurrentKeyword(keyword)
      setCurrentMetrics(metrics)
      
      // Get keyword variations
      const variations = await keywordService.getKeywordVariations(keyword)
      setKeywords(variations)
      
      // Save to search history
      await searchHistoryService.create({
        seedKeyword: keyword,
        timestamp: new Date().toISOString(),
        resultsCount: variations.length
      })
      
      // Reload history
      await loadSearchHistory()
      
      toast.success(`Found ${variations.length} keyword variations for "${keyword}"`)
    } catch (err) {
      setError(err.message || 'Failed to analyze keyword')
      toast.error('Failed to analyze keyword')
    } finally {
      setLoading(false)
    }
  }
  
  const handleSort = (key, direction) => {
    const sortedKeywords = [...keywords].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1
      } else {
        return a[key] < b[key] ? 1 : -1
      }
    })
    setKeywords(sortedKeywords)
  }
  
  const handleExport = (format) => {
    const dataToExport = {
      seedKeyword: currentKeyword,
      metrics: currentMetrics,
      variations: keywords,
      exportedAt: new Date().toISOString()
    }
    
    let content = ''
    let filename = `keywords_${currentKeyword.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`
    
    switch (format) {
      case 'csv':
        content = convertToCSV(keywords)
        filename += '.csv'
        break
      case 'json':
        content = JSON.stringify(dataToExport, null, 2)
        filename += '.json'
        break
      case 'excel':
        content = convertToCSV(keywords)
        filename += '.csv'
        break
      default:
        content = convertToCSV(keywords)
        filename += '.csv'
    }
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success(`Exported ${keywords.length} keywords as ${format.toUpperCase()}`)
  }
  
  const convertToCSV = (data) => {
    const headers = ['Keyword', 'Search Volume', 'Difficulty', 'CPC', 'Competition']
    const rows = data.map(item => [
      item.keyword,
      item.searchVolume,
      item.difficulty,
      item.cpc,
      item.competition
    ])
    
    return [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')
  }
const handleSelectHistory = (keyword) => {
    handleSearch(keyword)
  }

  const handleKeywordSelect = async (keyword) => {
    setSelectedKeyword(keyword)
    setSerpLoading(true)
    setSerpError('')
    
    try {
      const results = await keywordService.getSerpResults(keyword)
      setSerpResults(results)
      toast.success(`Loaded SERP results for "${keyword}"`)
    } catch (err) {
      setSerpError(err.message || 'Failed to load SERP results')
      toast.error('Failed to load SERP results')
    } finally {
      setSerpLoading(false)
    }
  }

  const retrySerpResults = () => {
    if (selectedKeyword) {
      handleKeywordSelect(selectedKeyword)
    }
  }
  const handleClearHistory = async () => {
    try {
      const allHistory = await searchHistoryService.getAll()
      for (const item of allHistory) {
        await searchHistoryService.delete(item.Id)
      }
      setSearchHistory([])
      toast.success('Search history cleared')
    } catch (err) {
      toast.error('Failed to clear search history')
    }
  }
  
  const retrySearch = () => {
    if (currentKeyword) {
      handleSearch(currentKeyword)
    }
  }
  
  if (loading && !currentKeyword) {
    return <Loading />
  }
  
  if (error && !currentKeyword) {
    return <Error message={error} onRetry={retrySearch} />
  }
  
  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional <span className="gradient-text">Keyword Research</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover high-performing keywords with comprehensive metrics including search volume, difficulty, and CPC data
          </p>
        </motion.div>
        
        <SearchBar 
          onSearch={handleSearch} 
          loading={loading}
          placeholder="Enter seed keyword to analyze..."
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search History Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <SearchHistory
              history={searchHistory}
              onSelectHistory={handleSelectHistory}
              onClearHistory={handleClearHistory}
            />
          </div>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-3">
          {error && currentKeyword && (
            <Error message={error} onRetry={retrySearch} />
          )}
          
          {!error && currentKeyword && currentMetrics && (
            <KeywordMetrics 
              keyword={currentKeyword}
              metrics={currentMetrics}
            />
          )}
          
{!error && keywords.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Keyword Variations
                </h2>
                <ExportButton
                  data={keywords}
                  onExport={handleExport}
                  disabled={loading}
                />
              </div>
              
              <KeywordTable
                keywords={keywords}
                loading={loading}
                onSort={handleSort}
                onKeywordSelect={handleKeywordSelect}
              />
            </div>
          )}
          {!error && !loading && !currentKeyword && (
            <Empty
              icon="Search"
              title="Start Your Keyword Research"
              description="Enter a seed keyword above to discover related keywords with comprehensive SEO metrics"
              actionLabel="Try Example: 'digital marketing'"
              onAction={() => handleSearch('digital marketing')}
            />
          )}
          
          {!error && !loading && currentKeyword && keywords.length === 0 && (
            <Empty
              icon="AlertCircle"
              title="No Keyword Variations Found"
              description={`No related keywords found for "${currentKeyword}". Try a different seed keyword.`}
              actionLabel="Try Different Keyword"
              onAction={() => handleSearch('SEO tools')}
            />
)}
        </div>
      </div>
      
      {/* SERP Preview Section */}
      {(selectedKeyword || serpResults.length > 0 || serpLoading || serpError) && (
        <div className="mt-8">
          <SerpPreview
            keyword={selectedKeyword}
            results={serpResults}
            loading={serpLoading}
            error={serpError}
            onRetry={retrySerpResults}
          />
        </div>
      )}
    </div>
  )
}

export default KeywordResearch