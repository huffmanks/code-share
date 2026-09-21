---
title: golang
description: Go basics covering variables, control flow, collections, functions, structs, error handling, and concurrency.
updatedAt: 2026-09-20 20:17:03
groups:
  - title: Basic Types & Variables
    description: Core variable and constant declarations.
    items:
      - label: Integer
        description: Whole numbers.
        comment: "42"
      - label: Float
        description: Decimal numbers.
        comment: "3.14"
      - label: String
        description: Textual data.
        comment: "hello"
      - label: Boolean
        description: True or false values.
        comment: "true"
      - label: Variable Declaration
        description: Declaring variables with type inference.
        codeLang: go
        code: 'name := "Alice"'
      - label: Constant Declaration
        description: Declaring immutable constant values.
        codeLang: go
        code: "const Pi = 3.14"
  - title: Control Flow
    description: Controlling the execution of code.
    items:
      - label: if statement
        description: Conditional execution.
        codeLang: go
        code: |
          if x > 0 {
              fmt.Println("Positive")
          }
      - label: for loop
        description: Iterating over sequences or conditions.
        codeLang: go
        code: |
          for i := 0; i < 5; i++ {
              fmt.Println(i)
          }
      - label: switch statement
        description: Multi-way conditional branching.
        codeLang: go
        code: |
          switch os {
          case "linux":
              fmt.Println("Linux")
          default:
              fmt.Println("Other")
          }
  - title: Collections
    description: Organizing multiple values in slices and maps.
    items:
      - label: Slice Declaration
        description: Creating dynamic arrays.
        codeLang: go
        code: "numbers := []int{1, 2, 3}"
      - label: Map Declaration
        description: Creating key-value lookup tables.
        codeLang: go
        code: 'm := map[string]int{"a": 1}'
  - title: Functions
    description: Reusable blocks of code and multi-value returns.
    items:
      - label: Function definition
        description: Creating a function with return types.
        codeLang: go
        code: |
          func add(a int, b int) int {
              return a + b
          }
      - label: Multiple Return Values
        description: Returning multiple values from a function.
        codeLang: go
        code: |
          func divide(a, b int) (int, error) {
              if b == 0 {
                  return 0, fmt.Errorf("division by zero")
              }
              return a / b, nil
          }
  - title: Structs & Methods
    description: Defining custom composite types and receivers.
    items:
      - label: Struct Definition
        description: Defining custom data structures.
        codeLang: go
        code: |
          type Person struct {
              Name string
              Age  int
          }
      - label: Method Definition
        description: Defining functions attached to a struct receiver.
        codeLang: go
        code: |
          func (p Person) Greet() {
              fmt.Println(p.Name)
          }
  - title: Error Handling
    description: Managing runtime errors explicitly.
    items:
      - label: Error Checking
        description: Handling standard error returns.
        codeLang: go
        code: |
          result, err := doSomething()
          if err != nil {
              log.Fatal(err)
          }
  - title: Concurrency
    description: Running lightweight concurrent threads and channels.
    items:
      - label: Goroutine
        description: Spawning concurrent background tasks.
        codeLang: go
        code: "go processData()"
      - label: Channel Communication
        description: Passing data safely between goroutines.
        codeLang: go
        code: |
          ch := make(chan string)
          ch <- "message"
          msg := <-ch
---
