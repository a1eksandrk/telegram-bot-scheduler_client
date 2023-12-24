const EMPTY_OR_WHITESPACE_ONLY = /^\s*$/

const isEmptyString = (s: string): boolean => EMPTY_OR_WHITESPACE_ONLY.test(s)

export default isEmptyString
