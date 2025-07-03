import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const ExportButton = ({ data = [], onExport, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const exportFormats = [
    { id: 'csv', label: 'CSV File', icon: 'FileText' },
    { id: 'json', label: 'JSON File', icon: 'Code' },
    { id: 'excel', label: 'Excel File', icon: 'Table' }
  ]
  
  const handleExport = (format) => {
    onExport(format)
    setIsOpen(false)
  }
  
  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || data.length === 0}
        className="flex items-center"
      >
        <ApperIcon name="Download" className="h-4 w-4 mr-2" />
        Export ({data.length})
        <ApperIcon name="ChevronDown" className="h-4 w-4 ml-2" />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
          >
            <div className="py-2">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleExport(format.id)}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <ApperIcon name={format.icon} className="h-4 w-4 mr-3" />
                  {format.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default ExportButton