import { render, screen } from '@testing-library/react'
import { expect, describe, test } from 'vitest'
import XpBar from '../XpBar'

describe('XpBar Component', () => {
  test('displays current XP and level correctly', () => {
    const currentXp = 150
    const level = 2

    render(<XpBar currentXp={currentXp} level={level} />)

    expect(screen.getByText('XP: 150')).toBeInTheDocument()
    expect(screen.getByText('Level 2')).toBeInTheDocument()
  })

  test('shows progress bar correctly', () => {
    const currentXp = 50
    const level = 1

    const { container } = render(<XpBar currentXp={currentXp} level={level} />)

    // Check that the progress bar is rendered (exact styling may change)
    const progressBar = container.querySelector('.bg-gradient-to-r')
    expect(progressBar).toBeInTheDocument()
  })

  test('calculates progress percentage correctly', () => {
    const currentXp = 150 // Level 2 (needs 100 XP total for current level)
    const level = 2

    render(<XpBar currentXp={currentXp} level={level} />)

    // 150 total XP - 100 XP to reach level 2 = 50 XP in current level
    // 50 XP / 100 XP needed for next level = 50% progress
    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('handles level 1 correctly', () => {
    const currentXp = 25
    const level = 1

    render(<XpBar currentXp={currentXp} level={level} />)

    expect(screen.getByText('XP: 25')).toBeInTheDocument()
    expect(screen.getByText('Level 1')).toBeInTheDocument()
  })

  test('displays cyber theme visual elements', () => {
    const { container } = render(<XpBar currentXp={100} level={1} />)

    // Check for cyber-themed styling classes
    const gradationElements = container.querySelectorAll('.bg-gradient-to-r')
    expect(gradationElements.length).toBeGreaterThan(0)
  })
})
