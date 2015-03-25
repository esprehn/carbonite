// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class Element extends ParentNode {
    constructor(tagName, attributes, ownerDocument) {
        super(ownerDocument);
        this._tagName = tagName;
        this._attributes = new Map(attributes);
        Object.preventExtensions(this);
    }

    setAttribute(name, value) {
        this._attributes.set(name, String(value));
    }

    getAttribute(name) {
        return this._attributes.get(name);
    }

    removeAttribute(name) {
        this._attributes.delete(name);
    }

    getAttributes() {
        return this._attributes.entries();
    }

    hasAttributes() {
        return this._attributes.size > 0;
    }

    get tagName() {
        return this._tagName;
    }
}

Object.preventExtensions(Element.prototype);
