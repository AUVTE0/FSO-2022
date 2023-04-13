import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Test blog component', () => {
    const blog =     {
        _id: '642ee5c23c4be312be5e0b58',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: '642edaa592261ff47293eca9'
    }

    const handleRemove = jest.fn()
    const handleLike = jest.fn()
    
    beforeEach(async () => {
        await render(<Blog blog={blog} handleRemove={handleRemove} handleLike={handleLike}/>)
    })
    
    test('renders title and author but not url or likes', () => {
        
        const title = screen.queryByText('React patterns')
        const author = screen.queryByText('Michael Chan')
        const url = screen.queryByText('https://reactpatterns.com/')
        const likes = screen.queryByText('7')
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBe(null)
        expect(likes).toBe(null)
    })

    test('shows url and likes when button clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        user.click(button)
        const url = screen.queryByText('https://reactpatterns.com/')
        const likes = screen.queryByText('7')

        expect(url).toBeDefined()
        expect(likes).toBeDefined()
    })

    test('calls event handler twice when like button clicked twice', async () => {

        const user = userEvent.setup()
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(handleLike.mock.calls).toHaveLength(2)
    })


})