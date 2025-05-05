# taskmaster-ai


---

## Downloading and Using Git LFS Files

This repository uses [Git Large File Storage (LFS)](https://git-lfs.github.com/) to manage large files (such as datasets and model files).  
**You must install Git LFS before cloning or pulling the repository to access these files.**

### 1. Install Git LFS

- **macOS:**  
  ```bash
  brew install git-lfs
  ```

- **Windows:**  
  Download and run the installer from [git-lfs.github.com](https://git-lfs.github.com/).

- **Linux:**  
  ```bash
  sudo apt-get install git-lfs
  ```

Or see [official installation instructions](https://git-lfs.github.com/) for more options[3][4][5].

### 2. Initialize Git LFS

After installing, run this command **once** (per machine):

```bash
git lfs install
```
This sets up Git LFS for your user account[2][3][5].

### 3. Clone the Repository

Clone as usual:

```bash
git clone <repository-url>
cd <repository-directory>
```

Git LFS will automatically download the required large files referenced in the repository[5][6].

### 4. Pulling LFS Files After Cloning

If you have already cloned the repository but do not see the large files (only pointer files), run:

```bash
git lfs pull
```
This command downloads all Git LFS files referenced by your current checkout[8].

> **Note:** Downloading the repository as a ZIP file will not include Git LFS files. Always use `git clone` and ensure Git LFS is installed[9].

---

By following these steps, users will be able to access all large files managed by Git LFS in your repository.

Sources
[1] Configuring Git Large File Storage - GitHub Docs https://docs.github.com/en/repositories/working-with-files/managing-large-files/configuring-git-large-file-storage
[2] git-lfs/README.md at main - GitHub https://github.com/git-lfs/git-lfs/blob/main/README.md
[3] Installing Git Large File Storage - GitHub Docs https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage
[4] Git LFS https://git-lfs.com
[5] Git LFS - large file storage | Atlassian Git Tutorial https://www.atlassian.com/git/tutorials/git-lfs
[6] About Git Large File Storage - GitHub Docs https://docs.github.com/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[7] How to use git lfs to push complete folder to github - Stack Overflow https://stackoverflow.com/questions/70796855/how-to-use-git-lfs-to-push-complete-folder-to-github
[8] Help recovering my project · git-lfs git-lfs · Discussion #5659 - GitHub https://github.com/git-lfs/git-lfs/discussions/5659
[9] Introducing and setting up Git LFS (Large File Storage) - Reddit https://www.reddit.com/r/git/comments/mbndam/introducing_and_setting_up_git_lfs_large_file/
[10] How to use Git LFS to store big files on GitHub - DEV Community https://dev.to/mishmanners/how-to-use-git-lfs-to-store-big-files-on-github-2b2e
