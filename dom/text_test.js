// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("Text", function() {
    it("should accept value in the constructor", function() {
        var text = new Text("Hello World");
        assert.equal(text.textContent, "Hello World");
    });
    it("should allow setting the value", function() {
        var text = new Text();
        assert.equal(text.textContent, "");
        text.textContent = "New value";
        assert.equal(text.textContent, "New value");
    });
    it("should convert value to a string", function() {
        var text = new Text([1,2,3]);
        assert.equal(text.textContent, "1,2,3");
        text.textContent = {object: true};
        assert.equal(text.textContent, "[object Object]");
    });
    it("should allow cloning", function() {
        var text = new Text("Hello");
        var clone = text.cloneNode();
        assert.equal(text.textContent, "Hello");
        assert.equal(clone.textContent, "Hello");
        assert.notEqual(clone, text);
    });
    it("should ignore deep when cloning", function() {
        var text = new Text("Hello");
        var clone = text.cloneNode(true);
        assert.equal(text.textContent, "Hello");
        assert.equal(clone.textContent, "Hello");
        assert.notEqual(clone, text);
    });
});
