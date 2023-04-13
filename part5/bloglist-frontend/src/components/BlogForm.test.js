import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('Test blog form component', () => {

    const handleBlogCreate = jest.fn(e => e.preventDefault())
    beforeEach(async () => {
        await render(<BlogForm handleBlogCreate={handleBlogCreate} />)
    })
    


    test('calls event handler when submit button clicked', async () => {

        const submitButton = screen.getByText('create')
        fireEvent.submit(submitButton)

        expect(handleBlogCreate.mock.calls).toHaveLength(1)
    })

})