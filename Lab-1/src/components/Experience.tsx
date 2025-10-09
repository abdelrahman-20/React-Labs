interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
}

const Experience = () => {
  const experience: ExperienceItem[] = [
    {
      company: "ITI",
      role: "Full-Stack Developer",
      duration: "2025 – Present",
      description: "Building responsive web apps with React and TypeScript.",
    },
    {
      company: "Creativa",
      role: "UI/UX Designer",
      duration: "2023 – 2025",
      description:
        "Designed user interfaces and helped in implementation and system design.",
    },
  ];

  return (
    <section className="experience">
      <h3 className="section-title">💼 Experience</h3>
      {experience.map((exp, idx) => (
        <div key={idx} className="experience-item">
          <h4 className="experience-role">{exp.role}</h4>
          <p className="experience-company">{exp.company}</p>
          <p className="experience-duration">{exp.duration}</p>
          <p>{exp.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Experience;
