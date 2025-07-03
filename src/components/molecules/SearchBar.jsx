import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const SearchBar = ({ onSearch, loading = false, placeholder = "Enter seed keyword..." }) => {
  const [keyword, setKeyword] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim() && !loading) {
      onSearch(keyword.trim())
    }
  }
  
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon name="Search" className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="pl-10 pr-24 py-4 text-lg border-2 border-gray-200 focus:border-primary focus:ring-primary/20 shadow-lg"
          disabled={loading}
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!keyword.trim() || loading}
            className="shadow-lg"
          >
            {loading ? (
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <ApperIcon name="Loader2" className="h-4 w-4" />
                </motion.div>
                Analyzing...
              </div>
            ) : (
              'Analyze'
            )}
          </Button>
        </div>
      </div>
    </motion.form>
  )
}

export default SearchBar