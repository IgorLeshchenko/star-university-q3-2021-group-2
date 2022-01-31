import classNames from 'classnames'
import debounce from 'lodash.debounce'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SearchIcon from '../../../assets/images/search.svg'
import { ISortParams } from '../../../models/SinglePostResult'
import { setSearchValue, setSortType } from '../../../store/postsSlice'
import { selectSearchValue, selectSortType } from '../../../store/selectors/posts'
import { BUTTON_TYPE, INPUT_TYPE } from '../../../utils/enums'

import classes from './SearchFilterParams.module.scss'

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
  const [isActive, setIsActive] = useState(false)
  const handleSortTypeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortType(event.target.value as ISortParams))
  }

  const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value))
  }

  const handleSearchValueChangeWithDebounce = debounce(handleSearchValueChange, 300)

  useEffect(() => {
    return () => {
      handleSearchValueChangeWithDebounce.cancel()
    }
  })

  const selectedSortType = useSelector(selectSortType)
  const selectedSearchValue = useSelector(selectSearchValue)

  return (
    <div className={classes.searchAndSortBar}>
      <form className={classes.searchAndSortBar__searchBar}>
        <div className={classes.searchAndSortBar__searchBar__input}>
          <div className={classes.searchAndSortBar__searchBar__input__icon}>
            <img
              src={SearchIcon}
              alt="searchIcon"
              className={classes.searchAndSortBar__searchBar__input__icon__image}
            />
          </div>
          <input
            type={INPUT_TYPE.TEXT}
            onChange={handleSearchValueChangeWithDebounce}
            className={classes.searchAndSortBar__searchBar__input__field}
            placeholder="Some text"
          />
        </div>
        <button
          type={BUTTON_TYPE.RESET}
          className={classNames(classes.searchAndSortBar__searchBar__clearTextButton, {
            [classes.searchAndSortBar__searchBar__clearTextButton__active]: selectedSearchValue !== '',
          })}
          onClick={() => dispatch(setSearchValue(''))}
        >
          Clear text
        </button>
      </form>
      {isActive && (
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
      )}
      <div className={classes.searchAndSortBar__dropDown} onClick={() => setIsActive(!isActive)}>
        Filter Posts
        <div
          className={`${
            isActive ? classes.searchAndSortBar__dropDown__arrowUp : classes.searchAndSortBar__dropDown__arrowDown
          }`}
        ></div>
      </div>
    </div>
  )
}
