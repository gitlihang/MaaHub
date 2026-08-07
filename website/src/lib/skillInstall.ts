const SKILLS_REPOSITORY_URL = 'https://github.com/MaaXYZ/MaaHub';

export function getSkillInstallCommand(skillName: string) {
  return `npx skills add ${SKILLS_REPOSITORY_URL} --skill ${skillName}`;
}
