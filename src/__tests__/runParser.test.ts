import { describe, expect, it } from 'vitest';
import { runParser } from '../runParser';

describe('runParser', () => {
  it('tokenizes a simple query', () => {
    const tokens: { text: string; style: string }[] = [];
    runParser('{ hello }', (stream, _state, style) => {
      tokens.push({ text: stream.current(), style });
    });

    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.some((t) => t.style === 'punctuation')).toBe(true);
  });

  it('tracks rows for multiline queries', () => {
    const rows = new Set<number>();
    const query = `{
  user {
    name
  }
}`;
    runParser(query, (_stream, _state, _style, rowIndex) => {
      rows.add(rowIndex);
    });

    expect(rows.size).toBe(5);
  });

  it('signals newRow correctly', () => {
    const newRowFlags: boolean[] = [];
    runParser('{ a\nb }', (_stream, _state, _style, _rowIndex, newRow) => {
      newRowFlags.push(newRow);
    });

    const newRowCount = newRowFlags.filter((f) => f === true).length;
    expect(newRowCount).toBe(2);
    expect(newRowFlags[0]).toBe(true);
  });

  it('assigns keyword style to query keyword', () => {
    const styles: { text: string; style: string }[] = [];
    runParser('query Foo { bar }', (stream, _state, style) => {
      styles.push({ text: stream.current(), style });
    });

    const queryToken = styles.find((s) => s.text === 'query');
    expect(queryToken).toBeDefined();
    expect(queryToken?.style).toBe('keyword');
  });

  it('assigns def style to operation name', () => {
    const styles: { text: string; style: string }[] = [];
    runParser('query MyQuery { bar }', (stream, _state, style) => {
      styles.push({ text: stream.current(), style });
    });

    const nameToken = styles.find((s) => s.text === 'MyQuery');
    expect(nameToken).toBeDefined();
    expect(nameToken?.style).toBe('def');
  });
});
