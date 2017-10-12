'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * CharacterStream implements a stream of character tokens given a source text.
 * The API design follows that of CodeMirror.StringStream.
 *
 * Required:
 *
 *      sourceText: (string), A raw GraphQL source text. Works best if a line
 *        is supplied.
 *
 */

var CharacterStream = function () {
  function CharacterStream(sourceText) {
    _classCallCheck(this, CharacterStream);

    this._start = 0;
    this._pos = 0;
    this._sourceText = sourceText;
  }

  _createClass(CharacterStream, [{
    key: 'getStartOfToken',
    value: function getStartOfToken() {
      return this._start;
    }
  }, {
    key: 'getCurrentPosition',
    value: function getCurrentPosition() {
      return this._pos;
    }
  }, {
    key: '_testNextCharacter',
    value: function _testNextCharacter(pattern) {
      var character = this._sourceText.charAt(this._pos);
      var isMatched = false;
      if (typeof pattern === 'string') {
        isMatched = character === pattern;
      } else {
        isMatched = pattern.test ? pattern.test(character) : pattern(character);
      }
      return isMatched;
    }
  }, {
    key: 'eol',
    value: function eol() {
      return this._sourceText.length === this._pos;
    }
  }, {
    key: 'sol',
    value: function sol() {
      return this._pos === 0;
    }
  }, {
    key: 'peek',
    value: function peek() {
      return Boolean(this._sourceText.charAt(this._pos)) ? this._sourceText.charAt(this._pos) : null;
    }
  }, {
    key: 'next',
    value: function next() {
      var char = this._sourceText.charAt(this._pos);
      this._pos++;
      return char;
    }
  }, {
    key: 'eat',
    value: function eat(pattern) {
      var isMatched = this._testNextCharacter(pattern);
      if (isMatched) {
        this._start = this._pos;
        this._pos++;
        return this._sourceText.charAt(this._pos - 1);
      }
      return undefined;
    }
  }, {
    key: 'eatWhile',
    value: function eatWhile(match) {
      var isMatched = this._testNextCharacter(match);
      var didEat = false;

      // If a match, treat the total upcoming matches as one token
      if (isMatched) {
        didEat = isMatched;
        this._start = this._pos;
      }

      while (isMatched) {
        this._pos++;
        isMatched = this._testNextCharacter(match);
        didEat = true;
      }

      return didEat;
    }
  }, {
    key: 'eatSpace',
    value: function eatSpace() {
      return this.eatWhile(/[\s\u00a0]/);
    }
  }, {
    key: 'skipToEnd',
    value: function skipToEnd() {
      this._pos = this._sourceText.length;
    }
  }, {
    key: 'skipTo',
    value: function skipTo(position) {
      this._pos = position;
    }
  }, {
    key: 'match',
    value: function match(pattern) {
      var consume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var caseFold = arguments[2];

      var token = null;
      var match = null;

      switch (typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) {
        case 'string':
          var regex = new RegExp(pattern, caseFold ? 'i' : '');
          match = regex.test(this._sourceText.substr(this._pos, pattern.length));
          token = pattern;
          break;
        case 'object': // RegExp
        case 'function':
          match = this._sourceText.slice(this._pos).match(pattern);
          token = match && match[0];
          break;
      }

      if (match && (typeof pattern === 'string' || match.index === 0)) {
        if (consume) {
          this._start = this._pos;
          this._pos += token.length;
        }
        return match;
      }

      // No match available.
      return false;
    }
  }, {
    key: 'backUp',
    value: function backUp(num) {
      this._pos -= num;
    }
  }, {
    key: 'column',
    value: function column() {
      return this._pos;
    }
  }, {
    key: 'indentation',
    value: function indentation() {
      var match = this._sourceText.match(/\s*/);
      var indent = 0;
      if (match && match.index === 0) {
        var whitespaces = match[0];
        var pos = 0;
        while (whitespaces.length > pos) {
          if (whitespaces.charCodeAt(pos) === 9) {
            indent += 2;
          } else {
            indent++;
          }
          pos++;
        }
      }

      return indent;
    }
  }, {
    key: 'current',
    value: function current() {
      return this._sourceText.slice(this._start, this._pos);
    }
  }]);

  return CharacterStream;
}();

exports.default = CharacterStream;