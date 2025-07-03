import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
                <ApperIcon name="Search" className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">KeywordScope</h1>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-sm text-gray-600 flex items-center"
            >
              <ApperIcon name="Zap" className="h-4 w-4 mr-1 text-success" />
              Professional SEO Tool
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header