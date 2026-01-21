---
title: Photoshop batch resize images
description: Batch resize images to a specific canvas size, centers them and exports them as a png or jpg.
tags: ["batch", "images", "photoshop"]
updatedAt: 2026-01-21 12:22:43
fragments:
  - filename: photoshop-batch-resize-images
    label: Paste in browser console
    language: jsx
    code: |
      #target photoshop
      // update these vars below: targetW, targetH
      // toggle comment Save as PNG or JPG

      (function () {
          // Prompt user to select input folder
          var inputFolder = Folder.selectDialog("Select the folder with images to process:");
          if (!inputFolder) {
              alert("No folder selected. Exiting.");
              return;
          }

          // Prompt user to select output folder
          var outputFolder = Folder.selectDialog("Select the folder to save processed images:");
          if (!outputFolder) {
              alert("No output folder selected. Exiting.");
              return;
          }

          var files = inputFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|bmp)$/i);
          if (files.length === 0) {
              alert("No image files found in selected folder.");
              return;
          }

          // Set target canvas dimensions
          var targetW = 1500;
          var targetH = 1000;

          for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!(file instanceof File)) continue;

              var doc = open(file);
              app.activeDocument = doc;
              doc.changeMode(ChangeMode.RGB);

              // Resize proportionally to fit inside target dimensions
              var w = doc.width.as("px");
              var h = doc.height.as("px");
              var scale = Math.min(targetW / w, targetH / h);
              doc.resizeImage(UnitValue(w * scale, "px"), UnitValue(h * scale, "px"), null, ResampleMethod.BICUBIC);

              // Create transparent canvas
              var tempDoc = app.documents.add(
                  targetW, targetH, doc.resolution, "TempCanvas", NewDocumentMode.RGB, DocumentFill.TRANSPARENT
              );

              // Copy/paste from resized image
              app.activeDocument = doc;
              doc.selection.selectAll();
              doc.selection.copy();
              doc.close(SaveOptions.DONOTSAVECHANGES);

              app.activeDocument = tempDoc;
              tempDoc.paste();
              var layer = tempDoc.activeLayer;

              // Center the pasted layer
              var dx = (targetW - (layer.bounds[2].as("px") - layer.bounds[0].as("px"))) / 2 - layer.bounds[0].as("px");
              var dy = (targetH - (layer.bounds[3].as("px") - layer.bounds[1].as("px"))) / 2 - layer.bounds[1].as("px");
              layer.translate(dx, dy);

              // Save as PNG
              var saveFile = new File(outputFolder + "/" + decodeURI(file.name).replace(/\.[^\.]+$/, "") + ".png");
              var pngOptions = new PNGSaveOptions();
              pngOptions.compression = 9;
              pngOptions.interlaced = false;
              tempDoc.saveAs(saveFile, pngOptions, true, Extension.LOWERCASE);

              // Save as JPG
              // var saveFile = new File(outputFolder + "/" + decodeURI(file.name).replace(/\.[^\.]+$/, "") + ".jpg");
              // var jpgOptions = new JPEGSaveOptions();
              // jpgOptions.quality = 12;
              // jpgOptions.formatOptions = FormatOptions.STANDARDBASELINE;
              // jpgOptions.embedColorProfile = true;
              // jpgOptions.matte = MatteType.NONE;
              // tempDoc.saveAs(saveFile, jpgOptions, true, Extension.LOWERCASE);

              tempDoc.close(SaveOptions.DONOTSAVECHANGES);
          }

          alert("Done! Saved " + files.length + " images as " + targetW + "x" + targetH + " to:\n" + outputFolder.fsName);
      })();
---
