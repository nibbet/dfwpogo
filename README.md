# DFW Pogo
Repository for custom webapp for DFW Pokémon GO community.

## Community Directory
`communities.html` displays local groups using data from `communities.json`. Update the JSON file to change the listing.

## Markdown Content
Event and update pages are built from Markdown files (for example, `weekdayevents.md`).
You can embed images in these files using standard Markdown syntax:

```
![Alt text](img/example.png)
```

Images included this way will automatically scale to fit the layout.

## Styling and Markdown Rendering
The site uses [Marked](https://marked.js.org/) with [Highlight.js](https://highlightjs.org/) to render GitHub-flavored Markdown with code syntax highlighting.  Responsive styles live in `dfwstyle.css`, which applies consistent formatting to headings, tables, checklists, and embedded images.
