import { parse, print } from 'graphql';
import type { ReactElement } from 'react';
import { runParser } from './runParser';

type Props = { className?: string; src: string };

export const GraphQLCodeBlock = ({ className, src }: Props) => {
  let formatted;
  try {
    formatted = print(parse(src));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return <pre className={`${className ?? ''} GraphQLCodeBlock error`}>{src}</pre>;
  }

  const highlighted: ReactElement[][] = [];
  const rowKeys: string[] = [];
  runParser(formatted, (stream, _state, style, _rowIndex, newRow) => {
    const current = stream.current();
    const start = stream.getStartOfToken();
    const pos = stream.getCurrentPosition();
    if (newRow) {
      rowKeys.push(current);
      highlighted.push([]);
    }
    highlighted[highlighted.length - 1].push(
      <span key={`${rowKeys.length}-${start}-${pos}`} className={style}>{current}</span>
    );
  });

  return (
    <div className={`${className ?? ''} GraphQLCodeBlock`}>{
      highlighted.map((row, index) => {
        return (<pre key={`query-row-${index}`}>{row}</pre>);
      })
    }</div>
  );
};
