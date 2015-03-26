// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class LayoutText extends LayoutNode {
    constructor(text, style) {
        super(style);
        this.text = text || "";
        Object.preventExtensions(this);
    }

    get debugName() {
        return "#text";
    }

    createLines(width) {
        var lines = [];
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = this.style.createCanvasFont();
        var i = 0;
        var words = this.text.split(" ");
        while (i < words.length) {
            var lineText = words[i++];
            var lineMetrics = context.measureText(lineText);
            while (i < words.length) {
                var nextText = lineText + " " + words[i];
                var nextMetrics = context.measureText(nextText);
                if (nextMetrics.width < width) {
                    lineText = nextText;
                    lineMetrics = nextMetrics;
                    ++i;
                } else {
                    break;
                }
            }
            lines.push(new LayoutLine(lineText, this.style, lineMetrics));
        }
        return lines;
    }
}

Object.preventExtensions(LayoutText.prototype);
