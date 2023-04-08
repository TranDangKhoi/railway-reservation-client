## Back-end repository

Click here to navigate: [Backend Repository Link](https://github.com/TranDangKhoi/railway-reservation-server)

## Prerequisites

- **In order to run the current project, you must also clone the back-end repo and run it**

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

- UI / CSS Library: SASS, styled-components, Tailwind 💅

- State Management: React Query for async state and React Context for other states 🔍

- Form Management: React Hook Form 👀

- Router: React Router 6️⃣

- Build tool: Vite ⚡

- Multilingualism: i18next 👩‍💻

- Self-testing and unit-testing applied 🔧

- _And many more ..._

# My notes

## For "@floating-ui/react": "^0.21.0",

### How can i make the floating element the same width as the references ?

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

### How can i close all of the current opening floating elements when i click outside of its children and itself

You can use `useDismiss` hook to do that. First in order to show the floating element you should declare events like `onClick, onMouseEnter, e.t.c` in the <Element></Element> element. Like this:

```tsx
<Element
  className={className}
  onClick={() => setIsOpen(true)}
></Element>
```

And now you might use all of the codes followed on the documentation, implement it into your code. Here's an example:

```tsx
type PopoverProps = {
  children?: React.ReactNode;
  renderPopover?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  initialOpen?: boolean;
  placement?: Placement;
  offsetPx?: number;
};

const PopoverFocus = ({
  children,
  renderPopover,
  className,
  initialOpen = false,
  offsetPx = 10,
  placement = "bottom-end",
  as: Element = "div",
}: PopoverProps) => {
  const arrowRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
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
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
  return (
    <Element
      className={className}
      onClick={() => setIsOpen(true)}
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {children}
      <FloatingPortal>// Your floating element content</FloatingPortal>
    </Element>
  );
};
```

### Parent element height increases when datepicker is opened

Because you're using Tailwind to set the `font-size` and `line-height` for texts. So for example, `text-sm` will set that element's styles to:

```css
.text-sm {
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
}
```

What made your parent element height increase is the `line-height` property, you can fix that by setting only the font-size to 14px using jit-mode

Usage:

```tsx
<ReactDatePicker
  selected={date}
  onChange={handleSelectDate}
  className="text-[14px]"
></ReactDatePicker>
```

Instead of:

```tsx
<ReactDatePicker
  selected={date}
  onChange={handleSelectDate}
  className="text-sm"
></ReactDatePicker>
```
