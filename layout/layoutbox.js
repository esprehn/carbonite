// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class LayoutBox extends LayoutNode {
    constructor(tagName, style) {
        super(style);
        this._tagName = tagName;
        Object.preventExtensions(this);
    }

    get debugName() {
        return "box(" + this._tagName + ")";
    }
}

Object.preventExtensions(LayoutBox.prototype);
