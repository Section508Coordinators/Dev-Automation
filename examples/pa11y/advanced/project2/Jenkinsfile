pipeline {
  agent {
    docker {
      image 'buildkite/puppeteer:5.2.1'
      // args '-p 3010:3010'
      // following doesn't work and needs serious adjustments
      // need to figure out a better caching strategy
      // args '-v /srv/puppeteer/.npm:/.npm'
    }
  }
  environment {
    HOME = '.'
    // AWS_S3_BUCKET = credentials('jenkins-aws-s3-bucket')
    // AWS_ACCESS_KEY_ID = credentials('jenkins-aws-access-key-id')
    // AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
    // AWS_REGION: 'us-east-1'
  }
  stages {
    stage('Install all development dependencies and tools') {
      steps {
        // sh 'npm install yarn'
        // sh './node_modules/.bin/yarn'
        sh 'yarn'
        sh 'npx lerna bootstrap'
      }
    }
    stage('Build the styles project and the react components project') {
      steps {
        sh 'NODE_ENV=production yarn --cwd=packages/styles build'
        sh 'NODE_ENV=production yarn --cwd=packages/react build'
      }
    }
    stage('Run unit tests against the react project') {
      steps {
        sh 'yarn --cwd=packages/react test'
      }
    }
    stage('Test full site using Axe and generate reports') {
      steps {
        sh 'yarn dev &'
        sh 'wait-for-it.sh --timeout=30 localhost:8000 && yarn test-pa11y-axe'
        sh 'yarn generate-pa11y-axe-report'
				sh 'yarn print-pa11y-axe-cli-results'
      }
    }
    stage('Test full site using HTMLCS and generate reports)') {
      steps {
        sh 'yarn dev &'
        sh 'wait-for-it.sh --timeout=30 localhost:8000 && yarn test-pa11y-htmlcs'
        sh 'yarn generate-pa11y-htmlcs-report'
				sh 'yarn print-pa11y-htmlcs-cli-results'
      }
    }

    stage('Build and package the entire site') {
      steps {
        sh 'yarn build'
      }
    }

    stage('Publish the site and reports to S3') {
      steps {
        withAWS(credentials:'jenkins-temp-oast-ci-cd-examples-task1-cauldron-s3', region: "us-east-1") {
          s3Upload(file:'docs/dist', bucket:'temp-oast-ci-cd-examples-task1-cauldron', acl:'PublicRead')
        }
      }
    }
  }
}
