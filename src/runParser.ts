import { CharacterStream, CharacterStreamInterface, onlineParser } from 'graphql-language-service-parser';
import { State } from 'graphql-language-service-parser/dist/types';

export const runParser = (
  src: string,
  callback: (stream: CharacterStreamInterface, state: State, style: string, rowIndex: number, newRow: boolean) => void
) => {
  const parser = onlineParser();
  const state = parser.startState();
  const lines = src.split('\n');

  lines.forEach((line, i) => {
    const stream = new CharacterStream(line);
    let newRow = true;
    while (! stream.eol()) {
      const style = parser.token(stream, state);
      callback(stream, state, style, i, newRow);
      newRow = false;
    }
  });
};
