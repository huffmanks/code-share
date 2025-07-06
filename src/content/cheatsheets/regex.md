---
title: regex
description: Pattern-matching expressions for extracting, replacing or validating text.
updatedAt: 2025-02-07 09:09:01
groups:
  - title: Matching Basics
    description: Core patterns to match common text elements.
    items:
      - label: Match any single character (except newline)
        description: A pattern that matches any single character except for line breaks.
        comment: Matches any character before the newline.  "a\nb".match(.) only matches "a"
        example: \.
      - label: Match the start of a string
        description: Anchors the pattern to the beginning of a string.
        comment: Matches "Hello" only if it's at the start of the line.
        example: ^Hello
      - label: Match the end of a string
        description: Anchors the pattern to the end of a string.
        comment: Matches "world" only if it's at the end of the line.
        example: world$
      - label: Match any digit
        description: Matches any numeric digit (0-9).
        comment: Matches any single digit like 0, 1, 2, ..., 9.
        example: \d
      - label: Match any non-digit
        description: Matches any character that is not a digit.
        comment: Matches any character that is not a number, such as A, b, $, etc.
        example: \D
      - label: Match any whitespace character
        description: Matches any whitespace character (space, tab, newline, etc.).
        comment: Matches a space, tab, or newline character.
        example: \s
      - label: Match any non-whitespace character
        description: Matches any character that is not whitespace.
        comment: Matches any character that is not a space, tab, or newline.
        example: \S
      - label: Match a word character
        description: Matches letters (a-z, A-Z), numbers (0-9), and underscore (_).
        comment: Matches any character a-z, A-Z, 0-9, and _.
        example: \w
      - label: Match a non-word character
        description: Matches any character that is not a word character.
        comment: Matches any character that is not a-z, A-Z, 0-9, or _.
        example: \W
      - label: Match any newline
        description: Matches a newline character.
        comment: Matches the line feed character (ASCII 10, often used to indicate the end of a line).
        example: \n
  - title: Character Sets & Ranges
    description: Patterns to specify a set of allowable characters or ranges.
    items:
      - label: Match a specific character set
        description: Matches any character within the specified set of characters.
        comment: Matches any vowel.
        example: \[aeiou\]
      - label: Match a range of characters
        description: Matches characters within the specified range.
        comment: Matches any lowercase letter.
        example: \[a-z\]
      - label: Match any character except specified ones
        description: Matches characters not in the specified set.
        comment: Matches any character that is not a vowel.
        example: \[\^aeiou\]
      - label: Match a character from a set or range
        description: Matches any character that matches any of the patterns.
        comment: Matches any alphanumeric or underscore.
        example: \[a-zA-Z0-9_\]
  - title: Quantifiers
    description: Specify how many times a pattern must occur.
    items:
      - label: Match zero or more times
        description: Matches the preceding pattern zero or more times.
        comment: Matches zero or more occurrences of the preceding character or group.
        example: \*
      - label: Match one or more times
        description: Matches the preceding pattern one or more times.
        comment: Matches one or more occurrences of the preceding character or group.
        example: +
      - label: Match zero or one time
        description: Matches the preceding pattern zero or one time.
        comment: Matches zero or one occurrence of the preceding character or group.
        example: \?
      - label: Match a specific number of times
        description: Matches the preceding pattern an exact number of times.
        comment: Matches exactly 3 occurrences of the preceding character or group.
        example: \{3\}
      - label: Match a range of times
        description: Matches the preceding pattern within a range.
        comment: Matches between 2 and 5 occurrences (inclusive) of the preceding character or group.
        example: \{2,5\}
      - label: Match at least n times
        description: Matches the preceding pattern at least n times.
        comment: Matches 2 or more occurrences of the preceding character or group.
        example: \{2,\}
  - title: Groups and Lookaheads
    description: Advanced patterns for grouping and conditional matches.
    items:
      - label: Group patterns together
        description: Groups multiple patterns to treat them as a single unit.
        comment: Matches the sequence "abc".
        example: (abc)
      - label: Positive lookahead
        description: Matches a group if it is followed by another pattern (but doesn't consume it).
        comment: Matches if the next characters are "abc", but the match pointer stays where it was.
        example: (?=abc)
      - label: Negative lookahead
        description: Matches a group if it is not followed by another pattern (but doesn't consume it).
        comment: Matches if the next characters are NOT "abc".
        example: (?!abc)
      - label: Capture groups
        description: Captures matched text for reference or replacement.
        comment: Captures the matched "group" in a numbered group.
        example: (group)
      - label: Non-capturing group
        description: Groups patterns without capturing the matched text.
        comment: Groups "abc" but doesn't capture it.
        example: (?:abc)
      - label: Named capture group
        description: Captures matched text with a name.
        comment: Captures the matched "group" with the name "name".
        example: (?<name>group)
      - label: Positive lookbehind
        description: Matches a group if it is preceded by another pattern (but doesn't consume it).
        comment: Matches if the preceding characters are "abc".
        example: (?<=abc)
      - label: Negative lookbehind
        description: Matches a group if it is not preceded by another pattern (but doesn't consume it).
        comment: Matches if the preceding characters are NOT "abc".
        example: (?<!abc)
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
      - label: Match a literal plus sign
        description: Matches the literal '+' character.
        example: \+
---
