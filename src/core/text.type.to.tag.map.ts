import { TextType } from "./types";

export const TextTypeToHtmlTag: Record<TextType, string> = {
    [TextType.Bold]: "b",
    [TextType.Code]: "code",
    [TextType.Image]: "img",
    [TextType.Normal]: "",
    [TextType.Italic]: "i",
    [TextType.Link]: "a",
    [TextType.Unknown]: ""
};

