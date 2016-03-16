// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

(function(exports) {

class FakeNode {
  constructor() {
    this.parentNode = null;
    this.nextSibling = null;
    this.previousSibling = null;
  }
  contains(other) {
      while (other && other != this)
        other = other.parentNode;
      return other === this;
  }
  remove() {
    if (!this.parentNode)
      return;
    if (this.nextSibling)
      this.nextSibling._previousSibling = this._previousSibling;
    if (this.previousSibling)
      this.previousSibling._nextSibling = this._nextSibling;
    this._parentNode = null;
    this._nextSibling = null;
    this._previousSibling = null;
  }
}

class FakeParentNode extends FakeNode {
  constructor() {
    super();
    this.firstChild = null;
    this.lastChild = null;
  }
  appendChild(node) {
    if (node.contains(this))
      throw new Error("HierarchyRequestError");
    node.remove();
    node.parentNode = this;
    node.previousSibling = this.lastChild;
    if (this.lastChild)
      this.lastChild.nextSibling = node;
    this.lastChild = node;
    if (!this.firstChild)
      this.firstChild = node;
    return node;
  }
}

class FakeDocumentFragment extends FakeParentNode {
}

class FakeElement extends FakeParentNode {
  constructor(tagName) {
    super();
    this.tagName = tagName;
    this.attributes = new Map();
    this.children = [];
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
  }
}

class FakeText extends FakeNode {
  constructor(value) {
    super();
    this.value = value;
  }
}

class FakeDomParserBindings {
  static setAttribute(element, name, value) {
    element.setAttribute(name, value);
  }

  static appendChild(parent, child) {
    parent.appendChild(child);
  }

  static createText(value) {
    return new FakeText(value);
  }

  static createElement(tagName) {
    return new FakeElement(tagName);
  }

  static createDocumentFragment() {
    return new FakeDocumentFragment();
  }
}

exports.FakeDomParserBindings = FakeDomParserBindings;

})(this);
