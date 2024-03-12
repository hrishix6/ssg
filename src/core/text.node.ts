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
        this.url = url || "";
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
        throw new Error('not implemented');
    }

}

export class InlineTextNode extends TextNode {

    constructor(text: string, textType: TextType) {
        super(text, textType);
    }


    toHtmlNode(): HtmlNode {
        let tag: string = TextTypeToHtmlTag[this.textType];
        return new LeafNode(tag, this.text);
    }

}

export class ImageTextNode extends TextNode {
    constructor(text: string, textType: TextType, url: string) {
        super(text, textType, url);

        if (!url) {
            throw new Error("Image node must have url");
        }
    }

    toHtmlNode(): HtmlNode {
        let tag: string = TextTypeToHtmlTag[this.textType];
        return new LeafNode(tag, "", { "src": this.url, "alt": this.text });
    }

}

export class LinkTextNode extends TextNode {
    constructor(text: string, textType: TextType, url: string) {
        super(text, textType, url);

        if (!url) {
            throw new Error("Link node must have url");
        }
    }

    toHtmlNode(): HtmlNode {
        let tag: string = TextTypeToHtmlTag[this.textType];
        return new LeafNode(tag, this.text, { href: this.url });
    }
}