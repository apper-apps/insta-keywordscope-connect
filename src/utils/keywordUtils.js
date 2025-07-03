export const getDifficultyColor = (difficulty) => {
  if (difficulty <= 30) return '#10B981' // Green
  if (difficulty <= 60) return '#F59E0B' // Yellow
  if (difficulty <= 80) return '#EF4444' // Red
  return '#DC2626' // Dark Red
}

export const getDifficultyLabel = (difficulty) => {
  if (difficulty <= 30) return 'Easy'
  if (difficulty <= 60) return 'Medium'
  if (difficulty <= 80) return 'Hard'
  return 'Very Hard'
}

export const formatSearchVolume = (volume) => {
  if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
  if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
  return volume.toLocaleString()
}

export const formatCPC = (cpc) => {
  return `$${cpc.toFixed(2)}`
}

export const getCompetitionColor = (competition) => {
  const colors = {
    'Low': '#10B981',
    'Medium': '#F59E0B',
    'High': '#EF4444'
  }
  return colors[competition] || '#6B7280'
}

export const sortKeywords = (keywords, sortKey, direction) => {
  return [...keywords].sort((a, b) => {
    let aValue = a[sortKey]
    let bValue = b[sortKey]
    
    // Handle string comparisons
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}

export const filterKeywords = (keywords, filters) => {
  return keywords.filter(keyword => {
    // Filter by search volume range
    if (filters.minVolume && keyword.searchVolume < filters.minVolume) {
      return false
    }
    if (filters.maxVolume && keyword.searchVolume > filters.maxVolume) {
      return false
    }
    
    // Filter by difficulty range
    if (filters.minDifficulty && keyword.difficulty < filters.minDifficulty) {
      return false
    }
    if (filters.maxDifficulty && keyword.difficulty > filters.maxDifficulty) {
      return false
    }
    
    // Filter by competition level
    if (filters.competition && keyword.competition !== filters.competition) {
      return false
    }
    
    // Filter by keyword text
    if (filters.searchText && !keyword.keyword.toLowerCase().includes(filters.searchText.toLowerCase())) {
      return false
    }
    
    return true
  })
}