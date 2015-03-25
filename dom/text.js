// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

class Text extends Node {
    constructor(value, ownerDocument) {
        super(ownerDocument);
        this._value = value || "";
        Object.preventExtensions(this);
    }

    get textContent() {
        return this._value;
    }

    set textContent(value) {
        this._value = String(value);
    }
}
