const setProperty = (entity: Record<string, unknown>, key: string, value: unknown): void => {
  Object.defineProperty(entity, key, {
    value,
    configurable: true,
    enumerable: true,
    writable: true
  })
}

export default setProperty
