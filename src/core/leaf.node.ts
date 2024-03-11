import { HtmlNode } from "./html.node";

export class LeafNode extends HtmlNode {
    constructor(tag?: string, value?: string, props?: Record<string, any>) {
        super(tag, value, undefined, props);

        if (typeof value === "undefined") {
            throw new Error("Value is required for LeafNode, pass empty string if no value present");
        }
    }

    toHtml(): string {
        if (!this.tag) {
            return this.value;
        }

        return `<${this.tag}${super.propsToHtml()}>${this.value}</${this.tag}>`
    }

}

