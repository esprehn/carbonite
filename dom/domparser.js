// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

(function(exports) {

var GREATER_THAN = 62;
var LESS_THAN = 60;
var EQUALS = 61;
var SINGLE_QUOTE = 39;
var DOUBLE_QUOTE = 34;
var SPACE = 32;
var NEW_LINE = 10;
var CARRIAGE_RETURN = 13;
var TAB = 9;
var SLASH = 47;

class DomParser {
    constructor(string) {
        this.string = String(string || "");
        this.state = "parseText";
        this.offset = 0;
        this.stack = [new DocumentFragment()];
        Object.preventExtensions(this);
    }

    parse() {
        while (this.offset < this.string.length) {
            // console.log({state: this.state}, this.string.substring(this.offset));
            this[this.state]();
        }
        return this.stack[0];
    }

    parseText() {
        var value = this.consumeUntilChar(LESS_THAN);
        if (value) {
            var text = new Text(value);
            this.currentNode().append(text);
        }
        if (this.currentCharCode() == LESS_THAN) {
            this.offset++;
            this.state = "parseTagName";
        }
        // console.log("parseText", value);
    }

    parseTagName() {
        var endTag = false;
        if (this.currentCharCode() == SLASH) {
            this.offset++;
            endTag = true;
        }
        var tagName = this.consumeTagIdent();
        if (tagName && endTag) {
            var node = this.currentNode();
            // Implicitly close all mis-nested tags.
            while (node.tagName != tagName && this.stack.length > 1) {
                this.stack.pop();
            }
            if (node.tagName == tagName)
                 this.stack.pop();
            this.skipWhitespace();
            if (this.currentCharCode() == GREATER_THAN)
                this.offset++;
            this.state = "parseText";
        } else if (tagName && !endTag) {
            var element = new Element(tagName);
            this.currentNode().append(element);
            if (this.currentCharCode() == SLASH) {
                this.offset++;
                if (this.currentCharCode() == GREATER_THAN) {
                    this.offset++;
                    endTag = true;
                }
            }
            if (!endTag) {
                this.stack.push(element);
                this.state = "parseAttribute";
            } else {
                this.state = "parseText";
            }
        }

        // console.log("parseTagName", tagName, {endTag: endTag});
    }

    parseAttribute() {
        this.skipWhitespace();
        var name = this.consumeAttributeName();
        var value = "";
        this.skipWhitespace();
        var charCode = this.currentCharCode();
        if (charCode == EQUALS) {
            this.offset++;
            this.skipWhitespace();
            charCode = this.currentCharCode();
            if (charCode == SINGLE_QUOTE || charCode == DOUBLE_QUOTE) {
                this.offset++;
                value = this.consumeUntilChar(charCode);
                this.offset++;
            } else {
                value = this.consumeTagIdent();
            }
        }
        if (name)
            this.currentNode().setAttribute(name, value || "");
        this.skipWhitespace();
        charCode = this.currentCharCode();
        var endTag = false;
        if (charCode == SLASH) {
            this.offset++;
            endTag = true;
        }
        charCode = this.currentCharCode();
        if (charCode == GREATER_THAN) {
            if (endTag)
                this.stack.pop();
            this.offset++;
            this.state = "parseText";
        }
        // console.log("parseAttribute", name, value);
    }

    consumeTagIdent() {
        return this.consumeUntilPattern(/[>\/\r\n\t ]/gm);
    }

    consumeAttributeName() {
        return this.consumeUntilPattern(/[=>\/\r\n\t ]/gm);
    }

    consumeUntilPattern(pattern) {
        var startOffset = this.offset;
        this.skipUntilPattern(pattern);
        if (startOffset < this.offset)
            return this.string.substring(startOffset, this.offset);
        return null;
    }

    consumeUntilChar(stopChar) {
        var startOffset = this.offset;
        this.offset = this.string.indexOf(String.fromCharCode(stopChar), startOffset);
        if (this.offset == -1)
            this.offset = this.string.length;
        if (startOffset < this.offset)
            return this.string.substring(startOffset, this.offset);
        return null;
    }

    skipWhitespace() {
        if (this.currentCharCode() > SPACE)
            return;
        this.skipUntilPattern(/[^\r\n\t ]/gm);
    }

    skipUntilPattern(pattern) {
        pattern.lastIndex = this.offset;
        if (pattern.test(this.string))
            this.offset = pattern.lastIndex - 1;
        else
            this.offset = this.string.length;
    }

    currentCharCode() {
        return this.string.charCodeAt(this.offset);
    }

    currentNode() {
        return this.stack[this.stack.length - 1];
    }
}

Object.preventExtensions(DomParser.prototype);

exports.DomParser = DomParser;

})(this);
