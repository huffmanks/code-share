---
title: markdown
description: A quick reference for Markdown syntax, covering text formatting, lists, links, images and more.
updatedAt: 2025-03-17 20:33:45
groups:
  - title: Text Formatting
    description: Basic syntax for formatting text in Markdown.
    items:
      - label: Headings
        description: Make text bold.
        codeLang: md
        code: |
          # Heading 1
          ## Heading 2
          ### Heading 3
      - label: Bold
        description: Make text bold.
        example: "**bold** or __bold__"
        comment: "Use double asterisks or underscores."
      - label: Italic
        description: Make text italic.
        example: "*italic* or _italic_"
        comment: "Use single asterisks or underscores."
      - label: Strikethrough
        description: Strike through text.
        example: "~~strikethrough~~"
        comment: "Wrap text with double tildes."
      - label: Inline Code
        description: Format inline code.
        example: "`inline code`"
        comment: "Wrap code with backticks."
      - label: Highlight
        description: Emphasize important text by highlighting it.
        example: "I need to highlight these ==very important words==."
        comment: "Wrap text with double equal signs."
      - label: Subscript
        description: Format text as subscript.
        example: "H~2~O"
        comment: "Wrap text with tilde."
      - label: Superscript
        description: Format text as superscript.
        example: "X^2^"
        comment: "Wrap text with caret."
  - title: Lists
    description: Create ordered and unordered lists.
    items:
      - label: Unordered List
        description: Create a bullet-point list.
        codeLang: md
        code: |
          - Item 1
          - Item 2
        comment: "Use `-` for bullet points."
      - label: Ordered List
        description: Create a numbered list.
        codeLang: md
        code: |
          1. First item
          2. Second item
        comment: "Use sequential numbers."
      - label: Task List
        description: Define tasks with checkboxes.
        codeLang: md
        code: |
          - [x] Completed task
          - [ ] Incomplete task
        comment: "Use `- [ ]` for unchecked and `- [x]` for checked items."
  - title: Links and Images
    description: Syntax for adding links and images.
    items:
      - label: Link
        description: Create a hyperlink.
        example: "[Example](https://example.com)"
        comment: "Use square brackets for text and parentheses for URL."
      - label: Image
        description: Embed an image.
        example: "![Alt text](https://example.com/image.jpg)"
        comment: "Use exclamation mark before square brackets."
      - label: Image with a link
        description: Embed an image that links to a URL.
        example: "[![Alt text](https://example.com/image.jpg)](https://example.com)"
        comment: "Wrap the image in brackets, using parentheses for the link URL."
  - title: Block Elements
    description: Structural formatting for text and content.
    items:
      - label: Blockquote
        description: Format text as a block quote.
        example: |
          > This is a blockquote.
        comment: "Use `>` at the beginning of a line."
      - label: Horizontal Rule
        description: Insert a horizontal line.
        example: "---"
        comment: "Use three hyphens."
      - label: Fenced Code Block
        description: Create a block of code.
        codeLang: md
        code: |
          ```javascript
          console.log("Hello, world!");
          ```
        comment: "Use triple backticks and specify language."
  - title: Tables
    description: Create tables in Markdown.
    items:
      - label: Table
        description: Define a table structure.
        codeLang: md
        code: |
          | Row 1, Column 1 | Row 1, Column 2 |
          | Row 2, Column 1 | Row 2, Column 2 |
          | Row 3, Column 1 | Row 3, Column 2 |
        comment: "Use pipes `|` to separate columns."
      - label: Header Row
        description: Define a header row for the table.
        codeLang: md
        code: |
          | Header 1 | Header 2 |
          |----------|----------|
          | Data 1   | Data 2   |
        comment: "Use dashes `-` to create the header row."
      - label: Left Alignment
        description: Align table cells to the left.
        codeLang: md
        code: |
          | Left-Aligned |
          |:------------|
          | Data 1      |
          | Data 2      |
        comment: "Use `:` to align cells to the left."
      - label: Center Alignment
        description: Align table cells to the center.
        codeLang: md
        code: |
          | Center-Aligned |
          |:--------------:|
          | Data 1         |
          | Data 2         |
        comment: "Use `:` on both sides of the dashes to center-align cells."
      - label: Right Alignment
        description: Align table cells to the right.
        codeLang: md
        code: |
          | Right-Aligned |
          |--------------:|
          | Data 1        |
          | Data 2        |
        comment: "Use `:` to align cells to the right."
---
