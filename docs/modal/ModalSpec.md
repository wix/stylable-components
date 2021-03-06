**Table of Contents**

- [Definition](#definition)
- [Elements](#elements)
- [Props](#props)
- [Style](#style)
- [Accessibility](#accessibility)
- [Behavior](#behavior)
  - [Edge case handling](edge-case-handling)
  - [Keyboard](#keyboard)
  - [Mouse](#mouse)
  - [Touch](#touch)
- [Examples](#examples)
- [Design](#design)

  ​

## Definition

The **Modal** component is a window that opens on top of the application's main window. It blocks the main application's interactivity, and the application flow. In practice, it usually leaves the main app visible in the background, faded out. Users must interact with the modal in order to return to the application flow.

## Elements

![Modal](./assets/modal-basic.png)

The modal consists of a header, body and footer. The header usually contains a title and optionally a close button, the body contains the main modal content, and the footer usually contains a primary button and another close button. The modal has a backdrop that blocks interactivity with the rest of the screen.

Interacting with the modal can consist of:  
- clicking its primary button
- clicking its backdrop
- clicking its close/cancel button(s)

## Props

See [README.md](./README.md) for more info. 

## Style

Brief description of pseudo-classes and custom CSS states that can be applied to the component.
See [README.md](./README.md) for more info. 

## Accessibility

The Modal component is by default given `aria-role="dialog"`. 

You may give the Modal any aria attributes, such as labelledby, describedby, hidden and 

##### Reference links

* https://www.w3.org/TR/wai-aria-1.1/#dialog
* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_dialog_role
* http://www.oaa-accessibility.org/example/2/

### Keyboard

| Keys | Action |
| -- | -- |
| esc | closes the modal (source=escKeyPress) |
| tab | moves to next element of the modal |
| shift+tab | moves to the previous element of the modal |

### Mouse

| Event | Action | NOTE |
| -- | -- | -- |
| click | on modal | should be inactive, unless clicking a button |
| click | on backdrop | will close the modal (source=backdropClick) |

### Touch

| Event | Action | NOTE |
| -- | -- | -- |
| tap | on modal | should be inactive, unless tappign a button |
| tap | on backdrop | will close the modal (source=backdropTap) |

## Design

Link to [assets](https://app.zeplin.io/project/5864e02695b5754a69f56150/screen/588f14b1bfaae69a22be1620)
