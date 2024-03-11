import { TextNode } from "../core/text.node";
import { TextType } from "../core/types";

const textNode = new TextNode("This is a Normal text", TextType.Normal);

console.log(textNode.toHtmlNode().toHtml());