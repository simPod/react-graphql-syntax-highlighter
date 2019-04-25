var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import runParser from './runParser';
// @ts-ignore
import { print } from 'graphql/language/printer';
// @ts-ignore
import { parse } from 'graphql/language/parser';
import './style.css';
var GraphQLCodeBlock = /** @class */ (function (_super) {
    __extends(GraphQLCodeBlock, _super);
    function GraphQLCodeBlock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphQLCodeBlock.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? "GraphqlCodeBlock" : _b, src = _a.src;
        var formatted;
        try {
            formatted = print(parse(src));
        }
        catch (e) {
            console.error(e);
            return React.createElement("pre", { className: className + " error" }, src);
        }
        var highlighted = [];
        var rowKeys = [];
        runParser(formatted, function (stream, state, style, rowIndex, newRow) {
            var _sourceText = stream._sourceText, _start = stream._start, _pos = stream._pos;
            if (newRow) {
                rowKeys.push(_sourceText);
                highlighted.push([]);
            }
            var substr = _sourceText.substring(_start, _pos);
            highlighted[highlighted.length - 1].push(React.createElement("span", { key: rowKeys.length + "-" + _start + "-" + _pos, className: style }, substr));
        });
        return (React.createElement("div", { className: className }, highlighted.map(function (row, index) {
            return (React.createElement("pre", { key: "query-row-" + index }, row));
        })));
    };
    GraphQLCodeBlock.propTypes = {
        src: PropTypes.string.isRequired,
        className: PropTypes.string
    };
    return GraphQLCodeBlock;
}(Component));
export default GraphQLCodeBlock;
