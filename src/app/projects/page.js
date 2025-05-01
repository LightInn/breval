// app/projects/page.tsx
import { getProject } from '@/services/projects.services'
import ProjectClient from './ProjectClient'

export default async function ProjectPage() {
	const projects = await getProject()
	return <ProjectClient projects={projects} />
}
