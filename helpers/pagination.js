function paginationButtonsNumber(totalItems, perPage) {
	// this function returns how many pagination buttons should we display in the frontend based on the number of total items and the number of displayed items per page

	return Math.ceil(parseInt(totalItems) / parseInt(perPage));
}

/**
 * (Pagination Steps)
 * set a perPage variable
 * get the page number from user
 * set a skip variable to skip items >> const SKIP = (page -1) * PER_PAGE
 * Model.find().sort().populate().skip().limit().lean()
 * calculate the paginationButtonsNumber within the previous function and return it in the api as well
 * 
 * 
 */
