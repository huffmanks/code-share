---
title: python
description: Python basics covering data types, control flow, functions and common operations.
updatedAt: 2026-09-20 20:11:22
groups:
  - title: Data Types
    description: Common data types in Python.
    items:
      - label: Integer
        description: Whole numbers.
        comment: "10"
      - label: Float
        description: Decimal numbers.
        comment: "3.14"
      - label: String
        description: Textual data.
        comment: "Hello, world!"
      - label: Boolean
        description: True or False values.
        comment: "True"
      - label: List
        description: Ordered, mutable sequences.
        comment: "[1, 2, 3]"
      - label: Tuple
        description: Ordered, immutable sequences.
        comment: "(1, 2, 3)"
      - label: Dictionary
        description: Key-value pairs.
        comment: "{'a': 1, 'b': 2}"
      - label: Set
        description: Unordered collections of unique elements.
        comment: "{1, 2, 3}"
  - title: Modules & Imports
    description: Bringing external or standard library code into your script.
    items:
      - label: Standard Import
        description: Importing entire modules.
        codeLang: py
        code: import math
      - label: Selective Import
        description: Importing specific functions or classes.
        codeLang: py
        code: from math import sqrt
  - title: Control Flow
    description: Controlling the execution of code.
    items:
      - label: if statement
        description: Conditional execution.
        codeLang: py
        code: |
          if x > 0:
              print("Positive")
      - label: for loop
        description: Iterating over a sequence.
        codeLang: py
        code: |
          for i in range(5):
              print(i)
      - label: while loop
        description: Repeating code while a condition is true.
        codeLang: py
        code: |
          while x < 10:
              x += 1
      - label: break
        description: Exiting a loop.
        codeLang: py
        code: |
          for i in range(10):
              if i == 5:
                  break
      - label: continue
        description: Skipping to the next iteration of a loop.
        codeLang: py
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
        codeLang: py
        code: |
          def greet(name):
              return f"Hello, {name}!"
      - label: Function call
        description: Using a function.
        codeLang: py
        code: |
          message = greet("Alice")
          print(message)
      - label: Lambda function
        description: Anonymous, small functions.
        codeLang: py
        code: "square = lambda x: x * x"
  - title: Common Operations
    description: Frequent operations in Python.
    items:
      - label: String formatting
        description: Creating strings with embedded values.
        codeLang: py
        code: "f'The value is {x}'"
      - label: List comprehension
        description: Creating lists concisely.
        codeLang: py
        code: "[x**2 for x in range(10)]"
      - label: Slicing
        description: Accessing parts of a sequence.
        codeLang: py
        code: "my_list[1:4]"
      - label: File I/O
        description: Reading and writing files.
        codeLang: py
        code: |
          with open("my_file.txt", "r") as f:
              content = f.read()
  - title: Error Handling
    description: Managing runtime exceptions safely.
    items:
      - label: Try Except Block
        description: Catching and handling exceptions gracefully.
        codeLang: py
        code: |
          try:
              result = 10 / 0
          except ZeroDivisionError:
              result = 0
  - title: Object-Oriented Programming
    description: Defining classes and object structures.
    items:
      - label: Class Definition
        description: Creating classes with initializers.
        codeLang: py
        code: |
          class Person:
              def __init__(self, name):
                  self.name = name
---
