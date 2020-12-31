# Code Commit

## Create a new repository using AWS CodeCommit

- Log into the AWS Console and navigate to CodeCommit.
- Select create repository
- Visit the details page for the repository (it's currently empty) and
  view the connection instructions
- Use the connection instructions that best fit your platform and
  workflow. For me, it was the Linux SSH instructions
	- Ensure you're using an IAM user
	- Navigate to IAM
  - Select your user
  - Select security credentials
  - select 'Upload SSH public key'
  - upload your chosen public key file
  - Note the key ID
  - Edit ~/.ssh/config
  - Go ahead and try to clone the empty repository just to get the url
    added to your 'known_hosts' file
  - Delete the cloned empty repository
- *Do not* clone the empty repository. Our goal is to push our current
  local code repository to CodeCommit.
- Navigate to your local repository with your projects
- Use git to add a new remote pointing to your newly created CodeCommit repo
	https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes
- Git push to your new remote

## AWS CodeBuild

- Select 'create build project'
- Name the project (matching the repo name makes sense)
- For the Source 1 - Primary select 'AWS CodeCommit' and the
  repository you created and populated in the previous set of steps
- Reference type should default to 'Branch'
- Choose the default branch
- Keep the clone depth at 1
- Use a 'Managed image' and select 'Ubuntu'
- Use the 'Standard' runtime
- Use the latest codebuild standard image
- Environment should be Linux
- Select 'New service role' unless you already have a service role
  that was previously set up
- Default to the normal buildspec yaml config
- Enter the Cloudwatch group 'Temp-OAST-CI-CD-Examples-Task1-Cauldron'
  and stream 'develop-branch-build' name
- Select 'Create Build Project'
- View the output log to ensure there are no errors
- You can also navigate to Cloudwatch, find the log group and stream,
  and view historical build logs there
- Navigate to the build project and create a build trigger
	- .......NOTE - it seems that there's no easy way to trigger on
  commit. It can be set up to be a timed job but not triggered without
  jumping through hoops involving lamba functions.
 - Went ahead and created a build trigger to run every hour to see how it behaves
 - The trigger always runs based on the schedule and it doesn't bother
   to detect whether it should run based on code changes
 - Deleted my build trigger
 
************ 
*TODO* Later on I discovered that the best build trigger and
deployment method is to use codepipeline. We'll want to revise these directions.
***********

## Generate a buildspec.yml file to implement the build pipeline

See the example in [buildspec.yml](buildspec.yml)

- Commit buildspec.yml and push to the AWS hosted Git develop branch
- Navigate to CodeBuild->Build Projects, select the previously created
  project and click 'start build'
- Accept the defaults and click the 'Start Build' button at the bottom

## Create an artifact repository to store build artifacts

*TURNS OUT THAT THIS IS NOT THE RIGHT TOOL! Do not follow these steps*

At this point we have a basic working build but we want to be able to
store the build artifacts (site and reports) somewhere.

- Navigate to CodeCommit and select Artifacts->Repositories
- Create a new artifact repository
- You may need to create a 'domain' at this point. I'm choosing the
  same name as my repo and artifact repo - 'temp-oast-ci-cd-examples-task1-cauldron'

It appears that this particular artifact repository is not for general
purpose artifacts but is meant to host standardized build packages
(npm, maven, etc). This is not currently useful for us.

- Delete the repository and domain that you just created

## Enable S3 artifacts on the Build project

- Navigate to CodeBuild->Build Projects and edit the project selecting 'artifacts'
- Select S3
- Select a pre-existing S3 bucket. I'm using our already established
  bucket and placing the contents of this build in a subfolder
- Accept the rest of the defaults
- Start a new build and hope the artifacts end up in the right place
- It worked!
- Unfortunately the new folder is not public and it appears that the
  objects are encrypted
- Updated the s3 folder to be public
- Error on viewing the folder and index.html file in the folder
  related to the previously mentioned encryption from codebuild
- Navigate back to edit the build project, edit and select 'disable artifact encryption'
- Try another build
- It appears that every codebuild artifact is not public and has to be
  made manually public at this point
- added the following policy to the permissions tab of the s3 bucket to ensure public access

``` json
	{
    "Version": "2008-10-17",
    "Id": "temp-oast-ci-cd-example-putlic-cauldron-policy",
    "Statement": [
        {
            "Sid": "temp-oast-ci-cd-example-putlic-cauldron-policy-stm1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::temp-oast-ci-cd-examples-task1-cauldron/*"
        }
    ]
	}
```

- Everything is basically working now but it turns out that the
  cauldron code has non-relative references to css which breaks
  deploying the site at a sub-path under the s3 top level
  bucket. Fixing this is nontrivial due to the react router
  setup. We'd have to set up a basename and work with the Cauldron
  code more than is necessary for our setup. Going to test a build
  from AWS to the top level. In order to do this I'm going to revisit
  our Artifact configuration described above and change the location
  to a new s3 bucket cloned from the original. This requires a similar
  setup as described above..
- Cloned the old s3 folder, enabled hosting, set perms, changed the
  build project artifact settings to point to the new bucket, had to
  update the Name field to be '/' to prevent deployment to a sub-path
  defaulting to the project name.
- Performed another codebuild - it works!

*TODO* in the next section figured out the best way to manage
deployments. Revise the previous instructions.

# AWS Code Pipeline

- Navigate to CodePipeline and create a new pipeline
- Accept the defaults and click next
- Select the source provider 'CodeCommit'
- Select the repository
- Select the branch 'develop'
- Select the output artifact format 'Full Clone'
- Accept the defaults and click next
- Select CodeBuild as the build provider
- Select our CodeBuild project
- Keep the defaults and click 'next'
- Select the Deploy Provider 'S3'
- Select 'Extract file before deploy'
- Create the pipeline

# Undo our artifact deployment from the CodeBuild section

We're undoing our previous deployment method because it's handled by
Code Pipeline.

- Navigate to CodeBuild -> Projects and edit the Artifacts
  configuration for our project
- Change the artifact setting to 'No Artifacts' and click 'Update Artifacts'

# Implement caching to speed up the build

Added the following to the bottom of the buildspec.yml file

``` yaml
	cache:
  paths:
    - /root/.npm/*/**
    - /root/.cache/yarn/*/**
    - node_modules/*/**
    - packages/react/node_modules/*/**
    - packages/styles/node_modules/*/**

```

This didn't work. Apparently the codebuild project needs to have the
artifact configuration changed. 

# Update the CodeBuild project to include a local cache artifact

- Edit the build project and select artifacts
- Select additional configuration and cache type 'local'
- Check the checkbox for 'custom cache'

This sped the build up by 2 minutes.

# Production CI/CD

- Created a 'stable' branch that should only be merged to from a
stable branch when ready for a release. This will kick off a
production release CI/CD pipeline that will incorporate a deploy to
staging and a manual review before deploying to production.
- Created a prod release bucket in S3 to simulate the production site

## Create the prod pipeline

- Navigate to CodePipeline and create a new pipeline
- Accept the defaults and click next
- Select the source provider 'CodeCommit'
- Select the repository
- Select the branch 'stable'
- Select the output artifact format 'Full Clone'
- Accept the defaults and click next
- Select CodeBuild as the build provider
- Select our CodeBuild project
- Keep the defaults and click 'next'
- Select the Deploy Provider 'S3'
- Select 'Extract file before deploy'
- Create the pipeline

Everything is working at this point but permissions on our prod bucket
aren't quite right. I had to add the following permission policy to
the bucket for it to serve the html site.

``` json
	{
    "Version": "2008-10-17",
    "Id": "temp-oast-ci-cd-example-putlic-cauldron-prod-policy",
    "Statement": [
        {
            "Sid": "temp-oast-ci-cd-example-putlic-cauldron-prod-policy-stm1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::temp-oast-ci-cd-examples-task1-cauldron-prod/*"
        }
    ]
	}
```

# Add notifications to the pipeline to receive emails at certain points

- Navigate to CodePipeline, select the pipeline that you would like
  to add notifications to, and then select the Notify button
- Select 'Create notification rule'
- In this case, we'll create a notification for a user to receive when
  manual review and release to production is required
- Name the rule 'Review Required'
- Select 'Full'
- Select all manual approval actions - 'Failed', 'Needed', 'Succeeded'
- For targets, select 'Create Target'
- Make the target type an SNS Topic
- Name it 'codestar-notifications-temp-oast-ci-cd-example-prod-pipeline-event'
- Click 'Submit'
- Navigate to the AWS SNS service console
- Click on 'Topics'
- Click on the name of our new
  codestar-notifications-temp-oast-ci-cd-example-prod-pipeline-event
  topic
- Select 'Create Subscription'
- Select 'Email' as the protocol and select an email address as the endpoint
- Save
- The email selected should receive a verification email
- Confirm the email receipt
- Done

# TODO - Add notifications (stages complete - ready for review) and documentation
