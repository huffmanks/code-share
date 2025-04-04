---
title: Remove whitespace svg
description: Paste svg to remove unnecessary whitespace.
tags: ["cleanup", "svg", "viewBox", "whitespace"]
updatedAt: 2025-04-04 18:45:13
fragments:
  - filename: remove-whitespace-svg
    label: Script
    language: js
    position: 0
    code: |
      const originalSvg = document.querySelector("#originalSvg");
      const newSvg = document.querySelector("#newSvg");

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      originalSvg.addEventListener("paste", async () => {
          await delay(1);

          const tempContainer = document.createElement("div");
          tempContainer.innerHTML = originalSvg.value;
          document.body.appendChild(tempContainer);

          await delay(1);

          const svg = tempContainer.querySelector("svg");

          if (svg) {
          const { x, y, width, height } = svg.getBBox();
          svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
          newSvg.value = svg.outerHTML;
          }

          tempContainer.remove();
      });
  - filename: remove-whitespace-svg
    label: Markup
    language: html
    position: 1
    code: |
      <div class="container">
          <h3>Original SVG</h3>
          <textarea id="originalSvg"></textarea>
          <h3>New SVG</h3>
          <textarea id="newSvg"></textarea>
      </div>
---
