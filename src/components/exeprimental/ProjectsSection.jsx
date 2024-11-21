import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MovingLogo from './MovingLogo';
import { Code, Database, Globe, Smartphone } from 'lucide-react';

const projects = [
  { id: 1, title: 'E-commerce Platform', category: 'Web Development', description: 'A full-stack e-commerce solution with real-time inventory management.' },
  { id: 2, title: 'Mobile Fitness App', category: 'Mobile Development', description: 'An iOS and Android app for tracking workouts and nutrition.' },
  { id: 3, title: 'Data Visualization Dashboard', category: 'Data Science', description: 'Interactive dashboard for visualizing complex datasets.' },
  { id: 4, title: 'API Integration Service', category: 'Backend Development', description: 'Microservice for integrating multiple third-party APIs.' },
];

const ProjectsSection = () => {
  return (
    (<section className="min-h-screen bg-gray-50 py-16 px-4 relative overflow-hidden">
      <MovingLogo icon={<Code size={24} />} />
      <MovingLogo icon={<Database size={24} />} />
      <MovingLogo icon={<Globe size={24} />} />
      <MovingLogo icon={<Smartphone size={24} />} />
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <Badge className="mb-4">{project.category}</Badge>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>)
  );
};

export default ProjectsSection;

