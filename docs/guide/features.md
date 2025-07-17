# Features

Inkdown supports several extended Markdown features to make your documents more expressive and professional.

## Callouts

You can use callouts to highlight important information. Inkdown supports four types of callouts: `note`, `warning`, `tip`, and `info`.

### Note

Use `:::` containers to create callouts.

```markdown
::: note
This is a note. It's useful for highlighting information that is important but not critical.
:::
```

### Warning

Warnings are for critical information that the reader should not miss.

```markdown
::: warning
This is a warning. Use it to draw attention to potential pitfalls or important caveats.
:::
```

### Tip

Tips provide helpful advice or shortcuts.

```markdown
::: tip
This is a tip. It's great for offering suggestions that can improve the reader's workflow.
:::
```

### Info

Info blocks are for general information that doesn't fit into the other categories.

```markdown
::: info
This is an info block. It can be used for supplementary details or context.
:::
```

## Image Embedding

You can embed images in your documents using the standard Markdown syntax. Inkdown will automatically handle local and remote images.

```markdown
![An example image](https://placehold.co/600x200.png)
```

For oversized images, Inkdown will automatically scale them down to fit within the page width, and it will prevent them from being cut off by page breaks.
