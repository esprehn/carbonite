// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("DomParser", function() {
    it("should parse a string into a dom tree", function() {
        var parser = new DomParser("Hello World");
        var fragment = parser.parse();
        var children = fragment.getChildNodes();
        assert.equal(children.length, 1);
        assert.instanceOf(children[0], Text);
        assert.equal(children[0].textContent, "Hello World");
    });
});
