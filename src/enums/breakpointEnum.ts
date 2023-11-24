export enum sizeEnum {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl'
}

export enum screenEnum {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600
}

const screenMap = new Map<sizeEnum, number>()

screenMap.set(sizeEnum.XS, screenEnum.XS)
screenMap.set(sizeEnum.SM, screenEnum.SM)
screenMap.set(sizeEnum.MD, screenEnum.MD)
screenMap.set(sizeEnum.LG, screenEnum.LG)
screenMap.set(sizeEnum.XL, screenEnum.XL)
screenMap.set(sizeEnum.XXL, screenEnum.XXL)

const screenObj = {
  [sizeEnum.XS]: screenEnum.XS,
  [sizeEnum.SM]: screenEnum.SM,
  [sizeEnum.MD]: screenEnum.MD,
  [sizeEnum.LG]: screenEnum.LG,
  [sizeEnum.XL]: screenEnum.XL,
  [sizeEnum.XXL]: screenEnum.XXL
}

export { screenMap, screenObj }
