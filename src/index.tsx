import React, { Component } from 'react';
import PropTypes from 'prop-types';
import runParser from './runParser';
// @ts-ignore
import { print } from 'graphql/language/printer';
// @ts-ignore
import { parse } from 'graphql/language/parser';
import './style.css';

type Props = { className?: string, src: string };
export default class GraphQLCodeBlock extends Component<Props> {
  static propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  render() {
    const { className = "GraphqlCodeBlock", src } = this.props;

    let formatted;
    try {
      formatted = print(parse(src));
    } catch (e) {
      console.error(e);
      return <pre className={`${className} error`}>{src}</pre>;
    }

    const highlighted: any[] = [];
    const rowKeys: any[] = [];
    runParser(formatted, (stream: any, state: any, style: string, rowIndex: number, newRow: boolean) => {
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

    return (
        <div className={className}>{
          highlighted.map((row, index) => {
            return (<pre key={`query-row-${index}`}>{row}</pre>);
          })
        }</div>
    );
  }
}
