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
});
