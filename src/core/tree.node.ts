import { HtmlNode } from "./html.node";

export class TreeNode extends HtmlNode {

    constructor(tag: string, children: HtmlNode[], props?: Record<string, any>) {
        super(tag, undefined, children, props);

        if (!tag) {
            throw new Error("tag is required for TreeNode");
        }

        if (!children || children.length == 0) {
            throw new Error("there must be atleast one child for TreeNode");
        }
    }

    toHtml(): string {
        let html = `<${this.tag}${super.propsToHtml()}>`;
        for (let child of this.children) {
            html += child.toHtml();
        }

        return html += `</${this.tag}>`;
    }

}