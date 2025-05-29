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
		<section className="from-dynamic-muted-light to-dynamic-muted flex w-full flex-col items-center bg-gradient-to-r py-8 md:pl-20">
			<h2 className="mb-4 text-xl font-bold text-black md:text-2xl lg:text-3xl">
				Skills & Technologies
			</h2>
			<ul className="mb-8 flex w-full flex-wrap justify-center gap-4 p-10">
				{SkillList.map((skill, index) => (
					<li
						className="text-dynamic-muted-dark rounded-full bg-white px-4 py-2 text-sm font-semibold shadow transition duration-200 ease-in-out hover:bg-purple-100 md:text-base lg:text-lg"
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
