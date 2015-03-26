// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class LayoutLine {
    constructor(text, style, metrics) {
        this.text = text;
        this.style = style;
        this.metrics = metrics;
        Object.preventExtensions(this);
    }

    get width() {
        return this.metrics.width;
    }

    get height() {
        return this.style.computedLineHeight();
    }
}

Object.preventExtensions(LayoutLine.prototype);
