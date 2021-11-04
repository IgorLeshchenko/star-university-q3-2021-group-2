import React from 'react'

import { TEXT_VARIANTS } from '../../utils/enums'

interface ITypography {
  className?: string
  variant?: TEXT_VARIANTS
}

export const Typography: React.FC<React.PropsWithChildren<ITypography>> = ({
  className,
  variant = TEXT_VARIANTS.BODY,
  children,
}) => {
  const VariantComponent = variant

  return <VariantComponent className={className}>{children}</VariantComponent>
}
