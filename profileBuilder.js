const developers = [
  {
    id: 1,
    name: "Amara Johnson",
    track: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    projects: { completed: 8, ongoing: 2 },
    isAvailable: true,
    mentor: { name: "Sarah Chen", specialty: "React" },
  },
  {
    id: 2,
    name: "Chidi Okafor",
    track: "Backend",
    skills: ["Python", "Django", "SQL"],
    projects: { completed: 5, ongoing: 3 },
    isAvailable: false,
    mentor: { name: "James Udo", specialty: "System Design" },
  },
  {
    id: 3,
    name: "Fatima Hassan",
    track: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "Vue", "TypeScript"],
    projects: { completed: 10, ongoing: 1 },
    isAvailable: true,
    mentor: null,
  },
  {
    id: 4,
    name: "Emeka Nwosu",
    track: "Mobile",
    skills: ["Dart", "Flutter"],
    projects: { completed: 3, ongoing: 1 },
    isAvailable: true,
    mentor: { name: "Femi Adeyemi", specialty: "Mobile Architecture" },
  },
  {
    id: 5,
    name: "Zara Ahmed",
    track: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "GraphQL"],
    projects: { completed: 7, ongoing: 2 },
    isAvailable: true,
    mentor: null,
  },
  {
    id: 6,
    name: "Grace Eze",
    track: "Frontend",
    skills: [],
    projects: { completed: 0, ongoing: 0 },
    isAvailable: false,
    mentor: { name: "Sarah Chen", specialty: "React" },
  },
];

// Step 1: Profile Cards
const buildProfileCard = ({
  name,
  track,
  skills,
  projects,
  isAvailable,
  mentor,
}) => {
  const availability = isAvailable ? "Available" : "Not Available";
  const mentorName = mentor?.name ?? "No mentor assigned";
  const skillsList =
    skills.length > 0 ? skills.join(", ") : "No skills listed yet";

  return `Name: ${name}\nTrack: ${track}\nSkills: ${skillsList}\nProjects: ${projects.completed} completed, ${projects.ongoing} ongoing\nAvailability: ${availability}\nMentor: ${mentorName}`;
};

developers.map(buildProfileCard).forEach((card, index) => {
  console.log(`\Profile Card ${index + 1}\n${card}`);
});

// Step 2: Unique Skills Pool
const uniqueSkills = [
  ...new Set(developers.flatMap(({ skills }) => skills)),
].sort();

console.log("\nUnique Skills Pool");
console.log(uniqueSkills);

// Step 3: Track Summary
const uniqueTracks = [...new Set(developers.map(({ track }) => track))];

const trackSummary = uniqueTracks.map((trackName) => {
  const trackDevelopers = developers.filter(({ track }) => track === trackName);
  const totalDevelopers = trackDevelopers.length;
  const availableDevelopers = trackDevelopers.filter(
    ({ isAvailable }) => isAvailable,
  ).length;
  const completedProjects = trackDevelopers.reduce(
    (total, { projects: { completed } }) => total + completed,
    0,
  );

  return `${trackName}: ${totalDevelopers} developers, ${availableDevelopers} available, ${completedProjects} completed projects`;
});

console.log("\nTrack Summary");
trackSummary.forEach((summary) => console.log(summary));

// Step 4: Add a New Developer
const addDeveloper = (currentDevelopers, newDeveloper) => [
  ...currentDevelopers,
  newDeveloper,
];

const newDeveloper = {
  id: 7,
  name: "Ifeoma Bello",
  track: "Backend",
  skills: ["Go", "PostgreSQL"],
  projects: { completed: 2, ongoing: 1 },
  isAvailable: true,
  mentor: { name: "James Udo", specialty: "System Design" },
};

const expandedDevelopers = addDeveloper(developers, newDeveloper);

console.log("\nAdd Developer (Immutability Check)");
console.log(`Original length: ${developers.length}`);
console.log(`New length: ${expandedDevelopers.length}`);

// Step 5: Update a Developer
const updateDeveloper = (currentDevelopers, id, updates) =>
  currentDevelopers.map((developer) =>
    developer.id === id ? { ...developer, ...updates } : developer,
  );

const updatedDevelopers = updateDeveloper(developers, 4, {
  skills: [
    ...(developers.find(({ id }) => id === 4)?.skills ?? []),
    "Firebase",
    "CI/CD",
  ],
  isAvailable: false,
});

const updatedEmeka = updatedDevelopers.find(({ id }) => id === 4);

console.log("\nUpdated Developer (Emeka)");
console.log(updatedEmeka);

// Step 6: Mentor Workload
const mentorWorkload = developers.reduce((workload, { mentor }) => {
  const mentorName = mentor?.name ?? "Unassigned";
  return {
    ...workload,
    [mentorName]: (workload[mentorName] ?? 0) + 1,
  };
}, {});

console.log("\nMentor Workload");
console.log(mentorWorkload);

// Step 7: Experience Ranking
const experienceRanking = [...developers]
  .sort((a, b) => {
    const {
      projects: { completed: completedA, ongoing: ongoingA },
    } = a;
    const {
      projects: { completed: completedB, ongoing: ongoingB },
    } = b;

    return completedB + ongoingB - (completedA + ongoingA);
  })
  .map((developer, index) => {
    const totalProjects =
      developer.projects.completed + developer.projects.ongoing;
    const medal =
      index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";
    return `${index + 1}. ${medal} ${developer.name} - ${totalProjects} projects`;
  });

console.log("\nExperience Ranking");
experienceRanking.forEach((entry) => console.log(entry));
