import classNames from 'classnames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ISortParams } from '../../../models/SinglePostResult'
import { setSortType } from '../../../store/postsSlice'
import { selectSortType } from '../../../store/selectors/posts'

import classes from './SearchBar.module.scss'

const SORT_TYPES = [
  {
    label: 'Latest',
    value: 'recent',
  },
  {
    label: 'Popular',
    value: 'most-upvotes',
  },
  {
    label: 'Older',
    value: 'oldest',
  },
]

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch()
  const handleSortTypeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortType(event.target.value as ISortParams))
  }

  const selectedSortType = useSelector(selectSortType)

  return (
    <div className={classes.searchAndSortBar}>
      <div className={classes.searchAndSortBar__sortTypes}>
        {SORT_TYPES.map((sortType) => (
          <label
            key={sortType.value}
            className={classNames(classes.searchAndSortBar__sortTypes__label, {
              [classes.searchAndSortBar__sortTypes__active]: sortType.value === selectedSortType,
            })}
          >
            <input
              type="radio"
              name="filterPosts"
              value={sortType.value}
              onChange={handleSortTypeClick}
              className={classes.radioInput}
              checked={sortType.value === selectedSortType}
            />
            <span className={classes.searchAndSortBar__sortTypes__title}>{sortType.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
