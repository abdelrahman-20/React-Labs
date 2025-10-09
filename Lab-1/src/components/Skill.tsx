const Skills = () => {
  const skills: string[] = [
    "React",
    "TypeScript",
    "JavaScript (ES6+)",
    "HTML & CSS",
    "Node.js",
    "Git & GitHub",
  ];

  return (
    <section className="skills">
      <h3 className="section-title">🧠 Skills</h3>
      <ul className="skills-list">
        {skills.map((skill, idx) => (
          <li key={idx} className="skills-item">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
