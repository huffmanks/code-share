---
title: jq
description: Syntax for filtering, mapping, transforming, and restructuring JSON data from the command line.
updatedAt: 2026-09-20 19:58:08
groups:
  - title: Basic Extraction & Formatting
    description: Essential commands to format, pretty-print, extract keys, and work with raw text or indices.
    items:
      - label: Pretty Print JSON
        description: Formats JSON with indentation for human-readable output.
        code: "jq '.' "
        example: "cat data.json | jq '.' "
      - label: Extract Key Value
        description: Selects the value of a specific key in a JSON object.
        code: "jq '.<key_name>'"
        example: "jq '.name' data.json"
      - label: Output Raw Text
        description: Outputs string values without surrounding double quotes for scripting.
        code: "jq -r '.<key_name>'"
        example: "jq -r '.name' data.json"
      - label: Access Array Index
        description: Retrieves a specific element from an array by its numeric index.
        code: "jq '.[<index>]'"
        example: "jq '.[0]' items.json"
      - label: Slice Array Range
        description: Extracts a sub-range of elements from an array.
        code: "jq '.[<start>:<end>]'"
        example: "jq '.[1:3]' items.json"
  - title: Filtering, Length & Conditionals
    description: Methods to search, evaluate conditions, check sizes, and apply conditional logic.
    items:
      - label: Select with Condition
        description: Filters objects based on a conditional expression.
        code: "jq 'select(.<key> <operator> <value>)'"
        example: "jq 'select(.age > 18)' users.json"
      - label: Check Length
        description: Returns the length of an array, string, or object.
        code: "jq '.<key> | length'"
        example: "jq '.tags | length' post.json"
      - label: Conditional If Else
        description: Transforms values conditionally using if-then-else logic.
        code: "jq 'if .<key> then <true_expr> else <false_expr> end'"
        example: 'jq ''if .active then "Active" else "Inactive" end'' data.json'
  - title: Mapping and Restructuring
    description: Transforming arrays, projecting new objects, and flattening data structures.
    items:
      - label: Map Over Array
        description: Applies an expression to each element in an array.
        code: "jq 'map(.<key>)'"
        example: "jq 'map(.name)' users.json"
      - label: Construct New Object
        description: Builds a custom JSON object with selected properties.
        code: "jq '{<new_key>: .<old_key>}'"
        example: "jq '{fullName: .name, userAge: .age}' user.json"
      - label: Map Object Fields
        description: Creates an array of custom-shaped objects from an array.
        code: "jq 'map({<key1>: .<prop1>, <key2>: .<prop2>})'"
        example: "jq 'map({name: .name, age: .age})' users.json"
      - label: Flatten Nested Arrays
        description: Flattens an array of arrays into a single-level array.
        code: "flatten"
        example: "jq 'flatten' nested.json"
  - title: Advanced Transformations & Aggregations
    description: Powerful aggregations, string interpolation, grouping, conversion, and variables.
    items:
      - label: String Interpolation
        description: Formats strings dynamically using object variables.
        code: "jq '\"<text> \\(.<key>) <text>\"'"
        example: "jq '\"Hello \\\\(.name)!\"' user.json"
      - label: Group By Key
        description: Groups objects in an array by a specific key.
        code: "jq 'group_by(.<key>)'"
        example: "jq 'group_by(.category)' products.json"
      - label: Count Value Occurrences
        description: Counts occurrences of unique values within an array.
        code: "jq 'group_by(.) | map({key: .[0], count: length})'"
        example: 'jq ''["a", "b", "a", "c"] | group_by(.) | map({key: .[0], count: length})'''
      - label: Convert JSON to CSV
        description: Converts an array of objects into flat CSV rows.
        code: "jq -r 'map([.<prop1>, .<prop2>] | @csv) | .[]'"
        example: "jq -r 'map([.name, .age] | @csv) | .[]' users.json"
      - label: Pass External Variables
        description: Safely passes external shell variables into jq scripts.
        code: 'jq --arg <var_name> "<value>" ''.<key> == $var_name'''
        example: 'jq --arg target "Admin" ''.role == $target'' users.json'
---
