import Sheet from "react-modal-sheet";
import { useState, useRef } from "react";
import { SiWindows11 } from "react-icons/si";

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
            <div
              style={{
                textAlign: "center",
                height: "300px",
              }}
            >
              <h2>{title}</h2>
              <p>{prompt}</p>
              <form>
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
