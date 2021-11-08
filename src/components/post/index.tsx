import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import { Typography } from '../../components/Typography'
import { ROUTES } from '../../utils/constants'
import { TEXT_VARIANTS } from '../../utils/enums'

import styles from './Post.module.scss'

interface IPost {
  author: string
  date: Date
  body: string
  title: string
  upvotes: number
  comments: number
}

export const Post: React.FC<React.PropsWithChildren<IPost>> = ({ author, date, body, title, upvotes, comments }) => {
  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <div className={styles.post__flex}>
          <div>
            <img src="#" alt="u" />
            <Link to={ROUTES.PROFILE}>
              Post by <br /> {author}
            </Link>
          </div>
          <span>{date}</span>
        </div>
        <div className={styles.post__info}>
          <Typography variant={TEXT_VARIANTS.H2}>
            <Link to={ROUTES.SINGLE_POST} className={styles.post__title}>
              {title}
            </Link>
          </Typography>
          <p className={styles.post__text}>{body}</p>
          <Link to={ROUTES.SINGLE_POST} className={styles.post__seemore}>
            see more
          </Link>
        </div>
        <div className={cn(styles['post__bottom--flex'])}>
          <div className={cn(styles['post__bottom--center'])}>
            <button>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.3536 5.64645C13.1583 5.45118 12.8417 5.45118 12.6464 5.64645L9.46447 8.82843C9.2692 9.02369 9.2692 9.34027 9.46447 9.53553C9.65973 9.7308 9.97631 9.7308 10.1716 9.53553L13 6.70711L15.8284 9.53553C16.0237 9.7308 16.3403 9.7308 16.5355 9.53553C16.7308 9.34027 16.7308 9.02369 16.5355 8.82843L13.3536 5.64645ZM13.5 21V6H12.5L12.5 21H13.5Z"
                  fill="#2A336E"
                />
                <circle cx="13" cy="13" r="12.5" stroke="#2A336E" />
              </svg>
            </button>
            <span className={cn(styles['post__bottom-upvotes--padding'])}>{upvotes}</span>
            <button>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13ZM26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13ZM9.46447 17.1716L12.6464 20.3536C12.8417 20.5488 13.1583 20.5488 13.3536 20.3536L16.5355 17.1716C16.7308 16.9763 16.7308 16.6597 16.5355 16.4645C16.3403 16.2692 16.0237 16.2692 15.8284 16.4645L13.5 18.7929V5H12.5V18.7929L10.1716 16.4645C9.97631 16.2692 9.65973 16.2692 9.46447 16.4645C9.2692 16.6597 9.2692 16.9763 9.46447 17.1716Z"
                  fill="#2A336E"
                />
              </svg>
            </button>
          </div>
          <Link to={ROUTES.SINGLE_POST} className={cn(styles['post__bottom-comments'])}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.76923 0H15.2308C16.758 0 18 1.29168 18 2.88V17.28C18 17.5594 17.8449 17.8142 17.6012 17.9323C17.5085 17.977 17.4074 18 17.3077 18C17.1485 18 16.9906 17.9424 16.8646 17.833L12.9032 14.4H2.76923C1.242 14.4 0 13.1083 0 11.52V2.88C0 1.29168 1.242 0 2.76923 0ZM1.38462 11.52C1.38462 12.3134 2.00492 12.96 2.76923 12.96H13.1538C13.3158 12.96 13.4723 13.019 13.5969 13.127L16.6154 15.7435V2.88C16.6154 2.08656 15.9951 1.44 15.2308 1.44H2.76923C2.00492 1.44 1.38462 2.08656 1.38462 2.88V11.52Z"
                fill="#2A336E"
              />
            </svg>
            <span className={cn(styles['post__bottom-comments--padding'])}>{comments}</span>
          </Link>
        </div>
      </article>
    </div>
  )
}

export default Post
