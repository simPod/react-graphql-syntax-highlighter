import assert from 'node:assert/strict';
import { cleanup, render } from '@testing-library/react';
import { afterEach, it } from 'vitest';
import { GraphQLCodeBlock } from '../index';

afterEach(cleanup);

it('formats and highlights the query as one copyable code block', () => {
  const src = `query Note{note(text:"""first

last"""){id}}`;

  const { container } = render(<GraphQLCodeBlock className="example" src={src} />);
  const code = container.querySelector('pre.GraphQLCodeBlock.example > code');

  assert(code);
  assert.equal(container.querySelectorAll('pre').length, 1);
  assert.equal(
    code.textContent,
    [
      'query Note {',
      '  note(text: """',
      '  first',
      '  ',
      '  last',
      '  """) {',
      '    id',
      '  }',
      '}',
    ].join('\n'),
  );
  assert.equal(code.querySelector('.keyword')?.textContent, 'query');
  assert.equal(code.querySelector('.def')?.textContent, 'Note');
  assert.equal(code.querySelector('.punctuation')?.textContent, '{');
});

it('renders invalid GraphQL as plain text in the code block', () => {
  const src = '{ invalid <tag>\n';

  const { container } = render(<GraphQLCodeBlock className="example" src={src} />);
  const code = container.querySelector('pre.GraphQLCodeBlock.example.error > code');

  assert(code);
  assert.equal(code.textContent, src);
  assert.equal(code.childElementCount, 0);
});
