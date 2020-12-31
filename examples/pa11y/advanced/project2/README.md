# cauldron.

> The deque pattern library

This monorepo contains the following packages:

- cauldron-styles ([`packages/styles`](packages/style/README.md))
- cauldron-react ([`packages/react`](packages/react/README.md))

It also contains the documentation / demo app (see `docs/`)

In addition it contains customized instructions for integrating A11y
testing and reporting into CI/CD pipelines using multiple toolsets
including Pa11y, Axe-Core, HtmlCodeSniffer, Github Actions, Jenkins,
Aws CodeCommit, AWS CodeBuild, and more.

Local configuration and setup directions can be found below.

In addition there is documentation in the [oast-docs](oast-docs) folder
describing ci-cd configurations and other documentation about how to
modify aspects of pipelines including build labels.

- [AWS Cloud CI/CD setup and example](oast-docs/aws-cloud-example.md)
- [From scratch setup of Github with Github Actions and S3 deployment and hosting](oast-docs/ci-cd-setup-from-scratch.md)
- [Updating build label steps for the various pipelines](oast-docs/updating-ci-build-labels.md)

# Note - this is not the official Cauldron repository

The official repository can be found [here](https://github.com/dequelabs/cauldron 'Official repository link')

There are currently 2 relevant repositories for this project. https://github.com/jessesaga/Temp-OAST-CI-CD-Examples-Task1-Cauldron and ssh://git-codecommit.us-east-1.amazonaws.com/v1/repos/Temp-OAST-CI-CD-Examples-Task1-Cauldron

The AWS URL is used to illustrate a full end to end integration of AWS
tools for Continuous Integration, testing, and deployment.

# MISC - this is a temporary notes section

pa11y-ci has a bug that impacts behavior in unexpected ways

https://github.com/pa11y/pa11y-ci/issues/70

If the error threshold is specified in the pa11y-ci config file then
even when errors are detected, if they're under the threshold, they
don't end up in the final report. This means that threshold must be
specified on the command line via the `-T` parameter.

# Summary

This repository contains 2 separate projects that can be built
independently but are ultimately pulled together into a static html,
css, js static HTML site with widgets built using React JS.

The generated site serves as a living example of how to build React
components for the web that adhere to best practices for accessibility.

This repository also includes full CI/CD pipelines. The two pipelines
that are currently implemented are for Github Actions and
Jenkins. Each pipeline does roughly the same thing but the syntax in
the different configuration files is needed to suite to different
CI/CD tooling.

The Jenkins pipeline is almost fully represented within the
Jenkinsfile at the root of this repository. The only extra component
needed is a Jenkins server that is configured with a project that is
aware of this Git repository. Also, the Jenkins instance needs to be
configured with appropriate plugins (Git, AWS) and credentials that
are referenced from within the Jenkinsfile for deployment to AWS S3.

The Github actions pipeline is defined within
.github/workflows/node.js.yml. This pipeline runs the same basic steps
as the Jenkins pipeline. The flow is to check out the latest code,
fetch dependencies, build each project, run unit tests, spin up a
local site to run full accessibility tests against the live site, and
then deploy a production static site to AWS S3. In addition to the
node.js.yml file - Github secrets need to be configured within the
repository to allow for the Github actions to publish to S3.

Pa11y is used for these accessibility tests and the
configuration files that define how the accessibility tests are run
are `.pa11y-axe` and `pa11y-htmlcs`. Each configuration file uses a
different 'backend' that is backed by either axe-core or HTML
CodeSniffer. Also, exclusion rules are applied to trim findings that
are not relevant for OAST Trusted Tester guidelines.

# Current repository deploy locations

Automated builds via Github Actions and Jenkins are deploying the site to http://temp-oast-ci-cd-examples-task1-cauldron.s3-website-us-east-1.amazonaws.com/

Accessibility reports (one via the Axe-core backend and one with the HtmlCodesniffer backend) can be found at the following urls

- http://temp-oast-ci-cd-examples-task1-cauldron.s3-website-us-east-1.amazonaws.com/pa11y-axe/
- http://temp-oast-ci-cd-examples-task1-cauldron.s3-website-us-east-1.amazonaws.com/pa11y-htmlcs

# development/testing locally

The following instructions are relevant for the current repository and
not the official repository. The goal with these instructions is to
give developers as many options as possible for building the code.

## building the code on windows

### starting with git windows command line tools (this is dependent on the git-bash toolset and commands must be run in git-bash)

- Install GIT Windows tools from https://git-scm.com/downloads
- Download and run the installer
- Accept all of the defaults and continue with installation
- Open the git bash shell and clone the repo https://github.com/jessesaga/Temp-OAST-CI-CD-Examples-Task1-Cauldron
- Install the NodeJS tools for Windows from https://nodejs.org/en/download/
- Select the default options, but at the end choose to have it
  automatically handle compiling native dependencies by installing chocolatey
- NOTE - the elevated command window and global install commands below
  may also be run without elevation if you prefix the all yarn and lerna commands with npx
- Run an elevated Windows powershell (run as administrator unless you're going with the local npx approach mentioned above)
- Accept the defaults
- Start a new git-bash shell (close the old one if it's still open) and navigate to the top level of the project
- Run 'npm install --global yarn' (omit this command if using npx)
- Run 'npm install --global lerna' (omit this command if using npx)
- Run 'npm install --global typescript' (omit this command if using npx)
- Run 'npx lerna bootstrap'
- Run 'npx yarn install'
- In the new git-bash shell, cd to the cauldron checkout and run 'NODE_ENV=production yarn --cwd=packages/react build'
- Another good command to run is 'yarn --cwd=packages/react test'
- 'NODE_ENV=production yarn --cwd=packages/styles build'
- 'yarn dev'
- navigate to localhost:8000 and you should see the cauldron site
- in a different git bash window, navigate to the top level of the source directory
- see if pa11y is able to validate the site by running 'npx pa11y-ci -c ./.pa11yci-htmlcs'
- see if pa11y is able to validate the site via axe by running 'npx pa11y-ci -c ./.pa11yci-axe'
- run the pa11y axe tests via yarn 'yarn test-pa11y-axe'
- run the pa11y tests via yarn 'yarn test-pa11y-htmlcs'
- generate the html axe report via 'yarn generate-pa11y-axe-report'
- generate the html htmlcs report via 'yarn generate-pa11y-htmlcs-report`
- navigate in explorer to docs/dist and you'll see the subdirectories with the respective reports
- you can view the report results in the command window (assuming you generated them previously) by running `yarn print-pa11y-axe-cli-results` and `yarn print-pa11y-htmlcs-cli-results`

### VSCode + Docker Desktop

- follow the directions here to enable WSL2 on your machine - https://docs.microsoft.com/en-us/windows/wsl/install-win10
- after completing the WSL2 directions (and optionally the terminal
  directions), install Docker Desktop https://www.docker.com/products/docker-desktop
- after Docker Desktop is installed, log back in again
  - for some reason at this point I had an error related to hyper-v not being enabled
  - I went to enable/disable windows features and enabled Hyper-v and management tools and rebooted
- install VSCode https://code.visualstudio.com/
- In VSCode, install recommended extensions
  - Docker
  - Remote - Containers
  - Remote - WSL
  - any other recommended extensions
- Ensure everything is working as expected by checking out the default Dequeue cauldron project (not our private somewhat customized repo) - https://github.com/dequelabs/cauldron . You can check out directly from VSCode or git-bash
- open the new repo directory in VSCode
- click on the 'containers' icon on the left
- click the "+" symbol to add a new container
- select "node.js and typescript" as the container type
- select the default node version
- this should start up a container and you should see a terminal in the bottom pane with "workspace" in the path
- 'ls' should list your project home directory files
- follow the previously mentioned build steps to build and run the code

## building the code on Linux

- Install git tools from your Linux package manager
- Install node related tooling from your linux package manager (node, yarn, lerna, typescript) if available
- Open a terminal clone the repo `git clone https://github.com/jessesaga/Temp-OAST-CI-CD-Examples-Task1-Cauldron`
- Run 'npm install --global yarn'
- Run 'npm install --global lerna'
- Run 'npm install --global typescript'
- Run 'npx lerna bootstrap'
- 'NODE_ENV=production yarn --cwd=packages/react build'
- Another good command to run is `yarn --cwd=packages/react test`
- `NODE_ENV=production yarn --cwd=packages/styles build`
- `npm install`
- `yarn dev`
- navigate to localhost:8000 and you should see the cauldron site
- in a different terminal, navigate to the top level of the source directory
- see if pa11y is able to validate the site by running `npx pa11y-ci -c ./.pa11yci-htmlcs`
- see if pa11y is able to validate the site via axe by running `npx pa11y-ci -c ./.pa11yci-axe`
- run the pa11y axe tests via yarn `yarn test-pa11y-axe`
- run the pa11y tests via yarn `yarn test-pa11y-htmlcs`
- generate the html axe report via `yarn generate-pa11y-axe-report`
- generate the html htmlcs report via `yarn generate-pa11y-htmlcs-report`
- navigate in the filesystem to the `dist` directory and you'll see the subdirectories with the respective reports

# Package versions

This repository is structured as a monorepo with 2 different
sub-projects and a top level structure for building the full system.

Periodically package audits should be performed to check for outdated
or vulnerable dependencies. This can be done in several ways. `yarn audit` can be run in the home directory and each of the 'packages'
subdirectories'. This will give a report showing dependencies that
require attention.

Updating dependencies in the case of vulnerabilities can be a
challenging task. This is beyond the current scope of this document
but here is a brief example of how yarn-audit-fix can be used to
update package dependencies with issues.

In the home directory and each package directory of the project run
`npx yarn-audit-fix --force`

This may take a while to complete. After updating dependencies you
will need to verify that no bugs have been introduced by the changes.
