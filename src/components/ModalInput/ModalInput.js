import Sheet from "react-modal-sheet";
import { useState, useRef } from "react";
import { SiWindows11 } from "react-icons/si";
import "./ModalInput.css";

export default function ModalInput({
  icon,
  title,
  prompt,
  placeholder,
  modalSubmit,
}) {
  const [isOpen, setOpen] = useState(false);
  const inputValue = useRef();


  return (
    <>
      <div onClick={() => setOpen(true)} >{icon ? icon : <SiWindows11 className="icon-button" />}</div>

      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div
              style={{
                textAlign: "center",
                height: "240px",
              }}
              id="modal"
            >
              <div onClick={() => setOpen(false)} >{icon ? icon : <SiWindows11 className="icon-button" />}</div>
              <h2>{title}</h2>
              <p>{prompt}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                  modalSubmit(inputValue.current.value);
                  inputValue.current.value = "";
                }}
              >
                <input
                  ref={inputValue}
                  name="room"
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
