import cn from 'classnames'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { clearPostsData, loadPostsList } from '../../store/postsSlice'
import { selectPosts, selectSortType } from '../../store/selectors/posts'
import { ROUTES } from '../../utils/constants'
import { Modal } from '../Modal'

import classes from './Table.module.scss'

interface ITable {
  colNames: string[]
  user: string
  pageNum?: number
  pageSize: number
  onCrossBtnHandler: React.MouseEventHandler
}

export const Table: React.FC<ITable> = ({ colNames, onCrossBtnHandler, user }) => {
  const dispatch = useDispatch()
  const postsList = useSelector(selectPosts)
  const sortType = useSelector(selectSortType)
  const list = postsList.filter((obj) => obj.author === user)

  useEffect(() => {
    dispatch(loadPostsList({ sort: sortType }))
    return () => {
      dispatch(clearPostsData())
    }
  }, [sortType])

  const tableHeader = () => {
    return colNames.map((data, idx) => {
      return (
        <td className={classes.table__headerCell} key={idx}>
          {data.toUpperCase()}
        </td>
      )
    })
  }

  const isNotFound = () => {
    return (
      <tr>
        <td></td>
        <td className={classes['table__notFoundMessage']}>There is no posts yet.</td>
        <td></td>
      </tr>
    )
  }
  const returnValidList = () => {
    if (list.length == 0) {
      return isNotFound()
    } else {
      return returnTableData()
    }
  }

  const returnTableData = () => {
    return Object.values(list).map((listKey) => {
      const { date, title, upvotes, _id } = listKey
      const postDate = new Date(date).toLocaleDateString('en-US')
      return (
        <tr className={classes.table__rowItems} key={_id}>
          <td className={classes.table__cell}>
            <Link to={`${ROUTES.ALL_POST}/${_id}`}>{title}</Link>
          </td>
          <td className={cn(classes['table__cell'], classes['table__cell-upvotes'])}>{upvotes}</td>
          <td className={classes.table__cell}>{postDate}</td>
        </tr>
      )
    })
  }

  return (
    <Modal showBackdrop={true} onCrossBtnClick={onCrossBtnHandler} className={classes.postModal}>
      <table className={classes.table}>
        <thead className={classes.table__header}>
          <tr className={classes.table__rowHeader}>{tableHeader()}</tr>
        </thead>
        <tbody>{returnValidList()}</tbody>
      </table>
    </Modal>
  )
}
