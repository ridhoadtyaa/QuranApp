export type DateFormat = (
  date: string,
  locale?: 'en-US' | 'en-GB' | 'es-ES' | 'id-ID' | 'jp-JP' | 'cn-CN',
  config?: Intl.DateTimeFormatOptions
) => string

const defaultConfig = {
  dateStyle: 'medium'
} as Intl.DateTimeFormatOptions

// date a string into a formatted date string
/**
 *
 * @param date - An unformatted date string, `e.g: in ISO 8601 format`
 * @param locale - A locale string, `e.g: en-US`
 * @param config - A configuration object, `e.g: { dateStyle: 'short' }`,
 * @description - This function will return a formatted date string, see [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) for more information on the available options.
 * @returns
 */
export const dateFormat: DateFormat = (date: string, locale = 'en-US', config = defaultConfig) => {
  return new Intl.DateTimeFormat(locale, config).format(new Date(date)) as string
}
