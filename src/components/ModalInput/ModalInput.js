import Sheet from "react-modal-sheet";
import { useState, useRef } from "react";
import { SiWindows11 } from "react-icons/si";
import "./ModalInput.css";

export default function ModalInput({ title, prompt, placeholder, submit }) {
  const [isOpen, setOpen] = useState(false);
  const inputValue = useRef(0);

  return (
    <>
      {/* <button onClick={() => setOpen(true)}>Open sheet</button> */}
      <SiWindows11 onClick={() => setOpen(true)} className="icon-button" />

      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {/* Your sheet content goes here */}
            <div id="modal">
              <h2>{title}</h2>
              <p>{prompt}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  submit(inputValue.current.value);
                  inputValue.current.value = "";
                }}
              >
                <input
                  ref={inputValue}
                  placeholder={placeholder || ""}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
