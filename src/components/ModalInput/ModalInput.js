import Sheet from "react-modal-sheet";
import { useState, useRef } from "react";
import { SiWindows11 } from "react-icons/si";

export default function ModalInput({ title, prompt, submit }) {
  const [isOpen, setOpen] = useState(false);
  const inputValue = useRef(0);

  return (
    <>
      {/* <button onClick={() => setOpen(true)}>Open sheet</button> */}
      <SiWindows11 onClick={() => setOpen(true)} className="icon-button" />

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{/* Your sheet content goes here */}</Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
