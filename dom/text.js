// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class Text extends Node {
    constructor(value) {
        super();
        this._value = String(value || "");
        // Object.preventExtensions(this);
    }

    get textContent() {
        return this._value;
    }

    set textContent(value) {
        this._value = String(value);
    }

    cloneNode(deep) {
        return new Text(this.textContent);
    }

    createLayoutNode() {
        return new LayoutText(this.textContent, this.parentNode.style);
    }
}

// Object.preventExtensions(Text.prototype);
