---
title: python
description: A quick reference to common Python syntax and concepts.
updatedAt: 2025-02-07 09:10:12
groups:
  - title: Data Types
    description: Common data types in Python.
    items:
      - label: Integer
        description: Whole numbers.
        example: "10"
      - label: Float
        description: Decimal numbers.
        example: "3.14"
      - label: String
        description: Textual data.
        example: "Hello, world!"
      - label: Boolean
        description: True or False values.
        example: "True"
      - label: List
        description: Ordered, mutable sequences.
        example: "[1, 2, 3]"
      - label: Tuple
        description: Ordered, immutable sequences.
        example: "(1, 2, 3)"
      - label: Dictionary
        description: Key-value pairs.
        example: "{'a': 1, 'b': 2}"
      - label: Set
        description: Unordered collections of unique elements.
        example: "{1, 2, 3}"
  - title: Control Flow
    description: Controlling the execution of code.
    items:
      - label: if statement
        description: Conditional execution.
        code: |
          if x > 0:
              print("Positive")
      - label: for loop
        description: Iterating over a sequence.
        code: |
          for i in range(5):
              print(i)
      - label: while loop
        description: Repeating code while a condition is true.
        code: |
          while x < 10:
              x += 1
      - label: break
        description: Exiting a loop.
        code: |
          for i in range(10):
              if i == 5:
                  break
      - label: continue
        description: Skipping to the next iteration of a loop.
        code: |
          for i in range(10):
              if i % 2 == 0:
                  continue
              print(i)
  - title: Functions
    description: Reusable blocks of code.
    items:
      - label: Function definition
        description: Creating a function.
        code: |
          def greet(name):
              return f"Hello, {name}!"
      - label: Function call
        description: Using a function.
        code: |
          message = greet("Alice")
          print(message)
      - label: Lambda function
        description: Anonymous, small functions.
        code: "square = lambda x: x * x"
  - title: Common Operations
    description: Frequent operations in Python
    items:
      - label: String formatting
        description: Creating strings with embedded values
        example: "f'The value is {x}'"
      - label: List comprehension
        description: Creating lists concisely
        example: "[x**2 for x in range(10)]"
      - label: Slicing
        description: Accessing parts of a sequence
        example: "my_list[1:4]"
      - label: File I/O
        description: Reading and writing files
        code: |
          with open("my_file.txt", "r") as f:
            content = f.read()
---
