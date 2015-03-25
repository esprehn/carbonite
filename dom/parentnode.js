// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class ParentNode extends Node {
    constructor(ownerDocument) {
        super(ownerDocument);
        this._firstChild = null;
        this._lastChild = null;
    }

    get firstChild() {
        return this._firstChild;
    }

    get lastChild() {
        return this._lastChild;
    }

    get firstElementChild() {
        var child = this.firstChild;
        if (!child)
            return null;
        if (child instanceof Element)
            return child;
        return child.nextElementSibling;
    }

    get lastElementChild() {
        var child = this.lastChild;
        if (!child)
            return null;
        if (child instanceof Element)
            return child;
        return child.previousElementSibling;
    }

    getChildNodes() {
        var result = [];
        for (var child = this.firstChild; child; child = child.nextSibling)
            result.push(child);
        return result;
    }

    getChildElements() {
        var result = [];
        for (var child = this.firstElementChild; child; child = child.nextElementSibling)
            result.push(child);
        return result;
    }

    append(node) {
        if (node.contains(this))
            throw new Error("HierarchyRequestError");
        node.remove();
        node._parentNode = this;
        node._previousSibling = this.lastChild;
        if (this.lastChild)
            this.lastChild._nextSibling = node;
        this._lastChild = node;
        if (!this.firstChild)
            this._firstChild = node;
        return node;
    }

    prepend(node) {
        if (node.contains(this))
            throw new Error("HierarchyRequestError");
        node.remove();
        node._parentNode = this;
        node._nextSibling = this.firstChild;
        if (this.firstChild)
            this.firstChild._previousSibling = node;
        this._firstChild = node;
        if (!this.lastChild)
            this._lastChild = node;
        return node;
    }
}

Object.preventExtensions(ParentNode.prototype);
