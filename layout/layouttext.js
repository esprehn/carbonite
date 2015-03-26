// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

class LayoutText extends LayoutNode {
    constructor(text, style) {
        super(style.clone());
        this.text = text || "";
        Object.preventExtensions(this);
        // TODO(esprehn): css-layout makes us bind a method. Maybe we should
        // create a special subclass of Style for Text and keep the value there?
        // https://github.com/facebook/css-layout/issues/63
        this.style.measure = this.measureText.bind(this);
    }

    get debugName() {
        return "#text";
    }

    measureText(width) {
        var lines = this.createLines(width);
        var maxWidth = 0;
        lines.forEach(function(line) {
            maxWidth = Math.max(line.width, maxWidth);
        });
        return {
            width: maxWidth,
            height: this.style.computedLineHeight * lines.length,
        };
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
