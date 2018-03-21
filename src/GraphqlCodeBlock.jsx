import { LexRules, ParseRules, isIgnored } from './utils/Rules.js';
import runParser from './utils/runParser.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { print } from 'graphql/language/printer';
import { parse } from 'graphql/language/parser';
import './style.css';

export default class GraphqlCodeBlock extends Component {
  static propTypes = {
    queryBody: PropTypes.string,
    className: PropTypes.string
  }

  render() {
    const { className, queryBody } = this.props;

    let formatted;
    try {
      formatted = print(parse(queryBody));
    } catch (e) {
    return <div>[PARSE ERROR] {queryBody}</div>;
    }

    const highlighted = [];
    const rowKeys = [];
    runParser(formatted, {
      eatWhitespace: stream => stream.eatWhile(isIgnored),
      LexRules,
      ParseRules,
    }, (stream, state, style, rowIndex, newRow) => {
      const { _sourceText, _start, _pos } = stream;

      if (newRow) {
        rowKeys.push(_sourceText);
        highlighted.push([]);
      }
      const substr = _sourceText.substring(_start, _pos);
      highlighted[highlighted.length-1].push(
        <span key={`${rowKeys.length}-${_start}-${_pos}`} className={style}>{substr}</span>
      );
    });

    const body = [];
    highlighted.forEach((row, index) => {
      body.push(<pre key={`query-row-${index}`}>{row}</pre>);
    });

    return (
      <div className={className}>{body}</div>
    );
  }
}
