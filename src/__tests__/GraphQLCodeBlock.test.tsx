import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { GraphQLCodeBlock } from '../index';

describe('GraphQLCodeBlock', () => {
  it('renders a valid query with syntax highlighting', () => {
    const { container } = render(<GraphQLCodeBlock src="{ hello }" />);

    const div = container.querySelector('.GraphQLCodeBlock');
    expect(div).toBeInTheDocument();
    expect(div?.querySelectorAll('pre').length).toBeGreaterThan(0);
    expect(div?.querySelectorAll('span').length).toBeGreaterThan(0);
  });

  it('renders error state for invalid query', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<GraphQLCodeBlock src="{ invalid ..." />);

    const pre = container.querySelector('pre.error');
    expect(pre).toBeInTheDocument();
    expect(pre?.textContent).toBe('{ invalid ...');

    vi.restoreAllMocks();
  });

  it('passes className to the container', () => {
    const { container } = render(<GraphQLCodeBlock className="custom" src="{ hello }" />);

    const div = container.querySelector('.custom.GraphQLCodeBlock');
    expect(div).toBeInTheDocument();
  });

  it('formats the query via graphql print', () => {
    const { container } = render(<GraphQLCodeBlock src="{hello{world}}" />);

    const spans = container.querySelectorAll('span');
    const text = Array.from(spans).map((s) => s.textContent).join('');
    expect(text).toContain('hello');
    expect(text).toContain('world');
  });

  it('passes className to error state', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<GraphQLCodeBlock className="my-class" src="not valid graphql {{{}}" />);

    const pre = container.querySelector('pre.my-class');
    expect(pre).toBeInTheDocument();
    expect(pre).toHaveClass('error');

    vi.restoreAllMocks();
  });
});
