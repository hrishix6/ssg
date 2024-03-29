export enum TextType {
    Bold = "bold",
    Italic = "italic",
    Normal = "text",
    Code = "code",
    Link = "link",
    Image = "image",
    Unknown = "unknown"
}

export const MarkDownImageRegex = /!\[(.*?)\]\((.*?)\)/g

export const MarkDownLinkRegex = /\[(.*?)\]\((.*?)\)/g