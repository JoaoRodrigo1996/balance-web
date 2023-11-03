import { Button } from '../ui/button'

interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({
  isCurrent = false,
  onPageChange,
  number,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        className="disabled:cursor-default disabled:bg-primary-foreground disabled:text-white"
        size="sm"
        disabled
      >
        {number}
      </Button>
    )
  }

  return (
    <Button size="sm" onClick={() => onPageChange(number)}>
      {number}
    </Button>
  )
}
