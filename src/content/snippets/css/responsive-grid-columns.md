---
title: Responsive grid columns
description: Responsive, equally sized grid columns that wrap for mobile
language: css
tags: ["grid"]
createdAt: 2025-01-13 15:54:59
fragments:
  - title: responsive-grid-columns
    code: |
      .el {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
          gap: 20px;
      }
---
