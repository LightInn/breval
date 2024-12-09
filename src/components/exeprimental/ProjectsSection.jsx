import {motion} from 'framer-motion';
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import MovingLogo from './MovingLogo';
import {Code, Database, Globe, Smartphone} from 'lucide-react';

const projects = [{
    id: 1,
    title: 'ForVoyez',
    category: 'SaaS',
    description: 'An API to generate meta-description and alternative text for images.',
    url: 'https://forvoyez.com'
}, {
    id: 2,
    title: 'My Makeup',
    category: 'Reference Website',
    description: 'A platform to list all the freelances makeup artists open to opportunities.',
    url: 'https://my-makeup.fr'
}, {
    id: 3,
    title: 'Formenu',
    category: 'SaaS',
    description: 'Digital menu for restaurant.',
    url: 'https://formenu.fr'
}, {
    id: 4,
    title: 'Artriste',
    category: 'Gallery',
    description: 'Art gallery.',
    url: 'https://artriste.cc'
},];

function ProjectsSection({step}) {
    return ((<section className=" py-8 px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
            <motion.h2
                className="text-4xl font-bold text-center mb-12"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}>
                Featured Projects
            </motion.h2>


            <div className="grid grid-cols-1 md:min-h-[500px] md:grid-cols-2 gap-8">

                {step == 2 && projects.map((project, index) => (<motion.div
                    key={project.id}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: index * 0.1}}>
                    <Card className="h-full">
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                            <Badge className="mb-4">{project.category}</Badge>
                            <p className="text-gray-600">{project.description}</p>
                        </CardContent>
                    </Card>
                </motion.div>))}
            </div>

        </div>
    </section>));
};

export default ProjectsSection;

