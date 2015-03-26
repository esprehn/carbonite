// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

describe("LayoutText", function() {
    function assertLines(lines, expected) {
        assert.lengthOf(lines, expected.length);
        expected.forEach(function(expectedLine, i) {
            assert.equal(Math.round(lines[i].width), expected[i].width);
            assert.equal(lines[i].text, expected[i].text);
        });
    }

    it("should create line boxes", function() {
        var style = new Style();
        style.fontSize = 15;
        var text = new LayoutText("Hello there, how are you today?", style);
        var lines = text.createLines(100);
        assertLines(lines, [
            {width: 77, text: "Hello there,"},
            {width: 82, text: "how are you"},
            {width: 45, text: "today?"},
        ]);
    });
    it("should overflow text on word boundaries", function() {
        var style = new Style();
        style.fontSize = 20;
        var text = new LayoutText("Hello there, how are you today?", style);
        var lines = text.createLines(0);
        assertLines(lines, [
            {width: 46, text: "Hello"},
            {width: 51, text: "there,"},
            {width: 37, text: "how"},
            {width: 29, text: "are"},
            {width: 32, text: "you"},
            {width: 60, text: "today?"},
        ]);
    });
    it("should compute text size", function() {
        var box = new LayoutBox("div", new Style());
        box.style.width = 100;
        var text = new LayoutText("Hello there, how are you today?", new Style());
        box.children = [text];
        box.updateLayout();
        assert.equal(box.layout.width, 100);
        assert.equal(Math.round(box.layout.height), 26);
        assert.equal(box.layout.top, 0);
        assert.equal(box.layout.left, 0);
        assert.equal(text.layout.width, 100);
        assert.equal(Math.round(text.layout.height), 26);
        assert.equal(text.layout.top, 0);
        assert.equal(text.layout.left, 0);
    });
});
