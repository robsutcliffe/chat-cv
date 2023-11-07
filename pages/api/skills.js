import { getSkills, searchSkills } from "@services/skill.service";

export const config = {
  runtime: "edge",
};

const filteredObj = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value != null));

const getType = (type, obj) =>
  obj
    .filter((d) => d.type === type)
    .map((d) => ({ ...d, type: null }))
    .map(filteredObj);

export default async function handler(req, res) {
  const searchTerm = req.nextUrl.searchParams.get("searchTerm") ?? "";

  const skills = searchTerm
    ? await searchSkills({ searchTerm })
    : await getSkills();

  const responseBody = JSON.stringify({
    experiences: getType("experience", skills),
    certifications: getType("certification", skills),
    blogs: getType("blog", skills),
    projects: getType("project", skills),
    videos: getType("video", skills),
    courses: getType("course", skills),
    tags: getType("tag", skills),
    links: getType("link", skills),
    about: getType("about", skills),
  });

  const responseHead = {
    "Content-Type": "application/json",
    "Cache-Control": "s-maxage=86400,stale-while-revalidate=59",
  };

  return new Response(responseBody, { headers: responseHead });
}
