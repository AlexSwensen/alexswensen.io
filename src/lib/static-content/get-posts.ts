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

	const stats = await Promise.all(files.map((file) => fs.promises.stat(path.join(dir, file))));

	const markdownFiles = files
		.filter((file, index) => stats[index].isFile() && path.extname(file) === '.md')
		.map((file) => path.join(dir, file));

	return markdownFiles;
}

async function readMarkdownFiles() {
	const files = await getMarkdownFiles(path.join(process.cwd(), './posts/old'));
	const postsPromises = files.map((file) => fs.promises.readFile(file, 'utf-8'));
	const postsContent = await Promise.all(postsPromises);

	const posts = postsContent.map((content, index) => {
		const { data, content: markdownContent } = matter(content);
		return {
			...data,
			slug: path.basename(files[index]).replace('.md', ''),
			content: markdownContent
		};
	});

	return posts;
}
