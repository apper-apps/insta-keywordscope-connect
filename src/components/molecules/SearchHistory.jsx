import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const SearchHistory = ({ history = [], onSelectHistory, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <ApperIcon name="History" className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm">No search history yet</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Recent Searches</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="Trash2" className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
            onClick={() => onSelectHistory(item.seedKeyword)}
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900 truncate">{item.seedKeyword}</p>
              <p className="text-xs text-gray-500">
                {item.resultsCount} results • {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
            <ApperIcon name="ArrowRight" className="h-4 w-4 text-gray-400" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SearchHistory