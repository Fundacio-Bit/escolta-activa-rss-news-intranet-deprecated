const get_all_text_fields = (doc) => {

    const title =
    "title" in doc && doc.title !== undefined && typeof doc.title === "string"
      ? doc.title
      : "";

  const summary =
    "summary" in doc &&
    doc.summary !== undefined &&
    typeof doc.summary === "string"
      ? doc.summary
      : "";

  const description =
    "description" in doc &&
    doc.description !== undefined &&
    typeof doc.description === "string"
      ? doc.description
      : "";

  const content_value =
    "content_value" in doc &&
    doc.content_value !== undefined &&
    typeof doc.content_value === "string"
      ? doc.content_value
      : "";

  const tags =
    "tags" in doc && doc.tags !== undefined && typeof doc.tags === "string"
      ? doc.tags
      : "";

  return title + " " + summary + " " + description + " " + content_value + " " + tags;

};

module.exports = { get_all_text_fields };
