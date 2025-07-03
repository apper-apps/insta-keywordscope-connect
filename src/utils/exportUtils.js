export const exportToCSV = (data, filename) => {
  const headers = ['Keyword', 'Search Volume', 'Difficulty', 'CPC', 'Competition']
  const rows = data.map(item => [
    item.keyword,
    item.searchVolume,
    item.difficulty,
    item.cpc,
    item.competition
  ])
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n')
  
  downloadFile(csvContent, `${filename}.csv`, 'text/csv')
}

export const exportToJSON = (data, filename) => {
  const jsonContent = JSON.stringify(data, null, 2)
  downloadFile(jsonContent, `${filename}.json`, 'application/json')
}

export const exportToExcel = (data, filename) => {
  // For simplicity, we'll export as CSV which can be opened in Excel
  exportToCSV(data, filename)
}

const downloadFile = (content, filename, contentType) => {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export const formatKeywordData = (keywords, seedKeyword) => {
  return {
    seedKeyword,
    exportedAt: new Date().toISOString(),
    totalKeywords: keywords.length,
    keywords: keywords.map(k => ({
      keyword: k.keyword,
      searchVolume: k.searchVolume,
      difficulty: k.difficulty,
      cpc: k.cpc,
      competition: k.competition
    }))
  }
}