# Inkdown Feature Showcase

This document demonstrates the capabilities of the Inkdown CLI, a tool for converting Markdown into beautifully styled PDFs.

## Basic Formatting

Of course, all the standard Markdown formatting is supported.

- **Bold Text** and *Italic Text*
- `inline_code()`
- [Hyperlinks](https://github.com/TimeOfMaster/inkdown)

> This is a blockquote, perfect for highlighting important notes or quotes from other sources.

An ordered list:

1.  First item
2.  Second item
3.  Third item

---

## Callouts

You can use callouts to highlight important information.

::: note
This is a note.
:::

::: warning
This is a warning.
:::

::: tip
This is a tip.
:::

::: info
This is an info block.
:::

---

## Code Blocks

Syntax highlighting is supported for a variety of languages. Here are a few examples.

**JavaScript:**
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet('World');
```

**Python:**
```python
def fibonacci(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()
fibonacci(100)
```

## Citations

Inkdown supports special styling for citations to mimic academic papers [^citation1]. You can use Markdown-style footnotes for this. For example, here's a citation [^citation1].

Another example of a citation [^citation2].

[^citation1]: Doe, J. (2024). *The Art of Markdown*. Fictional Publishing.
[^citation2]: Smith, A. (2023). *A Guide to Beautiful PDFs*. Imaginary Press.
