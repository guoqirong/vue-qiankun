import { qiankunApp } from "../constants"

interface qiankunRouteType {
  path: string;
  name: string;
}

export const getQiankunAppUrl = (): qiankunRouteType[] => {
  return qiankunApp.map(item => {
    return {
      path: '/' + item.name,
      name: item.name,
    }
  })
}