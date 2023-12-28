"use client";

import { auth, db } from "@/config/firebase";
import { usePreview } from "@/context/preview";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { ChangeEvent, useCallback, useState } from "react";
import Select from "./Select";
import Color from "./color";

const titlesSizes = ["16", "24", "28", "32", "36"];
const nicknameSizes = [10, 12, 14, 16, 18, 20];

const fontWeight = ["normal", "bold"];

export default function Appearance() {
  const { colors, setColors } = usePreview();
  const [color, setColor] = useState({});
  const [backgroundType, setBackgroundType] = useState({
    background: "",
  });
  const [direction, setDirection] = useState<"left" | "right">("left");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColor({ ...color, [name]: value });
  };

  const handleTypeBackground = useCallback((e: any) => {
    const { value } = e.target;
    setBackgroundType({ ...backgroundType, background: value });
    setColors({
      ...colors,
      background: { ...colors.background, type: value },
    });
  }, []);

  const saveBackgroundData = async (e: any) => {
    const { name, value } = e.target;
    const uid = auth.currentUser?.uid!;
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists) return null;

      await updateDoc(docRef, { [name]: value });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-12 flex flex-col gap-2">
        <h1 className="text-2xl font-bold pb-4">Backgrounds</h1>
        <div className="flex gap-4 mb-6">
          <fieldset
            className={`w-24 relative rounded-lg h-40 cursor-pointer bg-blue-800 border-[4px] ${
              colors.background.type === "solid" && "border-blue-400"
            } `}
          >
            <input
              type="radio"
              title="background solid"
              id="solid"
              name="background.type"
              className="opacity-0 w-24 h-40 mb-1 cursor-pointer"
              value="solid"
              defaultChecked
              onClick={(e) => {
                handleTypeBackground(e);
                saveBackgroundData(e);
              }}
            />
            <label htmlFor="solid">Solid</label>
          </fieldset>

          <fieldset
            className={`w-24 relative rounded-lg h-40 cursor-pointer bg-blue-800 border-[4px] ${
              colors.background.type === "gradient" && "border-blue-400"
            } `}
            style={{
              background: "linear-gradient(to left, #0bc2ea, #175a73)",
            }}
          >
            <input
              type="radio"
              title="background gradient"
              id="gradient"
              name="background.type"
              className="opacity-0 w-24 h-40 mb-1 cursor-pointer"
              value="gradient"
              onClick={(e) => {
                handleTypeBackground(e);
                saveBackgroundData(e);
              }}
            />
            <label htmlFor="gradient">Gradient</label>
          </fieldset>
        </div>

        {colors.background.type === "gradient" ? (
          <div className="mt-4">
            <Color
              label="First color"
              labelFor="backgrounds"
              name="background.gradient.firstColor"
              onChange={(e) => {
                handleChange(e);
                setColors({
                  ...colors,
                  background: {
                    gradient: {
                      ...colors.background.gradient,
                      firstColor: e.target.value,
                    },
                  },
                });
              }}
              value={colors.background.gradient?.firstColor}
            />
            <Color
              label="Second color"
              labelFor="backgrounds"
              name="background.gradient.secondColor"
              onChange={(e) => {
                handleChange(e);
                setColors({
                  ...colors,
                  background: {
                    gradient: {
                      ...colors.background.gradient,
                      secondColor: e.target.value,
                    },
                  },
                });
              }}
              value={colors.background.gradient?.secondColor}
            />

            <div className="flex mt-6 gap-2">
              <label
                htmlFor="left"
                className={`py-2 px-4 cursor-pointer bg-blue-800 rounded-full text-white border-[4px] ${
                  direction === "left" && "border-blue-500"
                }`}
              >
                Left
                <input
                  id="left"
                  type="radio"
                  name="background.direction"
                  className="opacity-0 w-0 h-0"
                  value={direction}
                  onClick={(e) => {
                    setDirection("left");
                    setColors({
                      ...colors,
                      background: {
                        ...colors.background,
                        direction: "left",
                      },
                    });
                    saveBackgroundData(e);
                  }}
                />
              </label>

              <label
                htmlFor="right"
                className={`py-2 px-4 cursor-pointer bg-blue-800 rounded-full text-white border-[4px] ${
                  direction === "right" && "border-blue-500"
                }`}
              >
                Right
                <input
                  id="right"
                  type="radio"
                  name="background.direction"
                  value={direction}
                  className="opacity-0 w-0 h-0"
                  onClick={(e) => {
                    setColors({
                      ...colors,
                      background: {
                        ...colors.background,
                        direction: "right",
                      },
                    });
                    setDirection("right");
                    saveBackgroundData(e);
                  }}
                />
              </label>
            </div>
          </div>
        ) : (
          <Color
            label="Background"
            labelFor="backgrounds"
            name="background.color"
            onChange={(e) => {
              handleChange(e);
              setColors({
                ...colors,
                background: { ...colors.background, color: e.target.value },
              });
            }}
            value={colors.background.color}
          />
        )}
      </div>

      <div className="pt-12">
        <h2 className="font-bold text-2xl mb-2">Texts</h2>

        <div className="mb-6">
          <Color
            label="Title"
            labelFor="title"
            name="title.color"
            onChange={(e) => {
              handleChange(e);
              setColors({
                ...colors,
                title: {
                  ...colors.title,
                  color: e.target.value,
                },
              });
            }}
            value={colors.title.color}
          />
          <div className="flex mt-2  sm:justify-normal sm:gap-6 gap-0 justify-between items-center">
            <Select
              options={titlesSizes}
              label="Font Size"
              labelFor="fontSize"
              name="title.size"
              value={colors.title.size && colors.title.size}
              onChange={(e) => {
                setColors({
                  ...colors,
                  title: {
                    ...colors.title,
                    size: e.target.value,
                  },
                });
                console.log(e.target.value);
              }}
            />

            <Select
              options={fontWeight}
              label="Font Weight"
              labelFor="fontWeight"
              name="title.weight"
              value={colors.title.weight && colors.title.weight}
              onChange={(e) => {
                setColors({
                  ...colors,
                  title: {
                    ...colors.career,
                    weight: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <Color
            label="Career"
            labelFor="career"
            name="career.color"
            onChange={(e) => {
              handleChange(e);
              setColors({
                ...colors,
                career: {
                  ...colors.career,
                },
              });
            }}
            value={colors.career.color}
          />
          <div className="flex mt-2  sm:justify-normal sm:gap-6 gap-0 justify-between items-center">
            <Select
              options={titlesSizes}
              label="Font Size"
              labelFor="fontSize"
              name="career.size"
              value={colors.career.size && colors.career.size}
              onChange={(e) => {
                setColors({
                  ...colors,
                  career: {
                    ...colors.career,
                    size: e.target.value,
                  },
                });
              }}
            />

            <Select
              options={fontWeight}
              label="Font Weight"
              labelFor="fontWeight"
              name="career.weight"
              value={colors.career.weight && colors.career.weight}
              onChange={(e) => {
                setColors({
                  ...colors,
                  career: {
                    ...colors.career,
                    weight: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <Color
            label="Nickname"
            labelFor="nickname"
            name="nickname.color"
            onChange={(e) => {
              setColors({
                ...colors,
                nickname: {
                  ...colors.nickname,
                  color: e.target.value,
                },
              });
              handleChange(e);
            }}
            value={colors.nickname.color}
          />
          <div className="flex mt-2  sm:justify-normal sm:gap-6 gap-0 justify-between items-center">
            <Select
              options={nicknameSizes}
              label="Font Size"
              labelFor="fontSize"
              name="nickname.size"
              value={colors.nickname.size && colors.nickname.size}
              onChange={(e) => {
                setColors({
                  ...colors,
                  nickname: {
                    ...colors.nickname,
                    size: e.target.value,
                  },
                });
              }}
            />

            <Select
              options={fontWeight}
              label="Font Weight"
              labelFor="fontWeight"
              name="nickname.weight"
              value={colors.nickname.weight && colors.nickname.weight}
              onChange={(e) => {
                setColors({
                  ...colors,
                  nickname: {
                    ...colors.nickname,
                    weight: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="pt-12">
        <h2 className="font-bold text-2xl mb-2">Buttons</h2>
        <Color
          label="Background"
          labelFor="btn-background"
          name="link.background"
          onChange={(e) => {
            handleChange(e);
            setColors({
              ...colors,
              link: {
                ...colors.link,
                background: e.target.value,
              },
            });
          }}
          value={colors.link.background}
        />
        <Color
          label="Font color"
          labelFor="btn-color"
          name="link.color"
          onChange={(e) => {
            handleChange(e);
            setColors({
              ...colors,
              link: {
                ...colors.link,
                color: e.target.value,
              },
            });
          }}
          value={colors.link.color}
        />

        <div className="flex mt-2 sm:justify-normal sm:gap-6 gap-0 justify-between items-center">
          <Select
            options={nicknameSizes}
            label="Font Size"
            labelFor="linkFontSize"
            name="link.size"
            value={colors.link.size && colors.link.size}
            onChange={(e) => {
              setColors({
                ...colors,
                link: {
                  ...colors.link,
                  size: e.target.value,
                },
              });
            }}
          />

          <Select
            options={fontWeight}
            label="Font Weight"
            labelFor="fontWeight"
            name="link.weight"
            value={colors.link.weight && colors.link.weight}
            onChange={(e) => {
              setColors({
                ...colors,
                link: {
                  ...colors.link,
                  weight: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
