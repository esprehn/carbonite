// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

(function(exports) {

class RealDomParserBindings {
  static setAttribute(element, name, value) {
    element.setAttribute(name, value);
  }

  static appendChild(parent, child) {
    parent.appendChild(child);
  }

  static createText(value) {
    return document.createTextNode(value);
  }

  static createElement(tagName) {
    return document.createElement(tagName);
  }

  static createDocumentFragment() {
    return document.createDocumentFragment();
  }
}

exports.RealDomParserBindings = RealDomParserBindings;

})(this);
