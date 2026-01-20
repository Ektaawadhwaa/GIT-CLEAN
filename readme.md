# git-clean

A small command-line utility to safely clean merged Git branches.



##  Problem Statement

While working on multiple Git repositories, I frequently create feature and fix branches.  
After merging them into the main branch, these old branches remain in the repository and clutter the branch list.

Manually cleaning merged branches requires running multiple Git commands such as:

git branch --merged
git branch -d <branch-name>

This is repetitive, time-consuming, and error-prone, especially when managing multiple repositories.
 
##  Solution

`git-clean` automates this process by:

- Detecting all merged branches automatically
- Protecting important branches (`main`, `master`, and the current branch)
- Displaying deletable branches clearly
- Asking for user confirmation before deleting
- Safely deleting branches using Git’s built-in protection

This improves productivity and keeps repositories clean with minimal effort.
 

##  How to Run

### Requirements
- Node.js installed
- Git installed
- Must be executed inside a Git repository

### Installation

Clone this repository:

git clone <your-github-repo-link>
cd git-clean
npm install
npm link

arduino
Copy code

### Usage

Navigate to any Git repository and run:

git-clean 

The tool will display merged branches and ask for confirmation before deleting.
 

##  Design Decisions

- **Node.js** was chosen for fast scripting and cross-platform compatibility.
- **child_process.execSync** is used to execute Git commands directly.
- Output parsing converts Git text output into structured lists.
- Important branches are hardcoded for safety.
- User confirmation prevents accidental deletion.
- Errors are handled gracefully when not inside a Git repository.
 

##  Sample Output

Merged branches:
• test-clean
Delete these branches? (y/n)

yaml
Copy code

---

##  Future Improvements

- Dry-run mode
- Selective branch deletion
- Colored output
- Auto-clean flag
