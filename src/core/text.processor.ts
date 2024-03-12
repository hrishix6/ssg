import { readFile } from "fs/promises";

export class Processor {
    public static markdownToBlocks(raw: string): string[] {
        //assuming we have good Markdown where blocks are separated by 2 new line characters.
        let blocks = raw.split(/\n{2,}/);

        //trim additional trailing and leading spaces.
        blocks = blocks.map(block => block.trim());
        return blocks;
    }

    public static async processMarkDownFile(filePath: string) {
        try {
            const data = await readFile(filePath, { encoding: "utf8" });
            const blocks = Processor.markdownToBlocks(data);
            return blocks;

        } catch (error) {
            console.error(error);
            return [];
        }
    }
}