import React from 'react'

const SkillList = [
	'next.js',
	'tailwind css',
	'figma',
	'javaScript',
	'web design',
	'strapi',
	'firebase',
	'generative AI',
	'SEO',
	'GraphQL',
	'react',
	'node.js',
	'express',
	'MongoDB',
	'PHP',
	'Dart',
	'Java',
	'C',
	'HTML',
	'C++',
	'VueJS',
	'C#',
	'CSS',
	'Angular',
	'Flask',
	'Python',
	'Flutter',
	'Ansible',
	'MariaDB',
	'Postgresql',
	'Apache',
	'Git',
	'SSH',
	'OpenVPN',
	'Bash',
]

const Skills = () => {
	return (
		<section className="flex w-full flex-col items-center bg-gradient-to-r from-dynamic-muted-light to-dynamic-muted py-8 md:pl-20">
			<h2 className="mb-4 text-xl font-bold text-black dark:text-slate-100 md:text-2xl lg:text-3xl font-display">
				Skills & Technologies
			</h2>
			<ul className="mb-8 flex w-full flex-wrap justify-center gap-4 p-10">
				{SkillList.map((skill, index) => (
					<li
						className="rounded-full bg-white dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-dynamic-muted-dark shadow transition duration-200 ease-in-out hover:bg-purple-100 dark:hover:bg-purple-800 md:text-base lg:text-lg"
						key={index}
					>
						{skill}
					</li>
				))}
			</ul>
		</section>
	)
}

export default Skills
