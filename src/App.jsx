import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/organisms/Layout'
import KeywordResearch from '@/components/pages/KeywordResearch'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<KeywordResearch />} />
      </Routes>
    </Layout>
  )
}

export default App