import { motion } from 'framer-motion'

const DifficultyGauge = ({ difficulty, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }
  
  const getDifficultyColor = (diff) => {
    if (diff <= 30) return '#10B981' // Green
    if (diff <= 60) return '#F59E0B' // Yellow
    if (diff <= 80) return '#EF4444' // Red
    return '#DC2626' // Dark Red
  }
  
  const getDifficultyLabel = (diff) => {
    if (diff <= 30) return 'Easy'
    if (diff <= 60) return 'Medium'
    if (diff <= 80) return 'Hard'
    return 'Very Hard'
  }
  
  const circumference = 2 * Math.PI * 20
  const strokeDashoffset = circumference - (difficulty / 100) * circumference
  
  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="50%"
          cy="50%"
          r="20"
          stroke="#E5E7EB"
          strokeWidth="4"
          fill="none"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="20"
          stroke={getDifficultyColor(difficulty)}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-sm font-bold text-gray-900"
        >
          {difficulty}
        </motion.span>
        <span className="text-xs text-gray-500">{getDifficultyLabel(difficulty)}</span>
      </div>
    </div>
  )
}

export default DifficultyGauge