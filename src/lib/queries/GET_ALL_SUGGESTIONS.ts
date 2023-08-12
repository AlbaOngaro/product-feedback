export const GET_ALL_SUGGESTIONS =
  "SELECT\
		*,\
		category.label as category,\
		(SELECT * FROM ->comments->comment.* FETCH author) as comments\
	FROM suggestion\
	ORDER BY ${field} ${order}\
	FETCH category, votes;";
