---
title: JQ
description: Commonly used jq commands for parsing and transforming JSON data.
updatedAt: 2025-03-17 14:55:50
groups:
  - title: Basic Filters
    description: Essential commands to extract and manipulate JSON values.
    items:
      - label: Extract a key's value
        description: Selects the value of a specific key in a JSON object.
        code: jq '.key'
      - label: Pretty-print JSON
        description: Formats JSON with indentation for better readability.
        code: jq '.'
  - title: Filtering and Transforming
    description: Methods to search, modify, and transform JSON data.
    items:
      - label: Select objects with a condition
        description: Filters objects based on a condition.
        code: jq 'select(.age > 18)'
      - label: Map over an array
        description: Applies a function to each element in an array.
        code: jq 'map(.key)'
      - label: Flatten nested arrays
        description: Flattens an array of arrays into a single array.
        code: jq 'flatten'
      - label: Extract specific fields from objects in an array
        description: Creates an array of selected fields from objects.
        code: |
          jq 'map({name: .name, age: .age})'
  - title: Advanced Techniques
    description: Powerful transformations using jq’s built-in functions.
    items:
      - label: Construct new JSON objects
        description: Builds a new object with selected properties.
        code: |
          jq '{name: .name, age: .age}'
      - label: String interpolation
        description: Formats strings dynamically using variables.
        code: |
          jq '"Hello \(.name)!"'
      - label: Group by a key
        description: Groups objects in an array by a specific key.
        code: jq 'group_by(.category)'
      - label: Count occurrences of values
        description: Counts occurrences of unique values in an array.
        code: |
          jq 'group_by(.) | map({key: .[0], count: length})'
      - label: Convert JSON to CSV
        description: Converts an array of objects into CSV format.
        code: jq -r 'map([.name, .age] | @csv) | .[]'
---
