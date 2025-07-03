import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import DifficultyGauge from '@/components/molecules/DifficultyGauge'

const KeywordTable = ({ keywords = [], loading = false, onSort }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    onSort(key, direction)
  }
  
  const formatVolume = (volume) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
    return volume.toLocaleString()
  }
  
  const formatCPC = (cpc) => {
    return `$${cpc.toFixed(2)}`
  }
  
  const getCompetitionBadge = (competition) => {
    const variants = {
      'Low': 'success',
      'Medium': 'warning',
      'High': 'error'
    }
    return variants[competition] || 'default'
  }
  
  const columns = [
    { key: 'keyword', label: 'Keyword', sortable: true },
    { key: 'searchVolume', label: 'Search Volume', sortable: true },
    { key: 'difficulty', label: 'Difficulty', sortable: true },
    { key: 'cpc', label: 'CPC', sortable: true },
    { key: 'competition', label: 'Competition', sortable: true },
  ]
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Keyword Variations ({keywords.length})
        </h3>
        <p className="text-sm text-gray-600">
          Related keywords with comprehensive metrics
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable && (
                      <div className="ml-2 flex flex-col">
                        <ApperIcon
                          name="ChevronUp"
                          className={`h-3 w-3 ${
                            sortConfig.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-primary'
                              : 'text-gray-400'
                          }`}
                        />
                        <ApperIcon
                          name="ChevronDown"
                          className={`h-3 w-3 -mt-1 ${
                            sortConfig.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-primary'
                              : 'text-gray-400'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {keywords.map((keyword, index) => (
                <motion.tr
                  key={keyword.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{keyword.keyword}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {formatVolume(keyword.searchVolume)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DifficultyGauge difficulty={keyword.difficulty} size="sm" />
                      <span className="ml-2 text-sm text-gray-900">
                        {keyword.difficulty}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {formatCPC(keyword.cpc)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getCompetitionBadge(keyword.competition)}>
                      {keyword.competition}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {keywords.length === 0 && !loading && (
        <div className="text-center py-12">
          <ApperIcon name="Search" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No keyword variations found</p>
        </div>
      )}
    </div>
  )
}

export default KeywordTable