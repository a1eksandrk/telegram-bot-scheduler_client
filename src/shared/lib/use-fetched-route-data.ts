import { useRouteData } from '@solidjs/router'

import type { Resource } from 'solid-js'

type TUseFetchedRouteDataReturn<RouteDataType> = [Resource<RouteDataType>, () => boolean]

const useFetchedRouteData = <RouteDataType>(): TUseFetchedRouteDataReturn<RouteDataType> => {
  const data = useRouteData<() => Resource<RouteDataType>>()
  const isLoading = (): boolean => !data()

  return [data, isLoading]
}

export default useFetchedRouteData
