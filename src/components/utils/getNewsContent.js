const getText = (doc) => {
  const title =
    "title" in doc && doc.title !== undefined && typeof doc.title === "string"
      ? doc.title.replace(/\s\s+/g, ' ') // Regexp to replace multiple spaces, tabs, newlines, etc with a single space.
      : "";

  const summary =
    "summary" in doc &&
    doc.summary !== undefined &&
    typeof doc.summary === "string"
      ? doc.summary.replace(/\s\s+/g, ' ')
      // ? doc.summary
      : "";

  const description =
    "description" in doc &&
    doc.description !== undefined &&
    typeof doc.description === "string"
      ? doc.description.replace(/\s\s+/g, ' ')
      // ? doc.description
      : "";

  const content_value =
    "content_value" in doc &&
    doc.content_value !== undefined &&
    typeof doc.content_value === "string"
    // ? doc.content_value
    ? doc.content_value.replace(/\s\s+/g, ' ')
      : "";

  const tags =
    "tags" in doc && doc.tags !== undefined && typeof doc.tags === "string"
      ? doc.tags.replace(/\s\s+/g, ' ')
      : "";
      
  return title + " " + summary + " " + description + " " + content_value + " " + tags;
};

module.exports = { getText };
