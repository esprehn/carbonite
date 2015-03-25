// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class DocumentFragment extends ParentNode {
    constructor(children) {
        super(children);
        Object.preventExtensions(this);
    }

    cloneNode(deep) {
        var clone = new DocumentFragment();
        if (deep) {
            for (let child = this.firstChild; child; child = child.nextSibling)
                clone.append(child.cloneNode(true));
        }
        return clone;
    }
}

Object.preventExtensions(Element.prototype);
