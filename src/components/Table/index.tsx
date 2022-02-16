import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadPostsList } from '../../store/postsSlice'
import { selectPosts, selectSortType } from '../../store/selectors/posts'

import classes from './Table.module.scss'

interface ITable {
  colNames: string[]
  user: string
  pageNum?: number
  pageSize: number
}

export const Table: React.FC<ITable> = ({ colNames, pageNum = 0, user, pageSize = 5 }) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(pageNum)
  const postsList = useSelector(selectPosts)
  const sortType = useSelector(selectSortType)

  useEffect(() => {
    dispatch(loadPostsList({ sort: sortType }))
  }, [sortType])
  const list = postsList.filter((obj) => obj.author === user)
  console.log(list)

  const onBack = () => {
    setPage(page - 1 > -1 ? page - 1 : page)
  }

  const onNext = () => {
    setPage(page + 1 < list.length / pageSize ? page + 1 : page)
  }

  const tableHeader = () => {
    return colNames.map((data, idx) => {
      return <td key={idx}>{data.toUpperCase()}</td>
    })
  }

  const returnTableData = () => {
    return Object.values(list.slice(pageSize * page, pageSize * page + pageSize)).map((todos) => {
      const { date, title, upvotes, _id } = todos
      const postDate = new Date(date).toLocaleDateString('en-US')
      return (
        <tr className={classes.tableRowItems} key={_id}>
          <td className={classes.tableCell}>{title}</td>
          <td className={classes.tableCell}>{upvotes}</td>
          <td className={classes.tableCell}>{postDate}</td>
        </tr>
      )
    })
  }

  return (
    <table className={classes.table}>
      <thead className={classes.tableRowHeader}>
        <tr className={classes.tableHeader}>{tableHeader()}</tr>
      </thead>
      {/*<tbody>{isNotFound ? <tr>Not Found user with username</tr> : returnTableData()}</tbody>*/}
      <tbody>{returnTableData()}</tbody>
      <tfoot>
        <tr>
          <td>
            <button onClick={onBack}>Back</button>
            <label>{page + 1}</label>
            <button onClick={onNext}>Next</button>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
