import { Link } from "@/types/types";
import { Draggable } from "@hello-pangea/dnd";
import { Edit, LinkIcon } from "lucide-react";
import { useState } from "react";
import AddLink from "./addLink";

type LinkEditProps = {
  link: Link;
  index: number;
};

export default function LinkEdit({ link, index }: LinkEditProps) {
  const [open, setOpen] = useState(false);
  const [field, setField] = useState<Link | null>(null);

  return (
    <>
      <Draggable key={link.name} draggableId={link.name!} index={index}>
        {(provided) => (
          <li
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="border flex mb-3 bg-[#ffff] justify-between border-blue-500 rounded-full py-3 px-5 w-full hover:border-blue-600 hover:shadow-md hover:shadow-blue-100 duration-150"
            title="Move"
          >
            <div>
              <p className="font-bold ml-5 text-blue-700">{link.name}</p>
              <span className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                <LinkIcon size={15} /> {link.url}
              </span>
            </div>

            <button
              onClick={() => {
                setOpen(true);
                setField({ type: link.type, name: link.name, url: link.url });
              }}
              className="p-1 hover:text-blue-800 duration-200 text-blue-600 rounded-full"
              title="Edit link"
            >
              <Edit size={20} />
            </button>
          </li>
        )}
      </Draggable>

      {open && <AddLink open={open} setOpen={setOpen} field={field} />}
    </>
  );
}
