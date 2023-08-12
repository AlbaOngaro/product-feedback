export const GET_ALL_SUGGESTIONS =
  "SELECT\
		*,\
		category.label as category,\
		(SELECT * FROM ->comments->comment.* FETCH author) as comments\
	FROM suggestion\
	WHERE category.id CONTAINS $category\
	ORDER BY ${field} ${order}\
	FETCH category, votes;";
