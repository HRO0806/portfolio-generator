const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
     {
        type: 'input',
        name: 'name',
        message: 'What is your name? (required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter your name!');
                return false;
            }
        }
     },
     {
         type: 'input',
         name: 'github',
         message: 'Enter your GitHub Username (required)',
         validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter your GitHub username! (required)');
                return false;
            }
        }
     },
     {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "about" section?',
        default: true
     },
     {
         type: 'input',
         name: 'about',
         message: 'Provide some information about yourself:',
         when: ({ confirmAbout }) => {
             if (confirmAbout) {
                 return true;
             } else {
                 return false;
             }
         }
     }
    ])
};


const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
=================
Add a New Project
=================
    `);
    return inquirer.prompt([
      {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project? (required)',
          validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter a name for your project! (required)');
                return false;
            }
        }
      },
      {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter a description of the project! (required)');
                return false;
            }
        }
      },
      {
         type: 'checkbox',
         name: 'languages',
         choices: ['javaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'] 
      },
      {
          type: 'input',
          name: 'link',
          message: 'Enter the GitHub link to your project. (Required)',
          validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter the GitHub link to your project! (required)');
                return false;
            }
        }
      },
      {
          type: 'confirm',
          name: 'feature',
          message: 'Would you like to feature this project?',
          default: false
      },
      {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to enter another project?',
          default: false
      }  
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
  };

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });   
/*const fs = require('fs');
const generatePage = require('./src/page-template');

const pageHTML = generatePage(name, github);

fs.writeFile('./index.html', pageHTML, err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the output!');
});*/
