import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
export default async () => {
	const posts = await readMarkdownFiles();
	return {
		data: { posts }
	};
};

async function getMarkdownFiles(dir: string) {
	const files = await fs.promises.readdir(dir);
	const markdownFiles = [];

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stats = await fs.promises.stat(filePath);

		if (stats.isFile() && path.extname(file) === '.md') {
			const markdownFile = {
				filePath,
				fileName: file
			};
			markdownFiles.push(markdownFile);
		}
	}

	return markdownFiles;
}

async function readMarkdownFiles() {
	const files = await getMarkdownFiles(path.join(process.cwd(), './posts/old'));
	const posts = [];

	for (const file of files) {
		const content = await fs.promises.readFile(file.filePath, 'utf-8');
		const { data, content: markdownContent } = matter(content);
		const post = {
			...data,
			content: markdownContent,
			fileName: file.fileName
		};
		posts.push(post);
	}

	return posts;
}
