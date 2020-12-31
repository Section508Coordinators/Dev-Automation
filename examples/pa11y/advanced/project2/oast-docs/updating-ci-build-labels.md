- TODO delete all of the aws deleteme infrastructure and config, also
  delete the deleteme github repo created to build the github/s3
  instructions


# Updating the Jenkins build step labels

The [Jenkinsfile](../Jenkinsfile) located in the root of this
repository contains multiple stages that each have multiple steps.

Each stage has a parameter that describes the stage in plain
language. These stage lines can be updated with any language that
could be helpful in understanding what's going on with the build
process. The stage names should be kept relatively short.

``` json
stage('Install all development dependencies and tools') {
	steps {
	}
}
```


In order to update the label for a step, simply update the string
passed as a parameter to the stage.

Once the string is updated, save and commit the changes to the repository
(and push to the appropriate remote branch if you're working on a
local checkout and not directly in Github or other similar environment)

Once your code has been pushed to the origin (depending on your
Jenkins configuration), it will automatically be noticed and a build
will start. If your Jenkins project is not configured to pick up git
commits - run the build manually.

At this point you should notice the new build labels.


# Updating the Github Actions step labels

The [node.js.yml](../.github/workflows/node.js.yml) located under
.github/workflows in this repository has a series of steps. Each step
can have a custom name vs just displaying the command being run. This
file uses YAML syntax. The `- name:` field contains the label for the
step. 


``` yaml
    - name: View the Pa11y Axe results
```


In order to update the label for a step, simply update the name field
in any way applicable. The only limitation is that it must adhere to
YAML syntax.

Once the string is updated, save and commit the changes to the repository
(and push to the appropriate remote branch if you're working on a
local checkout and not directly in Github or other similar environment)

Once your code has been pushed to the origin it will automatically be
noticed and a Github Actions build will start. 

Navigate to the Github Actions tab in the repository and verify that
your build is running and the step names have been updated.
