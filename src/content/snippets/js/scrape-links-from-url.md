---
title: Scrape links from url
description: Extract text and links from anchor tags and generate an HTML table
tags: ["links", "dom", "url"]
updatedAt: 2025-01-14 11:00:19
fragments:
  - filename: scrape-links-from-url
    label: Paste in browser console
    language: js
    code: |
      const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));

      const linkData: Array<[string, string]> = anchors.map(anchor => {
          const nameText = anchor.textContent?.replace(/\s+/g, ' ').trim() || '';
          const cleanLink = anchor.href;
          return [nameText, cleanLink];
      });

      function makeTable(data: Array<[string, string]>): void {
          const tableRows = data
              .map(([name, link]) => `<tr><td>${name}</td><td><a href="${link}" target="_blank">${link}</a></td></tr>`)
              .join('');

          const tableHTML = `
              <table border="1" style="border-collapse: collapse; width: 100%;">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Links</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${tableRows}
                  </tbody>
              </table>
          `;

          const newWindow = window.open('');
          if (newWindow) {
              newWindow.document.write(tableHTML);
              newWindow.document.close();
          }
      }
      makeTable(linkData);
---
