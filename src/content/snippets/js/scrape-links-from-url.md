---
title: Scrape links from url
description: Extract text and links from anchor tags and generate HTML in a new window.
tags: ["links", "dom", "url"]
updatedAt: 2025-03-31 10:20:33
fragments:
  - filename: scrape-links-from-url
    label: Paste in browser console
    language: js
    code: |
      // Refine the selector for a more specific search
      const anchors = Array.from(document.querySelectorAll("a"));
      const linkData = anchors.map(anchor => {
          const nameText = anchor.textContent?.replace(/\s+/g, " ").trim() || "";
          const cleanLink = anchor.href;
          return [nameText, cleanLink];
      }).filter(([name, link]) => name && link);

      function makeViews() {
          const list = `<ul>${linkData.map(([name, link]) =>
          `<li><a href="${link}" target="_blank">${name}</a></li>`).join("")}</ul>`;

          const paragraph = linkData.map(([name, link]) =>
          `<p><a href="${link}" target="_blank">${name}</a></p>`).join("");

          const tableRows = linkData.map(([name, link]) =>
          `<tr><td>${name}</td><td><a href="${link}" target="_blank">${link}</a></td></tr>`).join("");

          const table = `
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

          const newWindow = window.open("");
          if (newWindow) {
              // Change to desired view (list, paragraph, table)
              newWindow.document.body.innerHTML = paragraph;
          }
      }

      makeViews();
---
