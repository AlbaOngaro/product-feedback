export const GET_SUGGESTION = `
	SELECT 
		*, 
		category.label as category, 
		(SELECT * FROM ->comments->comment.* FETCH author) as comments 
	FROM $suggestion 
	FETCH category, votes;
`;
