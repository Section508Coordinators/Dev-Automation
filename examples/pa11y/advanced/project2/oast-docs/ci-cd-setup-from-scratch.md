# Prerequisites

- Github account
- AWS account
- Familiarity with Git tooling

# Instructions

## Initial Github setup (without S3)

Within Github, fork the
https://github.com/jessesaga/Temp-OAST-CI-CD-Examples-Task1-Cauldron
repository. If you have any problems forking due to repository
permissions you can do the following. *If you don't have problems
forking you can skip the following steps*

Ensure you've pulled the latest code from the previously mentioned
repository to your local machine. You can clone the repository locally
into a new directory named 'my-new-project' with the following command.

``` shell
git clone git@github.com:jessesaga/Temp-OAST-CI-CD-Examples-Task1-Cauldron my-new-project
```


Within Github, create a new private repository. *Do not initialize the
repo with any files.*

Change your current working directory into your newly cloned project
and add a new remote. 

`git remote add my-origin git@github.com:jessesaga/my-new-repository.git`

This will add your new repo that you can refer to by 'my-origin'
rather than origin. 'origin' will still refer to the original
repository unless you perform additional steps to rearrange your
remotes. Ensure that you push and pull from 'my-origin' for future commands.

Run the following command to mirror your locally cloned repository to
your new remote origin.

`git push my-origin --mirror`

> Note, Github will run the github-actions specified in node.js.yml on
> the development branch as soon as you push. This command will fail
> when it gets to S3 since that hasn't been configured yet.

> Another note, the preceding commands have only dealt with the
> 'develop' branch. The Jenkins branch will not exist in this new repo
> but could be pushed if needed.

## S3 setup

Log into your AWS console, navigate to S3, and begin the process of
creating a new bucket to store your generated site and reports.

> For simplicity sake - we're going to make an assumption in these
> directions that your S3 bucket operations all happen in the
> US-East-1 region. If your bucket is not in this region, there are
> additional steps that may be required.

- Click 'Create Bucket'
- You can accept the defaults unless you have specific requirements
  that would dictate otherwise
- Now that the bucket is created, navigate to the bucket by clicking on its name
- Select the 'Properties' tab and scroll to the bottom and enable
  'Static website hosting' (Accept the defaults)
- If you require this site to have public access and during the
  original setup you didn't already enable public access, navigate to
  'Edit public block access', and disable all block access selections and save
	- Now, navigate to 'Edit access control list' and allow 'Everyone'
    'Read' access and save
- Navigate to the properties tab and check the 'Static Website
  Hosting' section. Note the https endpoint. In my case, it's
  http://saga-deleteme1.s3-website-us-east-1.amazonaws.com. This is
  the URL you'll use to view your deployed site.

## IAM setup for deployment to S3 bucket

- Note the 'ARN' (Amazon resource name) for the previously created S3
	bucket (in my case it was arn:aws:s3:::saga-deleteme1)
- Navigate to the IAM service
- Add a new user, ensure that console access is not allowed and enable 'Programmatic access'
- Do not give this user any permissions or add them to any groups,
  click through the screens and ensure the user is created without permissions
- The final step will show the users access key and secret. *Record both of these and keep them secure*
- Click 'Create Policy'
- Give the policy a unique name specific for this project and bucket
- Switch to the JSON editor and paste in the following code
- You will need to modify the ARN in the policy below to match the ARN for your specific bucket
``` json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ListAllBuckets",
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets"
            ],
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Sid": "SyncAccess",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObjectAcl",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject",
                "s3:PutObjectAcl"
            ],
            "Resource": [
                "arn:aws:s3:::saga-deleteme1",
                "arn:aws:s3:::saga-deleteme1/*"
            ]
        }
    ]
}
```
- create the policy
- edit the previously created user and attach the new policy directly
  to the user
	
We now have all of the components in place to allow for the pipeline
to successfully deploy to S3.

## Github project secrets setup

- Navigate to your Github project page and click 'settings'
- Select the 'secrets' tab
- Create 3 secrets and add the appropriate information for each

1. AWS_ACCESS_KEY_ID
2. AWS_S3_BUCKET
3. AWS_SECRET_ACCESS_KEY

- Set these to their corresponding values using the S3 Bucket name
  without the ARN or other information for the AWS_S3_BUCKET
  parameter.  In this example the value would be 'saga-deleteme1'
- Trigger a new workflow to run by either committing code to the
  develop branch or navigating to 'Actions' drilling into the jobs and
  select 'Rerun all jobs'
- Ensure the 'Publish to S3' task completes successfully and navigate
  to your s3 site to verify that the site is deployed
