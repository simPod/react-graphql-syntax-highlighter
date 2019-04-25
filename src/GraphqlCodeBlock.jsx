import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { print } from 'graphql/language/printer';
import { parse } from 'graphql/language/parser';
import runParser from './runParser';
import './style.css';

export default class GraphqlCodeBlock extends Component {
  static propTypes = {
    queryBody: PropTypes.string,
    className: PropTypes.string
  }

  render() {
    const { className = "GraphqlCodeBlock", queryBody } = this.props;

    let formatted;
    try {
      formatted = print(parse(queryBody));
    } catch (e) {
      console.error(e);
      return <pre className={`${className} error`}>{queryBody}</pre>;
    }

    const highlighted = [];
    const rowKeys = [];
    runParser(formatted, (stream, state, style, rowIndex, newRow) => {
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
