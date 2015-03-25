// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class DomParser {
    constructor(string) {
        this.string = string;
        this.state = "parseText";
        this.offset = 0;
        this.stack = [new DocumentFragment()];
        Object.preventExtensions(this);
    }

    parse() {
        while (this.hasMoreChars())
            this[this.state]();
        return this.stack[0];
    }

    parseText() {
        var startOffset = this.offset;
        var charCode = 0;
        while (this.hasMoreChars()) {
            charCode = this.currentCharCode();
            this.offset++;
            if (charCode == 60)
                break;
        }
        if (startOffset < this.offset) {
            var value = this.string.substring(this.offset, startOffset);
            var text = new Text(value);
            this.stack[0].append(text);
        }
        if (charCode == 60)
            this.state = "element";
    }

    parseElement() {
        console.log(this.string.substring(this.offset));
    }

    currentCharCode() {
        return this.string.charCodeAt(this.offset);
    }

    hasMoreChars() {
        return this.offset < this.string.length;
    }
}

Object.preventExtensions(DomParser.prototype);
