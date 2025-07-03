import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Empty from '@/components/ui/Empty'

const SerpPreview = ({ keyword, results, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <ApperIcon name="Globe" size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">SERP Preview</h3>
        </div>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <ApperIcon name="Globe" size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">SERP Preview</h3>
        </div>
        <div className="text-center py-8">
          <ApperIcon name="AlertCircle" size={48} className="mx-auto text-red-500 mb-4" />
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!keyword || !results || results.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <ApperIcon name="Globe" size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">SERP Preview</h3>
        </div>
        <Empty
          icon="Search"
          title="No SERP Results"
          description="Click on a keyword to see search engine results preview"
        />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <ApperIcon name="Globe" size={20} className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">SERP Preview</h3>
        <span className="text-sm text-gray-500">for "{keyword}"</span>
      </div>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-medium text-blue-600 hover:underline cursor-pointer mb-1 line-clamp-2">
                  {result.title}
                </h4>
                <p className="text-xs text-green-600 mb-2">{result.url}</p>
                <p className="text-sm text-gray-600 line-clamp-3">{result.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SerpPreview