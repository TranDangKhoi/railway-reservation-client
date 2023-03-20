## Back-end repository

Click here to navigate: [Backend Repository Link](https://github.com/TranDangKhoi/railway-reservation-server)

## Prerequisite

- **In order to run the current project, you must also clone the back-end codes**

## How to run this project

1. Clone this repository
2. Open the project, and install all the deps and devDeps (This process may takes more than a few minutes):
   <br clear="both">

- For `yarn` users, run `yarn`

- For `npm` users, run `npm install`

- For `pnpm` users, run `pnpm install`

3. Run `yarn dev` to start a localhost server, or you can run `yarn dev --host` to host and let other devices get access to the website you're currently hosting

## What i was using and is gonna be using in this project 🤔

- Framework: React, ASP.NET Core 7.0

- Programming languages: Typescript, C# 👩‍💻

- UI / CSS Library: Tailwind 🌊

- State Management: React Query for async state and React Context for other states 🔍

- Form Management: React Hook Form 👀

- Router: React Router 6️⃣

- Build tool: Vite ⚡

- Multilingualism: i18next 👩‍💻

- Self-testing and unit-testing applied 🔧

- _And many more ..._

# My notes

### How can i make the floating element the same width with the references ?

The quickest and most optimized solution is to use the `size` middleware, like the following:

```tsx
const { x, y, strategy, refs, context, middlewareData } = useFloating({
  middleware: [
    offset(offsetPx),
    shift(),
    arrow({ element: arrowRef }),
    size({
      apply({ rects, elements }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
        });
      },
    }),
  ],
  placement: placement,
  open: isOpen,
  onOpenChange: setIsOpen,
});
```
