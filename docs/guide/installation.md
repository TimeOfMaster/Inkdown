# Installation

To get started with Inkdown, you'll need to have [Node.js](https://nodejs.org/) (v18 or higher) and [Git](https://git-scm.com/) installed on your system.

### 1. Clone the Repository

First, clone the Inkdown repository from GitHub to your local machine.

```bash
git clone https://github.com/TimeOfMaster/Inkdown.git
cd Inkdown
```

### 2. Install Dependencies

Next, navigate into the project directory and install the necessary dependencies using npm.

```bash
npm install
```

### 3. Build the Project

Inkdown is written in TypeScript, so you need to compile it to JavaScript before you can run it.

```bash
npm run build
```

### 4. Run Inkdown

Once the project is built, you can use the `ink` npm script to convert your Markdown files to PDF.

```bash
npm run ink -- yourfile.md
```

The output PDF will be saved in the same directory as your source file.
