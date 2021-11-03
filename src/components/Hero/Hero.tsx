import React from 'react'

import Typography from '../Typography'
import { TEXT_VARIANTS } from '../Typography/consts'

import classes from './Hero.module.scss'

const Hero = () => {
  return (
    <div className={classes.hero}>
      <Typography className={classes.hero__title} variant={TEXT_VARIANTS.H1}>
        A place to Share & discuss
      </Typography>
    </div>
  )
}

export default Hero
