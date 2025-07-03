import { useState, useEffect } from 'react'
import { keywordService } from '@/services/api/keywordService'

export const useKeywords = () => {
  const [keywords, setKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadKeywords = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await keywordService.getAll()
      setKeywords(data)
    } catch (err) {
      setError(err.message || 'Failed to load keywords')
    } finally {
      setLoading(false)
    }
  }

  const analyzeKeyword = async (keyword) => {
    setLoading(true)
    setError('')
    try {
      const metrics = await keywordService.getKeywordMetrics(keyword)
      const variations = await keywordService.getKeywordVariations(keyword)
      return { metrics, variations }
    } catch (err) {
      setError(err.message || 'Failed to analyze keyword')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createKeyword = async (keywordData) => {
    setLoading(true)
    setError('')
    try {
      const newKeyword = await keywordService.create(keywordData)
      setKeywords(prev => [...prev, newKeyword])
      return newKeyword
    } catch (err) {
      setError(err.message || 'Failed to create keyword')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateKeyword = async (id, keywordData) => {
    setLoading(true)
    setError('')
    try {
      const updatedKeyword = await keywordService.update(id, keywordData)
      setKeywords(prev => prev.map(k => k.id === id ? updatedKeyword : k))
      return updatedKeyword
    } catch (err) {
      setError(err.message || 'Failed to update keyword')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteKeyword = async (id) => {
    setLoading(true)
    setError('')
    try {
      await keywordService.delete(id)
      setKeywords(prev => prev.filter(k => k.id !== id))
    } catch (err) {
      setError(err.message || 'Failed to delete keyword')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadKeywords()
  }, [])

  return {
    keywords,
    loading,
    error,
    loadKeywords,
    analyzeKeyword,
    createKeyword,
    updateKeyword,
deleteKeyword,
    fetchSerpResults: async (keyword) => {
      setLoading(true)
      setError('')
      try {
        const results = await keywordService.getSerpResults(keyword)
        return results
      } catch (err) {
        setError(err.message || 'Failed to fetch SERP results')
        throw err
      } finally {
        setLoading(false)
      }
    }
  }
}