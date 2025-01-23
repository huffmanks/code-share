---
title: Regex
description: This cheat sheet provides descriptive explanations of commonly used regex patterns for quick reference.
updatedAt: "2025-01-22 18:19:20"
groups:
  - title: Matching Basics
    description: Core patterns to match common text elements.
    items:
      - label: Match any single character
        description: A pattern that matches any single character except for line breaks.
        example: \.
      - label: Match the start of a string
        description: Anchors the pattern to the beginning of a string.
        example: ^
      - label: Match the end of a string
        description: Anchors the pattern to the end of a string.
        example: $
      - label: Match any digit
        description: Matches any numeric digit (0-9).
        example: \d
      - label: Match any non-digit
        description: Matches any character that is not a digit.
        example: \D
  - title: Character Sets & Ranges
    description: Patterns to specify a set of allowable characters or ranges.
    items:
      - label: Match a specific character set
        description: Matches any character within the specified set of characters.
        example: \[aeiou\]
      - label: Match a range of characters
        description: Matches characters within the specified range.
        example: \[a-z\]
      - label: Match any character except specified ones
        description: Matches characters not in the specified set.
        example: \[^aeiou\]
  - title: Quantifiers
    description: Specify how many times a pattern must occur.
    items:
      - label: Match zero or more times
        description: Matches the preceding pattern zero or more times.
        example: \*
      - label: Match one or more times
        description: Matches the preceding pattern one or more times.
        example: +
      - label: Match zero or one time
        description: Matches the preceding pattern zero or one time.
        example: \?
      - label: Match a specific number of times
        description: Matches the preceding pattern an exact number of times.
        example: \{3\}
      - label: Match a range of times
        description: Matches the preceding pattern within a range.
        example: \{2,5\}
  - title: Groups and Lookaheads
    description: Advanced patterns for grouping and conditional matches.
    items:
      - label: Group patterns together
        description: Groups multiple patterns to treat them as a single unit.
        example: (abc)
      - label: Positive lookahead
        description: Matches a group if it is followed by another pattern.
        example: (?=abc)
      - label: Negative lookahead
        description: Matches a group if it is not followed by another pattern.
        example: (?!abc)
      - label: Capture groups
        description: Captures matched text for reference or replacement.
        example: (group)
      - label: Non-capturing group
        description: Groups patterns without capturing the matched text.
        example: (?:abc)
  - title: Escaping Special Characters
    description: Handling characters that have special meanings in regex.
    items:
      - label: Escape a special character
        description: Matches the literal character instead of its special meaning.
        example: \\
      - label: Match a literal dot
        description: Matches the literal '.' character.
        example: \.
      - label: Match a literal asterisk
        description: Matches the literal '*' character.
        example: \*
---
