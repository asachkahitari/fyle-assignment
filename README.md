# GitHub Repositories Listing Page

Design a website that displays the public GitHub repositories belonging to any specific user.

## Features

- Fetches and displays the basic profile details of a GitHub user.
- Fetches and displays the public repositories of the GitHub user.
- Supports server-side pagination with a default of 10 repositories per page.
- Allows the user to choose a maximum of 100 repositories per page.
- Displays loader while fetching user details and repositories.
- Responsive design for a better user experience.

## References & Requirements

- [GitHub REST API Documentation](https://docs.github.com/en/rest/reference)
- Pagination is server-side.
- Default: 10 repositories per page, with the option to choose up to 100 repositories per page.

## Usage

1. Open `index.html` in a web browser.
2. Enter a valid GitHub username in the input field and submit the form.
3. View the user's basic profile details and a paginated list of repositories.

## Implementation Details

- The project is implemented using HTML, CSS, and JavaScript.
- Bootstrap and jQuery are used for styling and DOM manipulation.
- Pagination controls are dynamically generated based on the total number of repositories.

## Notes

- The assignment assumes a valid GitHub username is entered.
- Design is for representation purposes; feel free to modify it according to your preferences.
- Edge cases are handled for a smoother user experience.

## Developer

  Deepak Patil
  https://www.linkedin.com/in/deepak-patil-156390176/


