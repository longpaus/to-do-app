import React, {ReactNode} from "react";

interface CollapseProps {
  title: ReactNode;
  defaultOpen: boolean;
  content: ReactNode;
}

const Accordion: React.FC<CollapseProps> = (props) => {
  const {title, defaultOpen, content} = props;
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="w-full  ">
      <input type="checkbox" checked={open} className="peer sr-only"/>
      <label
        className="w-full flex items-center justify-between transition-colors duration-1000 ease-in-out cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          width="20"
          height="20"
          className={`transform ${open ? "rotate-180" : ""} mr-2 transition-transform duration-300 ease-in-out darK:fill-white`}
        >
          <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/>
        </svg>
      </label>
      <div
        className={`h-0 peer-checked:h-auto overflow-hidden transition-[height] duration-1000 ease-in-out p-2 z-99`}
      >
        {content}
      </div>
    </div>

    // <div className="collapse  collapse-arrow">
    //   <input type="checkbox" defaultChecked={defaultOpen} />
    //   <div className="collapse-title">{title}</div>
    //   <div className="collapse-content">{content}</div>
    // </div>
  );
};
export default Accordion;
