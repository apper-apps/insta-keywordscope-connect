import { motion } from 'framer-motion'
import MetricCard from '@/components/molecules/MetricCard'
import DifficultyGauge from '@/components/molecules/DifficultyGauge'

const KeywordMetrics = ({ keyword, metrics }) => {
  if (!keyword || !metrics) return null
  
  const formatVolume = (volume) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
    return volume.toLocaleString()
  }
  
  const formatCPC = (cpc) => {
    return `$${cpc.toFixed(2)}`
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Keyword Analysis for "{keyword}"
        </h2>
        <p className="text-gray-600">
          Comprehensive metrics and insights for your seed keyword
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Search Volume"
          value={formatVolume(metrics.searchVolume)}
          icon="TrendingUp"
          color="success"
          description="Monthly searches"
        />
        
        <MetricCard
          title="Cost Per Click"
          value={formatCPC(metrics.cpc)}
          icon="DollarSign"
          color="info"
          description="Average CPC"
        />
        
        <MetricCard
          title="Competition"
          value={metrics.competition}
          icon="Target"
          color="warning"
          description="Advertiser competition"
        />
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-4">Keyword Difficulty</h3>
              <p className="text-xs text-gray-500">SEO competition score</p>
            </div>
            <DifficultyGauge difficulty={metrics.difficulty} size="lg" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default KeywordMetrics