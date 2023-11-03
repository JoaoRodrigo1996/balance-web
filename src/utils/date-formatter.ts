import dayjs from 'dayjs'

export function dateFormatter(date: string) {
  const dateformatted = dayjs(date).format('DD/MM/YYYY')

  return dateformatted
}
