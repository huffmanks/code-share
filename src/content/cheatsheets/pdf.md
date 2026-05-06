---
title: "pdf"
description: "A quick reference guide covering PDF techniques and repeatable workflows."
updatedAt: "2026-05-06"
groups:
  - title: "Flatten high-quality print PDFs"
    description: "Workflow for rasterizing complex vector documents to ensure instant loading and maximum compatibility without sacrificing visual clarity."
    items:
      - label: "Import Settings"
        description: "Open the PDF in Photoshop and configure the rendering engine."
        code: |
          - Crop To: Media Box
          - Resolution: 300 Pixels/Inch
          - Mode: RGB Color
        codeLang: "text"
        comment: "Changing ‘Bounding Box’ to ‘Media Box’ prevents trimming any margin."
      - label: "Flatten Image"
        description: "Merges all layers and paths into a single background layer to ensure instant loading."
        commands:
          - steps:
              - key: "Layer > Flatten Image"
        codeLang: "text"
      - label: "Save configuration"
        description: "Use the Photoshop PDF format with specific compression settings."
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
        codeLang: "text"
        commands:
          - steps:
              - key: "File > Save As > Select Photoshop PDF"
  - title: "Standardize PDF page sizes"
    description: "A workflow to scale inconsistent document pages to a uniform standard dimension."
    items:
      - label: "Open preflight"
        description: "Navigate to the print production suite to begin the fixup."
        commands:
          - steps:
              - key: "Tools > Print Production > Preflight"
      - label: "Select profile library"
        description: "Set the library to the correct versioning for scaling tools."
        commands:
          - steps:
              - key: "Select ‘Acrobat Pro DC 2015 Profiles’"
        comment: "Found in the top dropdown menu of the Preflight window."
      - label: "Access scaling tools"
        description: "Switch to the fixup menu to find page adjustment options."
        commands:
          - steps:
              - key: "Click wrench button"
      - label: "Select Scale Tool"
        description: "Locate the specific page scaling fixup within the Pages category."
        commands:
          - steps:
              - key: "Pages > Scale pages to specified size > Edit"
      - label: "Define dimensions"
        description: "Input the exact millimeter values for the desired output size."
        code: |
          Target Size (US Letter):
          - Short Edge: 216 mm
          - Long Edge: 279 mm
        codeLang: "text"
        comment: "216mm x 279mm is the standard equivalent for 8.5 x 11 inch paper."
      - label: "Execute fix"
        description: "Run the fixup and verify the results."
        commands:
          - steps:
              - key: "Click wrench fix (bottom)"
      - label: "Finalize"
        description: "Save the document once the page sizes are verified."
        commands:
          - steps:
              - key: "CMD"
              - key: "S"
---
