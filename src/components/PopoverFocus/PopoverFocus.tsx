import {
  arrow,
  FloatingPortal,
  offset,
  Placement,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

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
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: "max-content",
                transformOrigin: `${middlewareData.arrow?.x}px top`,
                zIndex: 1,
              }}
              initial={{ opacity: 0, transform: "scale(0)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0)" }}
              transition={{ duration: 0.1 }}
              {...getFloatingProps()}
            >
              <div className="absolute top-0 left-0 h-5 w-full -translate-y-full"></div>
              <span
                className="absolute -translate-y-[98%] border-[11px] border-x-transparent border-t-transparent border-b-white"
                ref={arrowRef}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y,
                }}
              ></span>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
};

export default PopoverFocus;
