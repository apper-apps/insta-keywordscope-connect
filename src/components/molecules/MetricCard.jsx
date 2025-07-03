import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  description,
  trend,
  className = '',
  ...props 
}) => {
  const colorClasses = {
    primary: 'border-l-primary bg-gradient-to-r from-purple-50 to-white',
    success: 'border-l-success bg-gradient-to-r from-green-50 to-white',
    warning: 'border-l-warning bg-gradient-to-r from-yellow-50 to-white',
    error: 'border-l-error bg-gradient-to-r from-red-50 to-white',
    info: 'border-l-info bg-gradient-to-r from-blue-50 to-white'
  }
  
  const iconColors = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info'
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-xl shadow-sm border-l-4 ${colorClasses[color]} p-6 hover:shadow-lg transition-all duration-200 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <ApperIcon name={icon} className={`h-5 w-5 ${iconColors[color]} mr-2`} />
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          <motion.p
            key={value}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-bold text-gray-900"
          >
            {value}
          </motion.p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-success' : 'text-error'}`}>
            <ApperIcon name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} className="h-4 w-4 mr-1" />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default MetricCard