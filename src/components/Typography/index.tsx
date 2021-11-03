import React from 'react'

import { TEXT_VARIANTS } from './consts'

interface ITypography {
  className?: string
  variant?: TEXT_VARIANTS
  children: React.ReactNode
}

const Typography = ({ className, variant = TEXT_VARIANTS.BODY, children }: ITypography) => {
  const VariantComponent = variant

  return <VariantComponent className={className}>{children}</VariantComponent>
}

export default Typography
