import React from 'react'

import { TEXT_VARIANTS } from '../../utils/enums'
import { Typography } from '../Typography'

import classes from './Hero.module.scss'

export const Hero = () => {
  return (
    <div className={classes.hero}>
      <Typography className={classes.hero__title} variant={TEXT_VARIANTS.H1}>
        A place to Share & discuss
      </Typography>
    </div>
  )
}
