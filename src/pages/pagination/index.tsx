import Pagination from '../../components/Pagination'
import { FiArrowLeft } from 'react-icons/fi'
import Layout from '../../layout'
import { useRouter } from 'next/router'

export default function PagePagination() {
  const router = useRouter()
  return (
    <Layout>
      <Pagination />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '8px'
        }}
      >
        <FiArrowLeft
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/')}
          size={32}
        />
      </div>
    </Layout>
  )
}
