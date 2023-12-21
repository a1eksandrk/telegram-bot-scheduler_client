import { useRouteData } from '@solidjs/router'

import type { ResourceReturn } from 'solid-js'

const useFetchedRouteData = <RouteDataType>(): ResourceReturn<RouteDataType> => {
  const resource = useRouteData<() => ResourceReturn<RouteDataType>>()

  return resource
}

export default useFetchedRouteData
