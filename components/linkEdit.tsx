import { auth } from "@/config/firebase";
import { usePreview } from "@/context/preview";
import { updateLinksFieldMutation } from "@/functions/mutation";
import { Link } from "@/types/types";
import { Draggable } from "@hello-pangea/dnd";
import { Check, LinkIcon, Pen, Trash, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AddLink from "./addLink";

type LinkEditProps = {
  link: Link;
  index: number;
};

export default function LinkEdit({ link, index }: LinkEditProps) {
  const [open, setOpen] = useState(false);
  const [field, setField] = useState<Link | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const { links, setLinks } = usePreview();

  const deleteLink = async (linkSelected: Link) => {
    const uid = auth.currentUser?.uid;

    try {
      const linksUpdated = links.filter((_link) => _link !== linkSelected);
      setLinks(linksUpdated);
      await updateLinksFieldMutation(uid!, linksUpdated);
      toast.success("Link deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Draggable key={link.name} draggableId={link.name!} index={index}>
        {(provided) => (
          <li
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={`border flex flex-col mb-3 bg-[#ffff] border-blue-500 rounded-full py-3 px-5 w-full hover:border-blue-600 hover:shadow-md hover:shadow-blue-100 duration-150 ${openModal && "shadow-md shadow-blue-300 pointer-events-none"
              }`}
            title="Move"
          >
            <div className="flex justify-between">
              <p className="font-bold ml-5 text-blue-700">{link.name}</p>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setOpen(true);
                    setField({
                      type: link.type,
                      name: link.name,
                      url: link.url,
                    });
                  }}
                  className="hover:text-blue-800 duration-200 text-blue-600 rounded-full"
                  title="Edit link"
                >
                  <Pen size={18} />
                </button>

                <button
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className="hover:text-blue-800 duration-200 text-blue-600 rounded-full"
                  title="Delete link"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>

            <span className="text-gray-600 text-sm flex items-center gap-2 mt-1">
              <LinkIcon size={15} /> {link.url}
            </span>
          </li>
        )}
      </Draggable>

      {openModal && (
        <div className="p-3 relative gap-2 before:absolute before:rounded-sm before:w-4 before:h-4 before:top-[-7px] before:rotate-45 before:bg-blue-400 rounded-lg bg-blue-400 flex justify-between items-center mb-6">
          <p className="text-white">Sure you want to delete this link?</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenModal(false)}
              title="cancel"
              className="p-1 bg-gray-200 rounded-full hover:bg-gray-100 hover:scale-105 duration-75"
            >
              <X size={18} className="text-red-600" />
            </button>

            <button
              title="confirm"
              className="p-1 bg-gray-200 rounded-full hover:bg-gray-100 hover:scale-105 duration-75"
              onClick={() => deleteLink(link)}
            >
              <Check size={18} className="text-green-600" />
            </button>
          </div>
        </div>
      )}

      {open && <AddLink open={open} setOpen={setOpen} field={field} />}
    </>
  );
}
