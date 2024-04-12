import { fireEvent, render } from '@testing-library/react'
import { BookList } from './BookList'
import { describe, test, beforeEach, expect } from 'vitest'

describe('BookList', () => {
  let component: ReturnType<typeof render>

  beforeEach(() => {
    component = render(
      <BookList
        books={[
          {
            id: 1,
            title: 'Cien años de soledad',
            author: 'Gabriel García Márquez',
            rating: 5,
            userComment: 'Me encanta este libro'
          }
        ]}
        hasDeleteButton

      />
    )
  })

  test('renders content', async () => {
    const bookCard = component.container.querySelector('.book-card')
    const deleteButton = bookCard?.querySelector('.trash-icon') as HTMLButtonElement | null
    expect(bookCard).toBeTruthy()
    if (deleteButton !== null) {
      expect(deleteButton).toBeTruthy()
      fireEvent.click(deleteButton)
    }
  })
})
