# Briefs

Briefs (blog posts) live in `src/blog/posts/` as Markdown files with YAML frontmatter.

## Frontmatter

```yaml
layout: layouts/post.njk
title: "Post Title"
date: 2026-01-26
keywords:
  - privacy
  - surveillance
categories: Surveillance Society
image: /assets/images/blog/filename.jpg
imageAlt: "Alt text for the hero image"
permalink: "/blog/custom-slug/"
tldr:
  - First bullet point summary.
  - Second bullet point summary.
updates:
  - date: 2026-03-15
    note: "Corrected the statistic from 78% to 83%."
```

The `tldr` list renders as a summary box above the post body. The `updates` list renders as a correction/update notice in the end of the post, and the most recent update date is also used as `<lastmod>` in the sitemap.

## Callout boxes

Five variants are available: `note` (steel blue), `warning` (gold), `source` (dark navy), `tip` (steel accent), and `definition` (parchment background, navy accent).

```markdown
::: note
A generic note with no title.
:::

::: warning Data Retention
This service retains logs for 90 days.
:::

::: source Reuters, March 2026
["Study finds..."](https://reuters.com/...) - Full methodology in the linked report.
:::

::: tip
You can verify this in your browser's network tab.
:::

::: definition End-to-end encryption
A communication method where only the communicating parties can read the messages.
:::
```

## Pull quotes

```markdown
::: pullquote
The internet we built has fundamental issues, and VPNs are the bandages we slap over them.

John Doe, a privacy advocate, in an interview with Tech News, April 2026.
:::
```

### Key stats

The first paragraph becomes the large number; subsequent paragraphs become the caption.

```markdown
::: stat Surveillance Reach
83%

of free mobile apps share data with third parties without explicit consent.
:::
```

### Footnotes

```markdown
This claim needs a citation.[^1]

[^1]: Reuters, "Study finds...", March 2026. https://reuters.com/...
```
