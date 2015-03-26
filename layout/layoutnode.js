// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class LayoutNode {
    constructor(style) {
        this.style = style;
        this.children = [];
        // css-layout requires these to start as undefined, otherwise it assumes
        // the value is already computed and won't attempt to update it.
        this.layout = {
            width: undefined,
            height: undefined,
            top: 0,
            left: 0,
        };
    }

    updateLayout(parentMaxWidth) {
        computeLayout.computeLayout(this, parentMaxWidth);
    }

    get debugName() {
        throw new Error("No debug name.");
    }

    serialize() {
        var result = "<" + this.debugName +
            " width=" + (this.layout.width || 0) +
            " height=" + (this.layout.height || 0) +
            " top=" + this.layout.top +
            " left=" + this.layout.left;

        if (!this.children.length)
            return result + " />";
        else
            result += ">";

        this.children.forEach(function(child) {
            result += child.serialize();
        });
        result += "</" + this.debugName + ">";
        return result;
    }
}

Object.preventExtensions(LayoutNode.prototype);
