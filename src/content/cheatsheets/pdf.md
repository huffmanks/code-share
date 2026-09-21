---
title: "pdf"
description: "A quick reference guide covering PDF techniques and repeatable workflows."
updatedAt: 2026-09-20 20:21:07
groups:
  - title: "PDF Compression & Optimization"
    description: "Reduce PDF file size while balancing image quality and document fidelity."
    items:
      - label: "Balanced Compression"
        description: "Compress a PDF using optimization settings while preserving the original color space."
        codeLang: "sh"
        code: |
          gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.7 -dPDFSETTINGS=/ebook -dColorConversionStrategy=/LeaveColorUnchanged -dDownsampleColorImages=true -dColorImageResolution=150 -dNOPAUSE -dQUIET -dBATCH -sOutputFile=compressed.pdf input.pdf
        comment: "-dColorImageResolution=(72 | 96 | 150 | 300)"
      - label: "Raster Compression"
        description: "Convert PDF pages to images and rebuild them into a smaller document."
        codeLang: "sh"
        code: |
          pdftoppm -r 150 -jpeg -jpegopt quality=90 input.pdf page && img2pdf page-*.jpg -o compressed.pdf && rm page-*.jpg
        comment: "Adjust quality as necessary (1-100)"
  - title: "Print Optimization & Flattening"
    description: "Rasterize complex vector documents to ensure instant loading and maximum compatibility."
    items:
      - label: "Import Settings"
        description: "Configure rendering engine options upon opening the document."
        codeLang: "text"
        code: |
          - Crop To: Media Box
          - Resolution: 300 Pixels/Inch
          - Mode: RGB Color
        comment: "Changing ‘Bounding Box’ to ‘Media Box’ prevents trimming any margin."
      - label: "Flatten Image"
        description: "Merge all layers and paths into a single background layer."
        codeLang: "text"
        commands:
          - ["Layer > Flatten Image"]
      - label: "Save Configuration"
        description: "Apply high-quality print compression and web optimization settings."
        codeLang: "text"
        code: |
          General:
            - Preset: [High Quality Print]
            - Compatibility: Acrobat 8 (PDF 1.7)
            - Uncheck: Preserve Photoshop Editing Capabilities
            - Check: Optimize for Fast Web View

          Compression:
            - Bicubic Downsampling: 300 PPI (above 450)
            - Format: JPEG (Medium Quality)
            - Options: Check Convert 16-bit to 8-bit
        commands:
          - ["File > Save As > Select Photoshop PDF"]
  - title: "Page Size Standardization"
    description: "Scale inconsistent document pages to a uniform standard dimension."
    items:
      - label: "Access Preflight Suite"
        description: "Navigate to the print production tools."
        commands:
          - ["Tools > Print Production > Preflight"]
      - label: "Select Profile Library"
        description: "Set the library versioning for scaling tools."
        commands:
          - ["Select ‘Acrobat Pro DC 2015 Profiles’"]
        comment: "Found in the top dropdown menu of the Preflight window."
      - label: "Open Scaling Fixups"
        description: "Switch to the fixup menu for page adjustment options."
        commands:
          - ["Click wrench button"]
      - label: "Configure Page Scaling"
        description: "Locate the specific page scaling fixup within categories."
        commands:
          - ["Pages > Scale pages to specified size > Edit"]
      - label: "Set Target Dimensions"
        description: "Input exact millimeter values for the target output size."
        codeLang: "text"
        code: |
          Target Size (US Letter):
          - Short Edge: 216 mm
          - Long Edge: 279 mm
        comment: "216mm x 279mm is standard for 8.5 x 11 inch paper."
      - label: "Run Scaling Fixup"
        description: "Run the fixup and verify the results."
        commands:
          - ["Click wrench fix (bottom)"]
      - label: "Save Document"
        description: "Save the document once page sizes are verified."
        commands:
          - ["CMD", "S"]
---
