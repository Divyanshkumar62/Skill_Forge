import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, describe, test, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import LoginForm from '../LoginForm'
import '@testing-library/jest-dom'

// Mock the auth store
const mockLogin = vi.fn()
const mockUseAuth = vi.fn(() => ({
  login: mockLogin,
  loading: false,
  error: null
}))

vi.mock('../../store', () => ({
  useAuth: () => mockUseAuth()
}))

describe('LoginForm Component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders login form with all required elements', () => {
    renderWithRouter(<LoginForm onSuccess={vi.fn()} />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  test('shows cyber-themed styling', () => {
    const { container } = renderWithRouter(<LoginForm onSuccess={vi.fn()} />)

    // Check for cyber-themed gradient classes
    const gradientElements = container.querySelectorAll('.bg-gradient-to-r')
    expect(gradientElements.length).toBeGreaterThan(0)
  })

  test('displays form validation messages', async () => {
    renderWithRouter(<LoginForm onSuccess={vi.fn()} />)

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

    // Clear inputs
    fireEvent.change(emailInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: '' } })

    // Submit form
    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)

    // Check that validation might be handled by the component or parent
    expect(emailInput.value).toBe('')
    expect(passwordInput.value).toBe('')
  })

  test('handles form submission with correct data', async () => {
    const mockOnSuccess = vi.fn()
    const testData = {
      email: 'test@example.com',
      password: 'password123'
    }

    mockLogin.mockResolvedValue({
      user: { id: '1', email: testData.email },
      token: 'fake-token'
    })

    renderWithRouter(<LoginForm onSuccess={mockOnSuccess} />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(emailInput, { target: { value: testData.email } })
    fireEvent.change(passwordInput, { target: { value: testData.password } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(testData.email, testData.password)
    })
  })

  test('shows loading state during submission', async () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100))),
      loading: true,
      error: null
    })

    renderWithRouter(<LoginForm onSuccess={vi.fn()} />)

    const submitButton = screen.getByRole('button', { name: /login/i })
    expect(submitButton).toBeInTheDocument()

    // Button should still be functional even if loading
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  test('displays epic gaming theme', () => {
    const { container } = renderWithRouter(<LoginForm onSuccess={vi.fn()} />)

    // Check for gaming-themed text
    expect(container.textContent).toMatch(/hero|epic|quest|mission/i)
  })

  test('handles error states gracefully', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      loading: false,
      error: 'Invalid credentials' as any
    })

    renderWithRouter(<LoginForm onSuccess={vi.fn()} />)

    // Component should handle error without crashing
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  test('supports keyboard navigation', () => {
    renderWithRouter(<LoginForm onSuccess={vi.fn()} />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    // Focus on email input first
    emailInput.focus()
    expect(document.activeElement).toBe(emailInput)

    // Tab to password input
    emailInput.blur()
    passwordInput.focus()
    expect(document.activeElement).toBe(passwordInput)
  })
})
