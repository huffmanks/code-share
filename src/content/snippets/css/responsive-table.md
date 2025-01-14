---
title: Responsive table
description: Responsive table that stacks on mobile
tags: ["table"]
updatedAt: 2025-01-14 10:26:25
fragments:
  - filename: responsive-table
    label: Styles
    language: css
    position: 0
    code: |
      @media (max-width: 800px) {
          .table-vertical tbody tr {
              display: flex;
              flex-direction: column;
              padding-top: calc(0.25rem + 8px);
              border-bottom: 1px solid #eee;
          }
          .table-vertical tbody tr td:nth-of-type(1) {
              width: fit-content;
              margin-bottom: 0.5rem;
              padding: 0.25rem 0.5rem;
              background-color: rgba(138, 110, 75, 0.2);
              font-size: 16px;
              border-radius: 0 5px 5px 0;
          }
          .table-vertical tbody tr td:nth-of-type(2) {
              padding-left: 0.5rem;
              font-weight: bold;
              border-top: none;
          }
      }
  - filename: responsive-table
    label: Markup
    language: html
    position: 1
    code: |
      <table class="table-vertical">
          <tbody>
              <tr>
                  <td>10:30 a.m.</td>
                  <td>Session 1</td>
              </tr>
              <!-- ... -->
          </tbody>
      </table>
---
