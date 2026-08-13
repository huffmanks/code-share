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
  - title: VS Code Find & Replace
    description: Practical patterns for transforming real-world text with VS Code’s regex find and replace.
    items:
      - label: Move URLs to their own lines
        description: Extract URLs from lines and place each URL on a separate line.
        regex:
          steps:
            - find: '\s*(https?://.*)$'
              replace: '\n$1'
            - find: "^(?!https?://).*$"
              replace: '""'
        example: |
          Some text https://example.com
          Another line https://example.org/page
          https://example.net
      - label: Convert matching lines into a list
        description: Add a list marker to every line containing a matching pattern.
        regex:
          steps:
            - find: "^(.*https?://.*)$"
              replace: "- $1"
        example: |
          https://example.com
          https://example.org
      - label: Remove lines matching a pattern
        description: Delete every complete line containing a specific pattern.
        regex:
          steps:
            - find: '^.*TODO:.*\r?\n?'
              replace: '""'
        example: |
          Keep this line
          TODO: remove this line
          Keep this too
      - label: Remove everything except matching lines
        description: Keep only lines that match a pattern and delete everything else.
        regex:
          steps:
            - find: '^(?!.*TODO:).*(?:\r?\n|$)'
              replace: '""'
        example: |
          Keep TODO: this item
          Delete this line
          Keep TODO: another item
      - label: Extract text from parentheses
        description: Replace each line with only the text contained inside parentheses.
        regex:
          steps:
            - find: '^.*\(([^()]*)\).*$'
              replace: "$1"
        example: |
          John Smith (john@example.com)
          Jane Doe (jane@example.com)
      - label: Extract text between delimiters
        description: Replace each line with the text between two known delimiters.
        regex:
          steps:
            - find: '^.*\[(.*?)\].*$'
              replace: "$1"
        example: |
          Name: [Kevin]
          Name: [Alex]
      - label: Wrap matching values in quotes
        description: Find values matching a pattern and surround them with quotes.
        regex:
          steps:
            - find: '\b\d+\b'
              replace: '"$&"'
        example: |
          123
          456
          789
      - label: Add commas to multiline values
        description: Add a comma to the end of every non-empty line for converting line-separated values into a list.
        regex:
          steps:
            - find: "^(.+)$"
              replace: "$1,"
        example: |
          apple
          banana
          orange
      - label: Convert lines into a quoted list
        description: Transform one value per line into quoted, comma-separated values.
        regex:
          steps:
            - find: "^(.+)$"
              replace: '"$1",'
        example: |
          apple
          banana
          orange
      - label: Swap two values on each line
        description: Swap two delimiter-separated values using capture groups.
        regex:
          steps:
            - find: '^([^,]+),\s*(.+)$'
              replace: "$2, $1"
        example: |
          Smith, John
          Doe, Jane
      - label: Convert Last, First names
        description: Convert names from "Last, First" format to "First Last".
        regex:
          steps:
            - find: '^([^,]+),\s*(.+)$'
              replace: "$2 $1"
        example: |
          Smith, John
          Doe, Jane
      - label: Add indentation to matching lines
        description: Add indentation to every line matching a specific pattern.
        regex:
          steps:
            - find: "^(import .+)$"
              replace: '"  $1"'
        example: |
          import foo
          const value = 1
          import bar
      - label: Remove leading indentation
        description: Remove all leading spaces and tabs from lines.
        regex:
          steps:
            - find: '^[ \t]+'
              replace: '""'
        example: |
          first line
            second line
              third line
      - label: Normalize trailing whitespace
        description: Remove spaces and tabs from the ends of every line.
        regex:
          steps:
            - find: '[ \t]+$'
              replace: '""'
      - label: Add blank lines between matches
        description: Insert a blank line after every line matching a pattern.
        regex:
          steps:
            - find: "^(#+ .+)$"
              replace: '$1\n'
        example: |
          # Heading
          Content
          ## Another heading
          More content
      - label: Join wrapped lines
        description: Join consecutive lines that belong to the same paragraph while preserving blank lines.
        regex:
          steps:
            - find: '(?<!\n)\n(?!\n)'
              replace: '" "'
      - label: Convert HTML attributes
        description: Replace an HTML attribute value while preserving the surrounding tag.
        regex:
          steps:
            - find: '(<img\b[^>]*\bsrc=")[^"]*(")'
              replace: "$1/new/path/image.jpg$2"
        example: |
          <img src="/old/path/image.jpg" alt="Example">
      - label: Rename an HTML attribute
        description: Rename an attribute everywhere while preserving its value.
        regex:
          steps:
            - find: '\bdata-old="([^"]*)"'
              replace: 'data-new="$1"'
        example: |
          <div data-old="123">
          <span data-old="456">
      - label: Convert Markdown links to URLs
        description: Replace Markdown links with only their destination URLs.
        regex:
          steps:
            - find: '\[([^\]]+)\]\((https?://[^)]+)\)'
              replace: "$2"
        example: |
          [Google](https://google.com)
          [YouTube](https://youtube.com)
      - label: Convert Markdown links to HTML
        description: Convert Markdown links into HTML anchor elements.
        regex:
          steps:
            - find: '\[([^\]]+)\]\((https?://[^)]+)\)'
              replace: '<a href="$2">$1</a>'
        example: |
          [Google](https://google.com)
      - label: Remove Markdown link formatting
        description: Keep the visible link text while removing the Markdown destination.
        regex:
          steps:
            - find: '\[([^\]]+)\]\([^)]+\)'
              replace: "$1"
        example: |
          [Google](https://google.com)
          [Example](https://example.com)
      - label: Convert Markdown headings
        description: Convert Markdown headings into HTML heading elements while preserving heading levels and text.
        regex:
          steps:
            - find: '^#{1,6}\s+(.+)$'
              replace: '"<h$#>$1</h$#>"'
        comment: VS Code replacement syntax cannot dynamically reuse the number of # characters this way; use one replacement per heading level when the level must be preserved.
      - label: Find duplicate lines
        description: Find repeated complete lines so duplicates can be reviewed or removed.
        code: ^(.+)(?:\r?\n\1)+$
        codeLang: regex
        example: |
          apple
          banana
          apple
          orange
      - label: Find duplicate adjacent values
        description: Find repeated words or values appearing consecutively.
        code: \b(\w+)\s+\1\b
        codeLang: regex
        example: very very important
      - label: Find repeated words ignoring case
        description: Find consecutive duplicate words regardless of capitalization.
        code: \b([A-Za-z]+)\s+\1\b
        codeLang: regex
        example: The the quick brown fox
      - label: Find lines containing multiple patterns
        description: Find lines that contain both required patterns without caring about their order.
        code: ^(?=.*foo)(?=.*bar).*$
        codeLang: regex
        example: foo and bar appear on this line
      - label: Find lines missing a pattern
        description: Find complete lines that do not contain a required pattern.
        code: ^(?!.*foo).*$
        codeLang: regex
        example: |
          foo is present
          this line does not contain it
      - label: Find values with surrounding whitespace
        description: Find a value while capturing its meaningful content and excluding surrounding whitespace.
        code: ^\s*(.*?)\s*$
        codeLang: regex
        example: "   some value   "
      - label: Replace only the first occurrence per line
        description: Replace the first occurrence of a pattern on each line while leaving later occurrences unchanged.
        regex:
          steps:
            - find: "^(.*?)foo"
              replace: "$1bar"
        example: foo foo foo
      - label: Replace everything after a delimiter
        description: Preserve the beginning of each line and replace everything after a known delimiter.
        regex:
          steps:
            - find: "^([^:]+):.*$"
              replace: "$1: new value"
        example: |
          name: old value
          status: old value
      - label: Replace everything before a delimiter
        description: Preserve the end of each line and replace everything before a known delimiter.
        regex:
          steps:
            - find: '^.*:\s*(.+)$'
              replace: "new key: $1"
        example: |
          old key: value
          another key: value
      - label: Extract file extensions
        description: Replace filenames with only their final file extension.
        regex:
          steps:
            - find: '^.*\.([^.]+)$'
              replace: "$1"
        example: |
          image.png
          document.pdf
          archive.tar.gz
      - label: Change file extensions
        description: Replace the extension of every matching filename while preserving the filename.
        regex:
          steps:
            - find: '^(.+)\.[^.]+$'
              replace: "$1.webp"
        example: |
          image.png
          photo.jpg
          graphic.gif
      - label: Convert kebab-case to camelCase
        description: Convert hyphenated words into camelCase using a capture group.
        regex:
          steps:
            - find: "-([a-z])"
              replace: '\u$1'
        example: my-component-name
      - label: Convert snake_case to camelCase
        description: Convert underscore-separated words into camelCase.
        regex:
          steps:
            - find: "_([a-z])"
              replace: '\u$1'
        example: my_component_name
      - label: Remove comments from lines
        description: Remove inline comments while preserving the content before the comment marker.
        regex:
          steps:
            - find: '^(.*?)(?:\s*#.*)?$'
              replace: "$1"
        example: command --option value # remove this
      - label: Extract quoted strings
        description: Find and capture text enclosed in single or double quotes.
        code: (["'])(.*?)\1
        codeLang: regex
        example: |
          "hello world"
          'another value'
      - label: Find TODO or FIXME lines
        description: Find development notes such as TODO and FIXME regardless of capitalization.
        code: ^.*\b(?:TODO|FIXME)\b.*$
        codeLang: regex
        example: |
          // TODO: refactor this
          // FIXME: handle error case
      - label: Find empty or whitespace-only lines
        description: Find lines that contain no meaningful characters.
        code: ^\s*$
        codeLang: regex
      - label: Collapse multiple blank lines
        description: Replace runs of multiple blank lines with a single blank line.
        regex:
          steps:
            - find: '(?:\r?\n\s*){3,}'
              replace: '\n\n'
      - label: Add a newline after delimiters
        description: Split a single-line list into separate lines after a delimiter.
        regex:
          steps:
            - find: ',\s*'
              replace: '\n'
        example: apple, banana, orange
      - label: Split key-value pairs into lines
        description: Split semicolon-separated key-value pairs onto separate lines.
        regex:
          steps:
            - find: ';\s*'
              replace: '\n'
        example: name=Kevin;role=developer;active=true
      - label: Extract URLs from arbitrary text
        description: Find HTTP and HTTPS URLs embedded anywhere in text.
        code: https?://[^\s<>"')]+
        codeLang: regex
        example: Visit https://example.com/path?q=1 for details.
      - label: Find email addresses
        description: Find common email address patterns embedded in text.
        code: \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b
        codeLang: regex
        example: Contact support@example.com for help.
      - label: Find version numbers
        description: Find semantic-style version numbers such as 1.2.3 or 2.0.0-beta.
        code: \b\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?\b
        codeLang: regex
        example: version 2.4.1-beta.3
      - label: Find ISO dates
        description: Find dates formatted as YYYY-MM-DD.
        code: \b\d{4}-\d{2}-\d{2}\b
        codeLang: regex
        example: Published on 2026-08-10.
      - label: Find hex colors
        description: Find three- or six-digit hexadecimal color values.
        code: \B#[0-9A-Fa-f]{3}(?:[0-9A-Fa-f]{3})?\b
        codeLang: regex
        example: "color: #fff; background: #1a2b3c"
      - label: Find CSS declarations
        description: Capture CSS property names and values for bulk editing.
        code: '^\s*([A-Za-z-]+)\s*:\s*([^;]+);?'
        codeLang: regex
        example: "  color: #fff;"
      - label: Find JSON keys
        description: Find quoted JSON property names while preserving their names for replacement.
        code: "^[ \\t]*\"([^\"\\\\]+)\"\\s*:"
        codeLang: regex
        example: |
          "name": "Kevin",
          "email": "kevin@example.com",
      - label: Convert JSON keys to another name
        description: Rename JSON keys while leaving their values untouched.
        regex:
          steps:
            - find: '(^\s*)"oldName"(\s*:)'
              replace: '$1"newName"$2'
        example: |
          {
            "oldName": "value"
          }
      - label: Wrap selected lines in tags
        description: Wrap every complete line in a consistent opening and closing tag.
        regex:
          steps:
            - find: "^(.+)$"
              replace: "<item>$1</item>"
        example: |
          First
          Second
          Third
      - label: Prefix matching lines
        description: Add a prefix only to lines containing a specific pattern.
        regex:
          steps:
            - find: "^(?=.*error)(.*)$"
              replace: '"ERROR: $1"'
        example: |
          request succeeded
          request error occurred
          another error
      - label: Suffix matching lines
        description: Add a suffix only to lines containing a specific pattern.
        regex:
          steps:
            - find: "^(?=.*TODO)(.*)$"
              replace: '"$1 <!-- review -->"'
        example: |
          TODO: update documentation
          completed task
      - label: Capture text before a delimiter
        description: Capture everything before the first occurrence of a delimiter.
        code: "^([^:]+):"
        codeLang: regex
        example: "name: Kevin"
      - label: Capture text after a delimiter
        description: Capture everything after the first occurrence of a delimiter.
        code: :\s*(.*)$
        codeLang: regex
        example: "name: Kevin"
      - label: Match balanced-looking parentheses
        description: Match simple parenthesized content when nested parentheses are not required.
        code: \([^()]*\)
        codeLang: regex
        example: Function (argument value)
      - label: Match text between HTML tags
        description: Capture the content inside a specific HTML element.
        code: <p\b[^>]*>(.*?)</p>
        codeLang: regex
        example: <p>This is the content.</p>
      - label: Remove HTML tags
        description: Strip simple HTML tags while preserving their text content.
        regex:
          steps:
            - find: "<[^>]+>"
              replace: '""'
      - label: Convert line endings
        description: Normalize Windows CRLF line endings to LF.
        regex:
          steps:
            - find: '\r\n'
              replace: '\n'
      - label: Find lines with trailing punctuation
        description: Find lines ending with punctuation that can be removed or replaced.
        code: ^(.+?)[,;:]+$
        codeLang: regex
        example: |
          first;
          second,
          third:
      - label: Remove trailing punctuation
        description: Remove commas, semicolons, or colons from the ends of lines.
        regex:
          steps:
            - find: "^(.+?)[,;:]+$"
              replace: "$1"
      - label: Find numeric values with units
        description: Capture a number and its unit separately for bulk conversion or editing.
        code: \b(\d+(?:\.\d+)?)\s*(px|em|rem|%|vh|vw)\b
        codeLang: regex
        example: |
          width: 24px
          margin: 1.5rem
          height: 50vh
      - label: Find function calls
        description: Capture function names and their arguments for bulk code transformations.
        code: \b([A-Za-z_$][\w$]*)\(([^()]*)\)
        codeLang: regex
        example: console.log("hello")
      - label: Convert function syntax
        description: Transform simple function calls using captured function names and arguments.
        regex:
          steps:
            - find: '\b([A-Za-z_$][\w$]*)\(([^()]*)\)'
              replace: "$1[$2]"
        example: |
          foo(bar)
          baz(qux)
      - label: Find imports from a package
        description: Find JavaScript or TypeScript imports originating from a specific package.
        code: ^import\s+.*\s+from\s+["']some-package["'];?$
        codeLang: regex
        example: import { foo } from "some-package";
      - label: Find TODO comments across files
        description: Find TODO comments while capturing the message for review or extraction.
        code: \bTODO\b[:\s]*(.+)$
        codeLang: regex
        example: "// TODO: replace this implementation"
      - label: Find lines with unmatched quotes
        description: Find lines containing an odd number of double quotes, useful for locating malformed quoted values.
        code: ^(?:[^"]*"[^"]*")*[^"]*"[^"]*$
        codeLang: regex
        example: 'name: "Kevin'
      - label: Match repeated separators
        description: Find runs of repeated punctuation that can be normalized.
        code: ([|,_-])\1+
        codeLang: regex
        example: foo---bar___baz
      - label: Normalize repeated separators
        description: Replace repeated separators with a single separator.
        regex:
          steps:
            - find: '([|,_-])\1+'
              replace: "$1"
        example: foo---bar___baz
      - label: Find whitespace around delimiters
        description: Find inconsistent whitespace surrounding commas, colons, or equals signs.
        code: \s*([,:=])\s*
        codeLang: regex
        example: "name  :  Kevin"
      - label: Normalize delimiter spacing
        description: Normalize whitespace around a delimiter while preserving the delimiter.
        regex:
          steps:
            - find: '\s*([,:=])\s*'
              replace: "$1"
        example: "name  :  Kevin"
      - label: Extract Markdown frontmatter fields
        description: Capture the value of a specific YAML frontmatter field.
        code: ^title:\s*(.+)$
        codeLang: regex
        example: "title: My Cheatsheet"
      - label: Replace a frontmatter field
        description: Replace the value of a specific YAML frontmatter field without changing the field name.
        regex:
          steps:
            - find: '^(title:\s*).+$'
              replace: "$1New Title"
        example: "title: Old Title"
      - label: Find multiline blocks
        description: Match a block beginning with one marker and ending at the next marker using a lazy match.
        code: ^START$[\s\S]*?^END$
        codeLang: regex
        example: |
          START
          content
          more content
          END
      - label: Remove multiline blocks
        description: Delete complete blocks between explicit START and END markers.
        regex:
          steps:
            - find: '^START$[\s\S]*?^END$\r?\n?'
              replace: '""'
      - label: Find content between repeated delimiters
        description: Capture content between matching delimiter characters such as triple backticks.
        code: '```([\\s\\S]*?)```'
        codeLang: regex
        example: |
          ```
          code here
          ```
      - label: Extract Markdown code blocks
        description: Capture the contents of fenced Markdown code blocks without the surrounding fences.
        code: ^```(?:\w+)?\r?\n([\s\S]*?)^```$
        codeLang: regex
        example: |
          ```ts
          const value = 1;
          ```
      - label: Convert Markdown code fences
        description: Replace fenced code blocks with another delimiter while preserving their contents.
        regex:
          steps:
            - find: |-
                ^```(?:\w+)?\r?\n([\s\S]*?)^```$
              replace: "<pre>$1</pre>"
      - label: Move captured text to a new line
        description: Capture part of each line and move it onto its own line.
        regex:
          steps:
            - find: '^(.*?)(\s+)(https?://\S+)$'
              replace: '$1\n$3'
        example: |
          Visit https://example.com
          Documentation https://example.org/docs
      - label: Keep only lines matching a URL
        description: Delete every line that does not begin with an HTTP or HTTPS URL.
        regex:
          steps:
            - find: '^(?!https?://).*(?:\r?\n|$)'
              replace: '""'
        example: |
          https://example.com
          Some unrelated text
          https://example.org
      - label: Extract URLs into a clean list
        description: Extract URLs from arbitrary lines, then remove the surrounding text and preserve one URL per line.
        regex:
          steps:
            - find: '^.*?(https?://\S+).*$'
              replace: "$1"
        example: |
          Website: https://example.com
          Docs: https://example.org/docs
      - label: Find lines beginning with a pattern
        description: Find complete lines beginning with one of several alternatives.
        code: ^(?:ERROR|WARN|INFO)\b.*$
        codeLang: regex
        example: |
          INFO Application started
          WARN Cache expired
          DEBUG Request received
      - label: Find lines ending with a pattern
        description: Find complete lines ending with one of several alternatives.
        code: ^.*(?:\.js|\.ts|\.tsx)$
        codeLang: regex
        example: |
          src/index.ts
          src/app.tsx
          README.md
      - label: Replace selected file extensions
        description: Change only specified extensions while preserving the filename.
        regex:
          steps:
            - find: '^(.+)\.(?:js|jsx|ts)$'
              replace: "$1.mjs"
        example: |
          app.js
          component.jsx
          server.ts
          README.md
      - label: Add extensions to extensionless files
        description: Add a file extension to matching filenames that do not already have one.
        regex:
          steps:
            - find: "^([^./]+)$"
              replace: "$1.txt"
        example: |
          README
          LICENSE
          notes
      - label: Find TODOs excluding completed items
        description: Find TODO markers that are not immediately followed by a completed status.
        code: ^(?!.*TODO\s*DONE).*TODO.*$
        codeLang: regex
        example: |
          TODO: fix this
          TODO DONE: already handled
      - label: Find deprecated API usage
        description: Find calls to a deprecated function while avoiding comments and unrelated identifiers.
        code: \bdeprecatedFunction\s*\(
        codeLang: regex
        example: deprecatedFunction(value)
      - label: Find quoted values with a specific prefix
        description: Find quoted strings whose contents begin with a known prefix.
        code: |
          ["'](?:https?://)[^"']+["']
        codeLang: regex
        example: 'url: "https://example.com"'
      - label: Find values not matching a format
        description: Find lines whose entire value does not match a required format.
        code: ^(?!\d{4}-\d{2}-\d{2}$).+$
        codeLang: regex
        example: |
          2026-08-10
          08/10/2026
          2026-8-10
---
