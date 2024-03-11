export class HtmlNode {
    tag: string;
    value: string;
    children: HtmlNode[];
    props: Record<string, any>;

    constructor(tag?: string, value?: string, children?: HtmlNode[], props?: Record<string, any>) {
        this.tag = tag || "";
        this.value = value || "";
        this.children = children || [];
        this.props = props || {};
    }

    toHtml(): string {
        throw new Error("Children should implement");
    }

    toString(): string {
        return `Tag: ${this.tag} | Value: ${this.value} | Props: ${JSON.stringify(this.props)}
        Children: 
        ${this.children.length ? this.children.reduce((prev, child) => {
            prev += child.toString() + "\n"
            return prev
        }, "") : "[]"
            }
        `
    }

    protected propsToHtml(): string {

        let entries = Object.entries(this.props);
        if (entries.length) {
            return entries.reduce((prev, currEntry) => {
                let [k, v] = currEntry;
                prev += ` ${k}="${v}"`;
                return prev;
            }, "");
        }
        return "";
    }

}