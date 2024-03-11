import { HtmlNode } from "./html.node";
import { LeafNode } from "./leaf.node";
import { TextTypeToHtmlTag } from "./text.type.to.tag.map";
import { TextType } from "./types";

export class TextNode {
    text: string;
    textType: TextType;
    url: string;

    constructor(text: string, textType: TextType, url?: string) {
        this.text = text;
        this.textType = textType;
        this.url = url || "NONE";
    }

    equal(arg: TextNode): boolean {
        return (
            this._textEq(this.text, arg.text)
            &&
            this._textTypeEq(this.textType, arg.textType)
            &&
            this._urlEq(this.url, arg.url)
        );
    }

    private _textEq(t1: string, t2: string): boolean {
        return t1 === t2;
    }

    private _textTypeEq(type1: string, type2: string): boolean {
        return this._textEq(type1, type2);
    }

    private _urlEq(url1: string, url2: string): boolean {
        return this._textEq(url1, url2);
    }

    toHtmlNode(): HtmlNode {
        let node: HtmlNode;
        switch (this.textType) {
            case TextType.Normal:
                node = new LeafNode('', this.text);
                break;

            case TextType.Bold:
                node = new LeafNode(TextTypeToHtmlTag[TextType.Bold], this.text);
                break;

            case TextType.Code:
                node = new LeafNode(TextTypeToHtmlTag[TextType.Code], this.text);
                break;

            case TextType.Image:
                node = new LeafNode(TextTypeToHtmlTag[TextType.Image], "", { "src": this.url, "alt": this.text });
                break;

            case TextType.Italic:
                node = new LeafNode(TextTypeToHtmlTag[TextType.Italic], this.text);
                break;

            case TextType.Link:
                node = new LeafNode(TextTypeToHtmlTag[TextType.Link], this.text, { "href": this.url });
                break;

            default:
                throw new Error("Unsupported text type");
        }

        return node!;
    }

}