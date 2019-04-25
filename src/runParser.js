/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import { CharacterStream, onlineParser } from "graphql-language-service-parser";

export default function runParser(sourceText, callbackFn) {
  const parser = onlineParser();
  const state = parser.startState();
  const lines = sourceText.split('\n');

  lines.forEach((line, i) => {
    const stream = new CharacterStream(line);
    let newRow = true;
    while (!stream.eol()) {
      const style = parser.token(stream, state);
      callbackFn(stream, state, style, i, newRow);
      newRow = false;
    }
  });
}
