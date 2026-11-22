import { parse, print } from 'graphql';
import type { ReactElement } from 'react';
import { tokenize } from './tokenize';

type Props = { className?: string; src: string };

function format(src: string) {
  try {
    return print(parse(src));
  } catch {
    return undefined;
  }
}

export const GraphQLCodeBlock = ({ className, src }: Props): ReactElement => {
  const formatted = format(src);
  const classes = [className, 'GraphQLCodeBlock', formatted === undefined && 'error']
    .filter(Boolean)
    .join(' ');

  return (
    <pre className={classes}>
      <code>
        {formatted === undefined
          ? src
          : Array.from(tokenize(formatted), ({ text, style }, index) =>
              style ? (
                <span key={index} className={style}>
                  {text}
                </span>
              ) : (
                text
              ),
            )}
      </code>
    </pre>
  );
};
