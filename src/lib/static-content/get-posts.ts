import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
export default async () => {
    const posts = await readMarkdownFiles();
    return {
        data: {posts}
    }
}

async function getMarkdownFiles(dir) {
    const files = await fs.promises.readdir(dir);
    const markdownFiles = [];

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.promises.stat(filePath);

        if (stats.isFile() && path.extname(file) === '.md') {
            markdownFiles.push(filePath);
        }
    }

    return markdownFiles;
}

async function readMarkdownFiles () {
    const files = await getMarkdownFiles(path.join(process.cwd(), './posts/old'));
    const posts = [];

    for (const file of files) {
        const content = await fs.promises.readFile(file, 'utf-8');
        const {data, content: markdownContent} = matter(content);
        const post = {
            ...data,
            content: markdownContent
        };
        posts.push(post);
    }

    return posts;
}