---
title: File safe date string
description: Returns a date time string that is safe to use for filenames.
tags: ["date", "filename", "utility"]
updatedAt: 2025-04-04 17:44:19
fragments:
  - filename: file-safe-date-string
    label: Paste in browser console
    language: js
    code: |
      // output: 2025-04-04_17-44-19
      const getFileSafeDateString = () => {
          const date = new Date();

          const time = date.toLocaleTimeString(undefined, { hour12: false });
          const hour = time.slice(0, 2);

          const utcDate = new Date().toISOString();

          const updatedDateHour = utcDate.replace(/T\d+/, `_${hour}`);
          const formattedDate = updatedDateHour.replace(/:/g, "-");

          return formattedDate.split(".")[0];
      }
---
