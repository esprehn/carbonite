// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class LayoutText extends LayoutNode {
    constructor(value, style) {
        super(style);
        this.value = value || "";
        Object.preventExtensions(this);
    }

    get debugName() {
        return "#text";
    }
}

Object.preventExtensions(LayoutText.prototype);
