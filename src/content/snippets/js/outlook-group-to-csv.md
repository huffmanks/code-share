---
title: Outlook group to CSV
description: Parses a semicolon-separated string of contact entries from an expanded Outlook distribution list into a CSV format.
tags: ["csv", "email", "parser"]
updatedAt: 2025-04-23 08:45:50
fragments:
  - filename: outlook-group-to-csv
    label: Paste in browser console
    language: js
    code: |
      import fs from "fs";

      const input = `Abercrombie, Clarence L. <AbercrombieCL@email.com>; Abushawish, Maysaa Z <abushawishmz@email.com>; Adams, Benjamin <adamsbj@email.com>; Anderson, A.K. <AndersonAK@email.com>; Castilla Candil, Luis <castillacandillm@email.com>; Castillo-Bernal, Melba <castillobernalmd@email.com>; Chang, Shun-Yao <changs@email.com>; Chaves, Nury <chavesne@email.com>; Chou, Yi Jou <chouy@email.com>;`;

      function parseOutlookGroupToCsv() {
        const lines = input
          .split(";")
          .map((entry) => entry.trim())
          .filter(Boolean)
          .map((entry) => entry.replace(/\b(Jr\.?|Sr\.?|II|III|IV|V),?/gi, "").trim())
          .map((entry) => {
            const match = entry.match(/^(.*?),\s*(.*?)\s*<([^>]+)>$/);
            if (!match) return null;

            let [_, lastName, firstPart, email] = match;
            if (/test/i.test(email)) return null;

            let nameParts = firstPart.split(/\s+/);

            if (nameParts.every((p) => /^[A-Z](\.?)$/.test(p))) {
              return `${lastName},${nameParts.join(" ")},${email}`;
            }

            nameParts = nameParts.filter((p) => !/^[A-Z]\.?$/.test(p));
            const firstName = nameParts.join(" ");
            return `${lastName},${firstName},${email}`;
          })
          .filter(Boolean);

        return ["lastName,firstName,email", ...lines].join("\n");
      }

      const csv = parseOutlookGroupToCsv();
      fs.writeFileSync("output.csv", csv);
---
