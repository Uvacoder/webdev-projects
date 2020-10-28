# Portfolio

A portfolio website written in HTML + CSS.

Here are some of the points we'll cover.

## HTML

### Syntax Overview

- XML-like: tags, attributes, content
- Self-closing tags: https://dev.w3.org/html5/html-author/#tags
- Doctype
- Embeddable languages (src, script)

### Elements

- Page elements: html, head, body, title, style, script
- Content: main, section, h1, h2, h3, p
- Inline elements: img, strong, emote
- Generic: div, span
- Navigation: nav, a
- Lists: ul, ol, li
- Forms: form, label, input, select, option, textarea, button

### Accessibility

- Using semantic elements (e.g. a vs. button vs. div with click listener)
- Skip content link
- Keyboard navigation: tabindex, js
- Roles
- Labeling form inputs
- img alt text

### HTML Challenges

- Reusability
- Encapsulation
- Browser differences
- Screenreader differences

## CSS

- Selectors: id, class, tagname, `*`
- Rule order and specificity
- Inheritance
- Box model
  - Border, margin, padding
  - Box-sizing
- Display: block, inline-block, flex, etc.
- Flexbox
- Multiple classes
- Complex selectors: attributes, siblings/children, etc
- Media queries
- Units: px vs rems
- User agent styles
- Resets: meyerweb, normalize, etc

## TODO

- Pseudo-classes: hover, focus, etc.
- Pseudo-elements: before, after, etc

## Programmatic access

Demonstrate DOM access via JS console:

```js
document.body.children[1].children[2].textContent;
document.body.children[1].children[2].textContent = "hi";
```

## Resources

- MDN Docs: https://developer.mozilla.org/en-US/
- Markup validator: https://validator.w3.org/
- All standards: https://www.w3.org/TR/
- HTML spec: https://html.spec.whatwg.org/
- Web accessibility docs: https://www.w3.org/WAI/design-develop/
- CSS Tricks: https://css-tricks.com/
- VSCode Live Server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

### Mock APIs for prototyping

- https://jsonplaceholder.typicode.com/
- https://github.com/typicode/json-server
- https://runkit.com/home
