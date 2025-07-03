import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-200 rounded-lg mx-auto mb-4 w-96 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 shimmer"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>
          <div className="h-6 bg-gray-200 rounded-lg mx-auto w-80 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 shimmer"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.2
              }}
            />
          </div>
        </div>
        
        {/* Search Bar Skeleton */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="h-14 bg-gray-200 rounded-lg relative overflow-hidden">
            <motion.div
              className="absolute inset-0 shimmer"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.4
              }}
            />
          </div>
        </div>
        
        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="h-6 bg-gray-200 rounded mb-4 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 shimmer"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.6
                  }}
                />
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-lg relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 shimmer"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: 0.8 + i * 0.2
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content Skeleton */}
          <div className="lg:col-span-3">
            {/* Metrics Cards Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="h-6 bg-gray-200 rounded mb-4 w-64 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 shimmer"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 1.0
                  }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 shimmer"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: 1.2 + i * 0.2
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Table Skeleton */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-48 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 shimmer"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: 2.0
                    }}
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded-lg relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 shimmer"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: 2.2 + i * 0.1
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading