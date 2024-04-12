import { test, expect, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { BookCard } from './BookCard'

test('renders content', async () => {
  const book = {
    id: 1,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    rating: 5,
    userComment: 'Me encanta este libro'
  }
  const component = render(<BookCard book={book} />)
  component.getByText('Cien años de soledad')
})

test('clicking delete button calls delete function', async () => {
  const book = {
    id: 1,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    rating: 5,
    userComment: 'Me encanta este libro'
  }
  const onDeleteBook = vi.fn()
  const component = render(
    <BookCard book={book} >
      <button className='icon-button trash-icon' onClick={onDeleteBook} type='button' />
    </BookCard>
  )
  fireEvent.click(component.getByRole('button'))
  expect(onDeleteBook).toHaveBeenCalledTimes(1)
})
