---
title: Photoshop auto-fit layer
description: Instantly resize layer to fit your artboard.
tags: ["auto-fit", "images", "layers", "photoshop"]
updatedAt: 2026-01-21 12:24:20
fragments:
  - filename: photoshop-auto-fit-layer
    label: Script
    language: jsx
    code: |
      #target photoshop

      var doc = app.activeDocument;
      var layer = doc.activeLayer;
      var bounds = layer.bounds;

      var layerWidth = bounds[2].as('px') - bounds[0].as('px');
      var layerHeight = bounds[3].as('px') - bounds[1].as('px');

      var scaleW = (doc.width.as('px') / layerWidth) * 100;
      var scaleH = (doc.height.as('px') / layerHeight) * 100;

      var finalScale = Math.min(scaleW, scaleH);

      layer.resize(finalScale, finalScale, AnchorPosition.MIDDLECENTER);
      layer.translate(doc.width/2 - (bounds[0] + bounds[2])/2, doc.height/2 - (bounds[1] + bounds[3])/2);
  - filename: photoshop-create-action
    label: Action instructions
    language: md
    code: |
      1. Open the Actions Panel (Window > Actions).
      2. Click the Folder icon to create a new set called "My Shortcuts."
      3. Click the Plus (+) icon to create a new action.
         - Name: Auto-fit layer
         - Function Key: Choose one (e.g., `SHIFT` + `F2`).
      4. Hit Record.
      5. Go to File > Scripts > Auto-fit layer. (The script should run and resize your layer).
      6. Click the Square (Stop) button in the Actions Panel.
---
