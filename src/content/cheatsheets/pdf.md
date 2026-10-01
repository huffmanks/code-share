---
title: "pdf"
description: "A quick reference guide covering PDF techniques and repeatable workflows."
updatedAt: 2026-10-01 11:30:11
groups:
  - title: "PDF Compression & Optimization"
    description: "Reduce PDF file size through compression, flattening, rasterization, and structural optimization."
    items:
      - label: "Balanced Compression"
        description: "Compress a PDF while preserving the original color space and maintaining good image quality."
        codeLang: "sh"
        code: |
          \gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.7 \
             -dPDFSETTINGS=/ebook \
             -dColorConversionStrategy=/LeaveColorUnchanged \
             -dDownsampleColorImages=true \
             -dColorImageResolution=150 \
             -dNOPAUSE -dQUIET -dBATCH \
             -sOutputFile=compressed-balanced.pdf input.pdf
        comment: "-dColorImageResolution=(72 | 96 | 150 | 300)"
      - label: "Vector Flattening"
        description: "Flatten PDF content while retaining vector graphics and the original color space."
        codeLang: "sh"
        code: |
          \gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
             -dPDFSETTINGS=/ebook \
             -dColorConversionStrategy=/LeaveColorUnchanged \
             -dPreserveAnnots=false \
             -dPreserveFlattenedNC=false \
             -dNOINTERACTION -dNOPAUSE -dQUIET -dBATCH \
             -sOutputFile=flattened-vector.pdf input.pdf
      - label: "Annotation Flattening"
        description: "Flatten annotations and page rotation into the PDF content."
        codeLang: "sh"
        code: |
          qpdf --flatten-annotations=all --flatten-rotation input.pdf flattened-annotations.pdf
      - label: "Structural Optimization"
        description: "Linearize the PDF and optimize embedded images and unreferenced objects."
        codeLang: "sh"
        code: |
          qpdf --linearize --optimize-images input.pdf optimized-structural.pdf
      - label: "Image Optimization with Quality"
        description: "Recompress images with a specified JPEG quality when optimization reduces file size."
        codeLang: "sh"
        code: |
          qpdf --optimize-images --jpeg-quality=85 input.pdf optimized-images-quality.pdf
        comment: "--jpeg-quality=(0-100)"
  - title: "PDF Page Size & Scaling"
    description: "Resize PDF pages to standard paper sizes while preserving the page content and aspect ratio."
    items:
      - label: "Resize to Paper Size"
        description: "Resize PDF pages to a fixed paper size while scaling and centering the original content to fit."
        codeLang: "sh"
        code: |
          \gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
              -sPAPERSIZE=letter \
              -dFIXEDMEDIA \
              -dPDFFitPage \
              -dAutoRotatePages=/None \
              -dModifiesPageSize=true \
              -dNOPAUSE -dBATCH -dQUIET \
              -sOutputFile=resized-letter.pdf input.pdf
        comment: "-sPAPERSIZE=(letter | a4 | legal | ledger | ...)"
      - label: "Resize to Exact Dimensions"
        description: "Resize PDF pages to exact dimensions in points while scaling and centering the original content to fit."
        codeLang: "sh"
        code: |
          \gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
              -dDEVICEWIDTHPOINTS=612 \
              -dDEVICEHEIGHTPOINTS=792 \
              -dFIXEDMEDIA \
              -dPDFFitPage \
              -dAutoRotatePages=/None \
              -dModifiesPageSize=true \
              -dNOPAUSE -dBATCH -dQUIET \
              -sOutputFile=resized-letter-exact.pdf input.pdf
        verificationCode: |
          pdfinfo -f 1 -l $(pdfinfo "resized-letter-exact.pdf" | awk '/Pages/ {print $2}') "resized-letter-exact.pdf" | grep -E "Page.*size:"
        comment: "Letter = 612×792 points; 72 points = 1 inch."
---
