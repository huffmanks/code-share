---
title: Expand scrollable elements
description: Make all elements fully visible by removing scroll, position and height limits for screenshots.
tags: ["height", "overflow", "position", "screenshot", "scroll"]
updatedAt: 2025-02-18 11:32:14
fragments:
  - filename: expand-scrollable-elements
    label: Styles
    language: css
    code: |
      * {
          overflow: visible !important;
          height: auto !important;
          max-height: none !important;
          position: static !important;
      }
---
