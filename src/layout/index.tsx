import { useRouter } from 'next/router'
import { FaCopyright } from 'react-icons/fa'
import styles from './styles.module.scss'
type Props = {
  children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  return (
    <div id="layout" className={styles.Layout}>
      <header className={styles.Header}>
        <div className={styles.Logo} onClick={() => router.push('/')}>
          Logo
        </div>
        <div className={styles.Menu}>
          <div
            className={styles.Button}
            onClick={() => router.push('pagination')}
          >
            pagination
          </div>
        </div>
      </header>
      <div className={styles.Page}>{children}</div>
      <footer className={styles.Footer}>
        <FaCopyright size={16} style={{ marginRight: '8px' }} color="white" />
        Footer content
      </footer>
    </div>
  )
}

export default Layout
