import { ImageTextNode, LinkTextNode, TextNode } from "./text.node";
import { MarkDownImageRegex, MarkDownLinkRegex, TextType } from "./types";

export class Parser {
    private static matchBracketAndLink(part: string): [string, string] {
        const re = /\[(.*?)\]\((.*?)\)/
        const match = re.exec(part);

        if (match) {
            const text = match[1];
            const url = match[2];
            return [text, url];
        }

        throw new Error(`Invalid image/Link block - ${part}`);

    }

    private static processLinkPart(part: string): TextNode {
        const [text, url] = Parser.matchBracketAndLink(part);

        return new LinkTextNode(text, TextType.Link, url);
    }

    private static processImagePart(part: string): TextNode {
        const [text, url] = Parser.matchBracketAndLink(part);
        return new ImageTextNode(text, TextType.Image, url);
    }

    private static splitInline(text: string, del: string) {
        return text.split(del);
    }

    private static splitImageLinks(text: string, del: RegExp) {
        let lastIndex = 0;
        const parts: string[] = [];
        let match: RegExpExecArray | null;
        while ((match = del.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            // Add the matched markdown image element
            parts.push(match[0]);
            lastIndex = del.lastIndex;
        }
        // Add the remaining text after the last match
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts;
    }

    private static processTextNode(node: TextNode, del: string | RegExp, textType: TextType): TextNode[] {

        let parts: string[];
        if (del instanceof RegExp) {
            parts = Parser.splitImageLinks(node.text, del);
        }
        else {
            parts = Parser.splitInline(node.text, del);
        }

        if (!(del instanceof RegExp) && parts.length == 2) {
            //if a text node has proper block for eg. "This is a `code block`."
            //it will split into 3 or more parts always. if only opening is there but no closing, 
            //eg. "This is s `code block" it will be less than 3 parts.
            // if lennth =1 means this text doesn't have a delimeter in it, split returns original string.
            // if length = 2 means this has only 1 delimeter instance , no closing.
            throw new Error(`Invalid textnode: no closing found for "${textType}" block.`);
        }

        const nodes: TextNode[] = [];
        let processedNode: TextNode;
        for (let i = 0; i < parts.length; i++) {
            if (i % 2 !== 0) {
                //this is enclosed node.
                switch (textType) {
                    case TextType.Image:
                        processedNode = Parser.processImagePart(parts[i]);
                        break;
                    case TextType.Link:
                        processedNode = Parser.processLinkPart(parts[i]);
                        break;

                    default:
                        processedNode = new TextNode(parts[i], textType);
                }

                nodes.push(processedNode);
                continue;
            }

            //skip empty string parts.
            if (parts[i] == "") {
                continue;
            }

            //this is non-enclosed node
            nodes.push(new TextNode(parts[i], TextType.Normal));
        }
        return nodes;
    }

    public static getNewTextNodes(oldNodes: TextNode[], del: string | RegExp, textType: TextType): TextNode[] {
        const newNodes: TextNode[] = [];

        for (let oldNode of oldNodes) {
            if (oldNode.textType !== TextType.Normal) {
                newNodes.push(oldNode);
                continue;
            }
            const nodes = Parser.processTextNode(oldNode, del, textType);
            newNodes.push(...nodes);
        }

        return newNodes;
    }

    public static textToTextNodes(raw: string): TextNode[] {
        const startingNode = new TextNode(raw, TextType.Normal);
        let nodes = Parser.getNewTextNodes([startingNode], MarkDownImageRegex, TextType.Image);
        nodes = Parser.getNewTextNodes(nodes, MarkDownLinkRegex, TextType.Link);
        nodes = Parser.getNewTextNodes(nodes, "**", TextType.Bold);
        nodes = Parser.getNewTextNodes(nodes, "*", TextType.Italic);
        nodes = Parser.getNewTextNodes(nodes, "`", TextType.Code);
        return nodes;
    }
}