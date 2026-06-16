
# DOM Explorer - Task Manager

## Project Overview

A fully interactive Task Manager Application built using only HTML, CSS, and Vanilla JavaScript, demonstrating core DOM and Event Handling concepts.

## Features Implemented

### 1. Task Creation Module
- Form with task title input and category dropdown
- Dynamically creates task cards using `createElement()`, `createTextNode()`, `append()`
- Instant updates without page refresh

### 2. Attributes vs Properties
- Custom data attributes on every task card: `data-id`, `data-status`, `data-category`
- Uses `getAttribute()`, `setAttribute()`, `removeAttribute()`, and `dataset` API
- Comments in code explaining the difference between attributes and properties

### 3. DOM Manipulation
- Task cards with Edit, Complete, and Delete buttons
- Implements: `append()`, `prepend()`, `remove()`, `createElement()`, `createTextNode()`, `appendChild()`

### 4. Theme Toggle
- Dark/Light mode switch using `classList`, `dataset`, and `setAttribute()`
- Theme stored in `data-theme` attribute

### 5. Event Handling
- Add, Delete, and Complete task functionality using `addEventListener()`

### 6. Event Delegation
- Single event listener on parent task container instead of individual buttons
- Efficient event handling for dynamic elements

### 7. Event Propagation Demonstration
- Visual demo of both Event Bubbling and Event Capturing
- Logs execution order in console and on page

### 8. Browser Rendering Pipeline
- Visual section explaining: HTML → Parsing → Tokenization → DOM Tree → CSSOM Tree → Render Tree

### Bonus Features
- Task Search
- Task Filter by Category
- Completed/Pending Task Counters
- Clear All Tasks Button
- DocumentFragment for efficient DOM updates
- Local Storage Integration (tasks and theme saved across sessions)

## Concepts Explained

### Parsing
The process where browser reads HTML code and converts it into a structured format for further processing.

### Tokenization
Breaking HTML into small units (tokens) that represent tags, attributes, text content, etc.

### DOM Tree
Hierarchical tree structure of HTML elements where each element is a node.

### CSSOM Tree
Hierarchical tree structure of CSS styles applied to elements.

### Render Tree
Combination of DOM and CSSOM trees that determines what and how elements are rendered on screen.

### Event Bubbling
Event propagates from the innermost target element up to the outermost ancestor.

### Event Capturing
Event propagates from the outermost ancestor down to the innermost target element.

### Event Delegation
Attaching a single event listener to a parent element instead of multiple listeners to individual child elements.

### Attributes vs Properties
- **Attributes**: Defined in HTML, accessed via `getAttribute()`/`setAttribute()`
- **Properties**: JavaScript object properties of DOM elements, reflect current state
