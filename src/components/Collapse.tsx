import React, {ReactNode} from "react";

interface CollapseProps {
  title: ReactNode;
  defaultOpen: boolean;
  content: ReactNode;

}

const Collapse: React.FC<CollapseProps> = (props) => {
  const {title, defaultOpen, content} = props;
  return (
    <div className="collapse  collapse-arrow">
      <input type="checkbox" defaultChecked={defaultOpen}/>
      <div className="collapse-title">{title}</div>
      <div className="collapse-content">
        {content}
      </div>
    </div>
  )
}
export default Collapse;