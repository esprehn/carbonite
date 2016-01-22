// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class LayoutRect {
    constructor(top, left, width, height) {
        this.top = top || 0;
        this.left = left || 0;
        this.width = width || 0;
        this.height = height || 0;
        Object.preventExtensions(this);
    }

    clone() {
        return new LayoutRect(this.top, this.left, this.width, this.height);
    }
}
