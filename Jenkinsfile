pipeline {
    agent {
        docker {
            image 'node:8'
            args '-u root:root'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'pwd'
                sh 'cd /tmp'
                sh 'rm -rf *'
                checkout scm
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('deploy') {
            steps {
                sh 'git config --global user.email "ndl93@live.com"'
                sh 'git config --global user.name "nickl93"'
                sh 'touch README.md'
                sh 'git add --all'
                sh 'git commit -m "initial"'
                sh 'git push --force heroku master'
            }
        }
    }
}
