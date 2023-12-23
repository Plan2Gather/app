import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingButton from './loading';

describe('LoadingButton', () => {
  it('renders the button correctly', () => {
    render(<LoadingButton loading={false}>Click me</LoadingButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDefined();
  });

  it('displays a spinner and disables the button when loading is true', () => {
    render(<LoadingButton loading>Click me</LoadingButton>);
    const spinner = screen.getByRole('progressbar');
    const button = screen.getByRole<HTMLButtonElement>('button');
    expect(spinner).toBeDefined();
    expect(button).toBeDisabled();
  });

  it('does not display a spinner and enables the button when loading is false', () => {
    render(<LoadingButton loading={false}>Click me</LoadingButton>);
    const button = screen.getByRole('button');
    const spinner = screen.queryByRole('progressbar');
    expect(spinner).toBeNull();
    expect(button).not.toBeDisabled();
  });
});
