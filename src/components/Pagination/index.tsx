import { useState } from 'react'
import { FiSettings, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import styles from './styles.module.scss'
type Data = {
  name: string
  email: string
  age: string
}

type PaginationState = {
  dataSize: number
  perPage: number
  page: number
  showOptions: boolean
}
const dataMultiplier = 100

const initialPaginationState: PaginationState = {
  dataSize: 3,
  perPage: 10,
  page: 0,
  showOptions: false
}

const Pagination: React.FC = () => {
  const [state, setState] = useState(initialPaginationState)
  const { dataSize, perPage, page, showOptions } = state
  const datas: Data[] = []

  for (let i = 0; i < dataSize * dataMultiplier; i++) {
    datas.push({
      name: `name-${i}`,
      email: `email-${i}`,
      age: `age-${i}`
    })
  }

  const totalDatas = datas.length
  const totalPages = Math.floor(totalDatas / perPage)

  const onChangeOptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(e.target.value)
    e.preventDefault()
    setState((state) => ({
      ...state,
      dataSize: numValue <= 0 ? 1 : numValue
    }))
  }
  const onClickSettings = (e: React.MouseEvent) => {
    e.preventDefault()
    setState((state) => ({
      ...state,
      showOptions: !showOptions
    }))
  }
  const onClickSelect = (e: React.MouseEvent, action: 'minus' | 'plus') => {
    e.preventDefault()
    if (action === 'plus')
      setState((state) => ({
        ...state,
        page: page >= totalPages ? totalPages : page + 1
      }))

    if (action === 'minus')
      setState((state) => ({
        ...state,
        page: page <= 0 ? 0 : page - 1
      }))
  }
  const onClickPerPage = (e: React.MouseEvent, perPage: number) => {
    e.preventDefault()
    setState((state) => ({ ...state, perPage, page: 0 }))
  }
  const perPageOptions = [10, 30, 50]
  return (
    <div className={styles.Pagination}>
      <FiSettings
        onClick={onClickSettings}
        size={18}
        style={{ cursor: 'pointer' }}
      />
      {showOptions && (
        <div className={styles.Options}>
          <div className={styles.Option}>
            <span>100 x</span>
            <input
              type="number"
              defaultValue={dataSize}
              onChange={onChangeOptionInput}
            />
          </div>
        </div>
      )}
      <div className={styles.PerPages}>
        {perPageOptions.map((option, i) => {
          return (
            <div
              key={i}
              className={styles.PerPage}
              style={{
                backgroundColor: perPage === option ? 'grey' : 'white',
                color: perPage === option ? 'white' : 'grey'
              }}
              onClick={(e) => onClickPerPage(e, option)}
            >
              {option}
            </div>
          )
        })}
      </div>
      <div className={styles.Content}>
        <div className={styles.Content}>
          {datas
            .slice(page * perPage, page * perPage + perPage)
            .map((data, i: number) => {
              return (
                <div key={i} className={styles.DatasContent}>
                  <div className={styles.Data}>Name:{data.name}</div>
                  <div className={styles.Data}>Email:{data.email}</div>
                  <div className={styles.Data}>Age:{data.age}</div>
                </div>
              )
            })}
        </div>
      </div>
      <div className={styles.PageSelect}>
        <div className={styles.Select}>
          <FiArrowLeft size={20} onClick={(e) => onClickSelect(e, 'minus')} />
        </div>
        {`${page} ...${totalPages}`}
        <div className={styles.Select}>
          <FiArrowRight size={20} onClick={(e) => onClickSelect(e, 'plus')} />
        </div>
      </div>
    </div>
  )
}

export default Pagination
