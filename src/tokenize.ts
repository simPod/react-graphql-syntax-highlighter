import { CharacterStream, onlineParser } from 'graphql-language-service';

type Token = { text: string; style?: string };

export function* tokenize(src: string): Generator<Token> {
  const parser = onlineParser();
  const state = parser.startState();

  for (const [index, line] of src.split('\n').entries()) {
    if (index > 0) yield { text: '\n' };

    const stream = new CharacterStream(line);
    while (!stream.eol()) {
      const style = parser.token(stream, state);
      yield { text: stream.current(), style: style === 'ws' ? undefined : style };
    }
  }
}
